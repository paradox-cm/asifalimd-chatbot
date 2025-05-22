import { createClient } from "@supabase/supabase-js"
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase"
import { OpenAIEmbeddings } from "@langchain/openai"
import dotenv from "dotenv"

// Load environment variables
dotenv.config()

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
const supabaseClient = createClient(supabaseUrl, supabaseServiceKey)

// Initialize vector store
const vectorStore = new SupabaseVectorStore(
  new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: "text-embedding-3-small",
  }),
  {
    client: supabaseClient,
    tableName: "documents",
    queryName: "match_documents",
  },
)

// Test queries related to your new content
const testQueries = [
  "What is Dr. Ali's expertise in cardiology?",
  "Tell me about Dr. Ali's research on POTS",
  "What digital health companies has Dr. Ali advised?",
  // Add queries specifically related to your new content
]

async function testRetrieval() {
  console.log("Testing retrieval for new knowledge...\n")

  for (const query of testQueries) {
    console.log(`Query: "${query}"`)
    try {
      const results = await vectorStore.similaritySearch(query, 3)
      console.log(`Found ${results.length} results:`)

      results.forEach((doc, i) => {
        console.log(`\nResult ${i + 1}:`)
        console.log(`Source: ${doc.metadata.source || "Unknown"}`)
        console.log(`Content: ${doc.pageContent.substring(0, 200)}...`)
        console.log("-".repeat(80))
      })
    } catch (error) {
      console.error(`Error retrieving results for "${query}":`, error)
    }
    console.log("\n" + "=".repeat(80) + "\n")
  }
}

testRetrieval()
