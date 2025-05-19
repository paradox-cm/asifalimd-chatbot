import fs from "fs"
import path from "path"
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

    // Load document based on file type
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

    // Add metadata
    docs.forEach((doc) => {
      doc.metadata.source = path.basename(filePath)
      doc.metadata.type = extension.substring(1)
    })

    // Split text into chunks
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

    // Create knowledge directory if it doesn't exist
    if (!fs.existsSync(knowledgeDir)) {
      fs.mkdirSync(knowledgeDir, { recursive: true })
      console.log(`Created knowledge directory at ${knowledgeDir}`)
      console.log("Please add your knowledge files to this directory and run this script again.")
      return
    }

    // Process all files
    const allDocs = await processDirectory(knowledgeDir)
    console.log(`Processed ${allDocs.length} document chunks`)

    if (allDocs.length === 0) {
      console.log("No documents were processed. Please check your knowledge directory.")
      return
    }

    // Add documents to vector store
    console.log("Adding documents to vector store...")
    await vectorStore.addDocuments(allDocs)
    console.log("Documents successfully added to vector store!")
  } catch (error) {
    console.error("Error in main process:", error)
  }
}

// Run the main function
main()
