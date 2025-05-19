"use server"

import { Resend } from "resend"

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitMeetingRequest(formData: FormData) {
  try {
    // Log the API key status for debugging (don't log the actual key)
    console.log("RESEND_API_KEY status:", process.env.RESEND_API_KEY ? "Present" : "Missing")

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    // Log form data for debugging
    console.log("Form submission received:", { name, email, messageLength: message?.length })

    // Validate the data
    if (!name || !email || !message) {
      console.log("Validation failed: Missing required fields")
      return { success: false, message: "Please fill out all required fields" }
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log("Validation failed: Invalid email format")
      return { success: false, message: "Please enter a valid email address" }
    }

    // Log the submission attempt for debugging
    console.log("Attempting to send meeting request email to c@cmenadesigns.com")

    try {
      // Send email using Resend with test domain
      const { data, error } = await resend.emails.send({
        from: "Meeting Request <onboarding@resend.dev>", // Using Resend's test domain
        to: ["c@cmenadesigns.com"], // Test recipient for development
        reply_to: email,
        subject: `Meeting Request from ${name}`,
        html: `
          <h1>New Meeting Request</h1>
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      })

      if (error) {
        console.error("Resend API Error:", error)
        return {
          success: false,
          message: "Failed to send your request. Please try again later.",
          error: error.message,
        }
      }

      console.log("Email sent successfully:", data)

      return {
        success: true,
        message: "Your meeting request has been sent successfully. Dr. Ali will get back to you shortly.",
      }
    } catch (resendError) {
      console.error("Resend API Exception:", resendError)
      return {
        success: false,
        message: "Error sending email through our provider.",
        error: resendError instanceof Error ? resendError.message : String(resendError),
      }
    }
  } catch (error) {
    console.error("General error in submitMeetingRequest:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
