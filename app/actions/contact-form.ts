"use server"

import { Resend } from "resend"

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const organization = (formData.get("organization") as string) || "Not provided"
    const purpose = formData.get("purpose") as string
    const message = formData.get("message") as string

    // Validate the data
    if (!name || !email || !purpose || !message) {
      return { success: false, message: "Missing required fields" }
    }

    // Format purpose for better readability
    const formattedPurpose = purpose.charAt(0).toUpperCase() + purpose.slice(1).replace(/([A-Z])/g, " $1")

    // Log the submission attempt for debugging
    console.log("Attempting to send contact form email")

    // Send email using Resend with simplified configuration
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["c@cmenadesigns.com"], // Changed back to the verified email
      subject: `New Contact Form: ${formattedPurpose}`,
      text: `
Name: ${name}
Email: ${email}
Organization: ${organization}
Purpose: ${formattedPurpose}
Message: ${message}
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
      message: "Your message has been sent successfully. Dr. Ali's team will respond shortly.",
    }
  } catch (error) {
    console.error("Error in submitContactForm:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
