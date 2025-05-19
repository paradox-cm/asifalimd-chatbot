"use server"

import { Resend } from "resend"

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitSpeakingRequest(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const organization = (formData.get("organization") as string) || "Not provided"
    const details = formData.get("details") as string

    // Validate the data
    if (!name || !email || !details) {
      return { success: false, message: "Missing required fields" }
    }

    // Log the submission attempt for debugging
    console.log("Attempting to send speaking request email")

    // Send email using Resend with simplified configuration
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["c@cmenadesigns.com"],
      subject: `New Speaking Request: ${name} from ${organization}`,
      text: `
Name: ${name}
Email: ${email}
Organization: ${organization}
Event Details: ${details}
      `,
    })

    if (error) {
      console.error("Error sending email:", error)
      return {
        success: false,
        message: "Failed to send email. Please try again later.",
        error: error.message,
      }
    }

    console.log("Email sent successfully:", data)

    return {
      success: true,
      message: "Your speaking request has been sent successfully. Dr. Ali's team will respond shortly.",
    }
  } catch (error) {
    console.error("Error in submitSpeakingRequest:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
