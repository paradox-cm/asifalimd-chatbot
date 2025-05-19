import * as dotenv from "dotenv"
import path from "path"

// Load .env.local file
dotenv.config({ path: path.resolve(__dirname, "../.env.local") })

console.log("✅ ENV CHECK:")
console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY)
console.log("SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log("SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY)

import fs from "fs"
import { createClient } from "@supabase/supabase-js"
import type { Document } from "langchain/document"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { OpenAIEmbeddings } from "@langchain/openai"
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase"
import { PDFLoader } from "langchain/document_loaders/fs/pdf"
import { TextLoader } from "langchain/document_loaders/fs/text"
import { DocxLoader } from "langchain/document_loaders/fs/docx"
import { CSVLoader } from "langchain/document_loaders/fs/csv"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
const supabaseClient = createClient(supabaseUrl, supabaseServiceKey)

// Initialize OpenAI embeddings
const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "text-embedding-3-small",
})

// Initialize vector store
const vectorStore = new SupabaseVectorStore(embeddings, {
  client: supabaseClient,
  tableName: "documents",
  queryName: "match_documents",
})

// Configure text splitter
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
})

// Process a single file
async function processFile(filePath: string): Promise<Document[]> {
  console.log(`Processing file: ${filePath}`)
  const extension = path.extname(filePath).toLowerCase()

  try {
    let docs: Document[] = []

    if (extension === ".pdf") {
      const loader = new PDFLoader(filePath)
      docs = await loader.load()
    } else if (extension === ".txt") {
      const loader = new TextLoader(filePath)
      docs = await loader.load()
    } else if (extension === ".docx") {
      const loader = new DocxLoader(filePath)
      docs = await loader.load()
    } else if (extension === ".csv") {
      const loader = new CSVLoader(filePath)
      docs = await loader.load()
    } else {
      console.warn(`Unsupported file type: ${extension}`)
      return []
    }

    docs.forEach((doc) => {
      doc.metadata.source = path.basename(filePath)
      doc.metadata.type = extension.substring(1)
    })

    return await textSplitter.splitDocuments(docs)
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error)
    return []
  }
}

// Process all files in the knowledge directory
async function processDirectory(directoryPath: string): Promise<Document[]> {
  console.log(`Processing directory: ${directoryPath}`)
  const allDocs: Document[] = []

  try {
    const files = fs.readdirSync(directoryPath)

    for (const file of files) {
      const filePath = path.join(directoryPath, file)
      const stats = fs.statSync(filePath)

      if (stats.isDirectory()) {
        const nestedDocs = await processDirectory(filePath)
        allDocs.push(...nestedDocs)
      } else {
        const docs = await processFile(filePath)
        allDocs.push(...docs)
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${directoryPath}:`, error)
  }

  return allDocs
}

// Main function
async function main() {
  try {
    const knowledgeDir = path.join(process.cwd(), "knowledge")

    if (!fs.existsSync(knowledgeDir)) {
      fs.mkdirSync(knowledgeDir, { recursive: true })
      console.log(`Created knowledge directory at ${knowledgeDir}`)
      console.log("Please add your knowledge files to this directory and run this script again.")
      return
    }

    const allDocs = await processDirectory(knowledgeDir)
    console.log(`Processed ${allDocs.length} document chunks`)

    if (allDocs.length === 0) {
      console.log("No documents were processed. Please check your knowledge directory.")
      return
    }

    console.log("Adding documents to vector store...")

    const sanitizedDocs = allDocs.map(doc => {
      const cleanContent = doc.pageContent
        .replace(/[^\x09\x0A\x0D\x20-\uD7FF\uE000-\uFFFD]/g, '') // Remove control characters
        .replace(/\\u[\dA-F]{4}/gi, '') // Remove malformed unicode escapes

      const flattenedMetadata: Record<string, any> = {
        source: doc.metadata.source,
        type: doc.metadata.type,
      }

      return {
        pageContent: cleanContent,
        metadata: flattenedMetadata,
      }
    })

    try {
      await vectorStore.addDocuments(sanitizedDocs)
      console.log("✅ Documents successfully added to vector store!")
    } catch (error) {
      console.error("❌ Error during insertion:", error)
      console.log("🧪 First problematic doc:", JSON.stringify(sanitizedDocs[0], null, 2))
    }
  } catch (error) {
    console.error("❌ Error in main process:", error)
  }
}

// Run main
main()