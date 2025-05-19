/**
 * Parses a stream of server-sent events
 */
export function parseSSEResponse(chunk: string) {
  const lines = chunk
    .toString()
    .split("\n")
    .filter((line) => line.trim() !== "")

  const data: string[] = []

  for (const line of lines) {
    const message = line.replace(/^data: /, "")
    if (message === "[DONE]") {
      return { done: true, data: data.join("") }
    }

    try {
      const parsed = JSON.parse(message)
      const content = parsed.choices?.[0]?.delta?.content || ""
      if (content) {
        data.push(content)
      }
    } catch (error) {
      // Sometimes the API sends incomplete JSON, just ignore those chunks
      console.warn("Error parsing SSE message", error)
    }
  }

  return { done: false, data: data.join("") }
}
