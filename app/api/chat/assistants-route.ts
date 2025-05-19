import { OpenAI } from "openai"
import { OpenAIStream, StreamingTextResponse } from "ai"

// Create an OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// You would create an Assistant once and store its ID
// const assistant = await openai.beta.assistants.create({
//   name: "Dr. Asif Ali Assistant",
//   instructions: "You are Dr. Asif Ali's AI assistant...",
//   tools: [{ type: "retrieval" }],
//   model: "gpt-4-turbo",
// });
// Then upload files to the assistant and store their IDs

// This should be your pre-created Assistant ID
const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID || "asst_abc123"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Create a thread
    const thread = await openai.beta.threads.create()

    // Add messages to the thread
    for (const message of messages.filter((m) => m.role === "user")) {
      await openai.beta.threads.messages.create(thread.id, {
        role: "user",
        content: message.content,
      })
    }

    // Run the assistant on the thread
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: ASSISTANT_ID,
    })

    // Create a stream to get the messages
    const stream = OpenAIStream(await openai.beta.threads.runs.stream(thread.id, run.id))

    // Return a StreamingTextResponse, which will stream the response
    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error("Error in chat API:", error)
    return new Response(JSON.stringify({ error: "An error occurred during your request." }), {
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }
}
