import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"
import { createClient } from "@supabase/supabase-js"
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase"
import { OpenAIEmbeddings } from "@langchain/openai"

export const maxDuration = 30

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
)

const vectorStore = new SupabaseVectorStore(
  new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: "text-embedding-3-small",
  }),
  {
    client: supabaseClient,
    tableName: "documents",
    queryName: "match_documents",
  }
)

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const latestUserMessage = messages.filter((m) => m.role === "user").pop()
    const isFirstMessage = messages.filter((m) => m.role === "user").length === 1

    let fullMessages = [...messages]

    if (isFirstMessage && latestUserMessage?.content) {
      let relevantContext = ""
      let sources = []

      try {
        const searchResults = await vectorStore.similaritySearch(latestUserMessage.content, 3)
        relevantContext = searchResults.map((doc) => doc.pageContent).join("\n\n")
        sources = searchResults.map((doc) => doc.metadata?.source || "Unknown source")
      } catch (error) {
        console.error("Error retrieving context:", error)
      }

      // Cap the context to ~3000 tokens max (approx 12k characters)
      const MAX_CONTEXT_CHARS = 3000
      if (relevantContext.length > MAX_CONTEXT_CHARS) {
        const cut = relevantContext.slice(0, MAX_CONTEXT_CHARS)
        const safeCut = cut.slice(0, cut.lastIndexOf('.') + 1 || MAX_CONTEXT_CHARS)
        relevantContext = safeCut + "\n\n[Context truncated due to length]"
      }

      const systemMessage = {
        role: "system",
        content: `You are a GPT assistant representing Dr. Asif Ali, MD—a visionary cardiologist, educator, and digital health leader.

Use this contextual info from his verified knowledge base to answer accurately and clearly:

${relevantContext}

${sources.length > 0 ? `Sources: ${sources.join(", ")}` : ""}
`
      }

      fullMessages = [systemMessage, ...messages]
    }

    const result = streamText({
      model: openai("gpt-4-turbo"),
      messages: fullMessages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error in chat API:", error)
    return new Response(JSON.stringify({ error: "An error occurred during your request." }), {
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }
}
