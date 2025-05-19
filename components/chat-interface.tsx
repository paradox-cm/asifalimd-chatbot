"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send, RefreshCw, Download, ArrowRight, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useChat } from "ai/react"

// Create a simple typing indicator component
function TypingIndicator() {
  return (
    <div className="flex space-x-1">
      <div className="w-2 h-2 rounded-full bg-clinical-500 animate-bounce" style={{ animationDelay: "0ms" }}></div>
      <div className="w-2 h-2 rounded-full bg-clinical-500 animate-bounce" style={{ animationDelay: "150ms" }}></div>
      <div className="w-2 h-2 rounded-full bg-clinical-500 animate-bounce" style={{ animationDelay: "300ms" }}></div>
    </div>
  )
}

// Create a simple suggested questions component
function SuggestedQuestions({ onSelectQuestion }: { onSelectQuestion: (question: string) => void }) {
  const initialQuestions = [
    "What is Dr. Ali's clinical background?",
    "Tell me about Dr. Ali's research",
    "What digital health ventures is Dr. Ali involved with?",
    "How can I contact Dr. Ali?",
  ]

  return (
    <div className="mt-4">
      <p className="text-center text-sm text-foreground/60 mb-2">Try asking:</p>
      <div className="flex flex-wrap justify-center gap-2">
        {initialQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => onSelectQuestion(question)}
            className="text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-foreground px-3 py-1.5 rounded-full transition-colors"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  )
}

// Function to clean content from any token debug output
function cleanContent(content: string): string {
  // Remove token debug patterns like 0:"Dr", 1:"." etc.
  return content.replace(/^\d+:"[^"]*"\s?/gm, "")
}

export default function ChatInterface() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  // Use the useChat hook from the AI SDK
  const { messages, input, handleInputChange, handleSubmit, isLoading, reload, stop, setInput } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome-message",
        role: "assistant",
        content: "Hello! I'm Dr. Ali's AI assistant. How can I help you today?",
      },
    ],
    onError: (error) => {
      console.error("Chat error:", error)
      setError("An error occurred. Please try again.")
      // Clear error after 5 seconds
      setTimeout(() => setError(null), 5000)
    },
  })

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Handle form submission
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim()) {
      handleSubmit(e)
    }
  }

  // Handle suggested question selection
  const handleSuggestedQuestion = (question: string) => {
    setInput(question)
    // Submit after a short delay to allow the UI to update
    setTimeout(() => {
      const formEvent = { preventDefault: () => {} } as React.FormEvent<HTMLFormElement>
      handleSubmit(formEvent)
    }, 100)
  }

  // Process message content to handle links
  const processMessageContent = (content: string) => {
    // First clean any token debug output
    const cleanedContent = cleanContent(content)

    // Check if the message contains link markers
    if (!cleanedContent.includes("[LINK:")) {
      return { text: cleanedContent, links: [] }
    }

    // Split the content into text and links
    const parts = cleanedContent.split(/(\[LINK:[^\]]+\])/)
    const processedContent = parts.filter((part) => !part.startsWith("[LINK:")).join("")

    // Extract links
    const linkRegex = /\[LINK:([^:]+):([^\]]+)\]/g
    const links: { url: string; text: string }[] = []
    let match

    while ((match = linkRegex.exec(cleanedContent)) !== null) {
      links.push({
        url: match[1],
        text: match[2],
      })
    }

    return { text: processedContent.trim(), links }
  }

  // Reset chat
  const clearChat = () => {
    window.location.reload()
  }

  // Export chat
  const exportChat = () => {
    if (messages.length <= 1) return

    const chatText = messages
      .map((msg) => {
        const role = msg.role === "user" ? "You" : "Dr. Ali's Assistant"
        // Clean content before exporting
        const cleanedContent = cleanContent(msg.content)
        return `${role}:\n${cleanedContent}\n`
      })
      .join("\n")

    const blob = new Blob([chatText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `chat-with-dr-ali-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col relative chat-container h-[calc(100dvh-4rem)]">
      {/* Chat messages container */}
      <div
        className="flex-1 overflow-y-auto p-4 pb-24 space-y-4"
        aria-label="Chat conversation with Dr. Ali's assistant"
      >
        {messages.map((message) => {
          // Process message content to extract links and clean any token debug output
          const { text, links } = processMessageContent(message.content)

          return (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] md:max-w-[70%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-clinical-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-foreground"
                }`}
                tabIndex={0} // Make messages focusable for keyboard navigation
              >
                <p className="whitespace-pre-wrap">{text}</p>

                {/* Render links as concise buttons if present */}
                {message.role === "assistant" && links.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {links.map((link, index) => (
                      <Link
                        key={index}
                        href={link.url}
                        className="inline-flex items-center gap-1 text-sm bg-clinical-600 hover:bg-clinical-700 text-white px-3 py-1.5 rounded-md transition-colors"
                      >
                        {link.text}
                        <ArrowRight size={12} className="ml-1" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div
              className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[80%] md:max-w-[70%]"
              aria-label="Dr. Ali's assistant is typing"
            >
              <TypingIndicator />
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="flex justify-center">
            <div className="bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-lg p-3 max-w-[80%] md:max-w-[70%]">
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Initial suggested questions */}
        {messages.length <= 1 && <SuggestedQuestions onSelectQuestion={handleSuggestedQuestion} />}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat input - fixed position at bottom of screen */}
      <div className="fixed bottom-0 left-0 right-0 p-3 border-t border-border bg-background/80 backdrop-blur-sm z-10">
        <form onSubmit={onSubmit} className="flex items-center gap-2 max-w-3xl mx-auto">
          <Input
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message here..."
            className="flex-1 h-10"
            aria-label="Message input"
            disabled={isLoading}
          />
          {isLoading ? (
            <Button
              onClick={() => stop()}
              className="h-10 w-10 rounded-full flex items-center justify-center bg-transparent border border-foreground/30 hover:bg-foreground/5 text-foreground transition-colors"
              aria-label="Stop response"
              title="Stop response"
              type="button"
            >
              <Square size={16} />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={!input.trim()}
              className="h-10 w-10 rounded-full flex items-center justify-center bg-clinical-600 hover:bg-clinical-700 text-white disabled:opacity-50"
              aria-label="Send message"
            >
              <Send size={18} />
            </Button>
          )}
        </form>

        {/* Chat controls */}
        {messages.length > 1 && (
          <div className="flex justify-end mt-1 max-w-3xl mx-auto gap-3">
            <button
              onClick={exportChat}
              className="text-xs text-foreground/40 hover:text-clinical-600 flex items-center gap-1 transition-colors"
              aria-label="Export conversation"
            >
              <Download size={10} />
              <span>Export</span>
            </button>
            <button
              onClick={clearChat}
              className="text-xs text-foreground/40 hover:text-clinical-600 flex items-center gap-1 transition-colors"
              aria-label="Reset conversation"
            >
              <RefreshCw size={10} />
              <span>Reset</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
