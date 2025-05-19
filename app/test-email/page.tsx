"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { submitMeetingRequest } from "@/app/actions/meeting-request"

export default function TestEmail() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function sendTestEmail() {
    setLoading(true)
    try {
      // Create a test FormData object
      const formData = new FormData()
      formData.append("name", "Test User")
      formData.append("email", "test@example.com")
      formData.append("message", "This is a test message from the test page.")

      // Call the server action
      const response = await submitMeetingRequest(formData)
      console.log("Test email response:", response)
      setResult(response)
    } catch (error) {
      console.error("Test email error:", error)
      setResult({ error: String(error) })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Test Email Sending</h1>

      <Button onClick={sendTestEmail} disabled={loading} className="w-full mb-4">
        {loading ? "Sending..." : "Send Test Email"}
      </Button>

      {result && (
        <div className="mt-4 p-4 rounded-md bg-slate-100 dark:bg-slate-700">
          <h2 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Result:</h2>
          <pre className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-6 text-sm text-slate-500 dark:text-slate-400">
        <p>This page tests the email sending functionality using the Resend API.</p>
        <p className="mt-2">Check the browser console and server logs for detailed information.</p>
      </div>
    </div>
  )
}
