"use client"

import type React from "react"

import { useState, useCallback, useRef, useEffect } from "react"

export type Message = {
  id: string
  role: "user" | "assistant" | "system"
  content: string
}

type UseCustomChatOptions = {
  initialMessages?: Message[]
  api?: string
  onError?: (error: Error) => void
}

export function useCustomChat({
  initialMessages = [],
  api = "/api/chat",
  onError = console.error,
}: UseCustomChatOptions = {}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [streamedResponse, setStreamedResponse] = useState("")
  const abortControllerRef = useRef<AbortController | null>(null)

  // Clean up any ongoing requests when the component unmounts
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault()

      if (!input.trim() || isLoading) return

      // Add user message to the state
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: input,
      }

      setMessages((prev) => [...prev, userMessage])
      setInput("")
      setIsLoading(true)
      setStreamedResponse("")

      // Create a new AbortController for this request
      abortControllerRef.current = new AbortController()
      const { signal } = abortControllerRef.current

      try {
        // Prepare the messages to send to the API
        const messagesToSend = messages.concat(userMessage).filter((msg) => msg.role !== "system")

        const response = await fetch(api, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: messagesToSend,
          }),
          signal,
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        if (!response.body) {
          throw new Error("Response body is null")
        }

        // Process the stream
        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let done = false
        let accumulatedResponse = ""

        while (!done) {
          const { value, done: doneReading } = await reader.read()
          done = doneReading

          if (value) {
            const chunkText = decoder.decode(value, { stream: !done })
            accumulatedResponse += chunkText
            setStreamedResponse(accumulatedResponse)
          }
        }

        // Add the complete assistant message to the state
        const assistantMessage: Message = {
          id: Date.now().toString(),
          role: "assistant",
          content: accumulatedResponse,
        }

        setMessages((prev) => [...prev, assistantMessage])
      } catch (error) {
        if (error.name !== "AbortError") {
          onError(error as Error)
        }
      } finally {
        setIsLoading(false)
        setStreamedResponse("")
        abortControllerRef.current = null
      }
    },
    [api, input, isLoading, messages, onError],
  )

  const stop = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
      setIsLoading(false)

      // Add the partial response as a message
      if (streamedResponse) {
        const partialMessage: Message = {
          id: Date.now().toString(),
          role: "assistant",
          content: streamedResponse + " [Response stopped]",
        }
        setMessages((prev) => [...prev, partialMessage])
        setStreamedResponse("")
      }
    }
  }, [streamedResponse])

  const reload = useCallback(() => {
    // Find the last user message
    const lastUserMessageIndex = [...messages].reverse().findIndex((msg) => msg.role === "user")

    if (lastUserMessageIndex !== -1) {
      const lastUserMessage = [...messages].reverse()[lastUserMessageIndex]
      // Remove the last assistant message if it exists
      const newMessages = lastUserMessageIndex === 0 ? messages.slice(0, -1) : messages.slice(0, -2)

      setMessages(newMessages)
      setInput(lastUserMessage.content)
    }
  }, [messages])

  return {
    messages,
    input,
    setInput,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setInput(e.target.value),
    handleSubmit,
    isLoading,
    stop,
    reload,
    streamedResponse,
  }
}
