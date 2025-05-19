"use server"

import { Resend } from "resend"

// Initialize Resend with API key, with proper error handling
let resend: Resend | null = null
try {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("RESEND_API_KEY environment variable is not set")
    resend = null
  } else {
    resend = new Resend(apiKey)
  }
} catch (error) {
  console.error("Error initializing Resend:", error)
  resend = null
}

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email") as string

  if (!email) {
    return {
      success: false,
      message: "Email is required",
    }
  }

  try {
    // Check if Resend is properly initialized
    if (!resend) {
      console.error("Resend client is not initialized. Check your API key.")
      return {
        success: false,
        message: "Unable to process your request at this time. Please try again later.",
      }
    }

    // For demonstration purposes, we'll just log the email
    console.log(`Subscribing ${email} to newsletter`)

    // In a real implementation, you would send this to your email service
    // This is a placeholder for actual email sending logic
    const { data, error } = await resend.emails.send({
      from: "Newsletter <newsletter@drasifali.com>",
      to: [email],
      subject: "Welcome to Dr. Asif Ali's Newsletter",
      html: `
        <h1>Thank you for subscribing!</h1>
        <p>You'll now receive updates about Dr. Ali's latest research, speaking engagements, and insights.</p>
      `,
    })

    if (error) {
      console.error("Error sending confirmation email:", error)
      return {
        success: false,
        message: "Subscription successful, but we couldn't send a confirmation email.",
      }
    }

    return {
      success: true,
      message: "Thank you for subscribing to our newsletter!",
    }
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    }
  }
}
