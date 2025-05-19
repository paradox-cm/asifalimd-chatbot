"use server"

import { Resend } from "resend"

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitAppointmentRequest(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const preferredDate = formData.get("preferredDate") as string
    const reasonForVisit = formData.get("reasonForVisit") as string
    const additionalNotes = (formData.get("additionalNotes") as string) || "None provided"
    const newPatient = formData.get("newPatient") === "true" ? "Yes" : "No"

    // Validate the data
    if (!name || !email || !phone || !preferredDate || !reasonForVisit) {
      return { success: false, message: "Missing required fields" }
    }

    // Log the submission attempt for debugging
    console.log("Attempting to send appointment request email")
    console.log("Using Resend API key:", process.env.RESEND_API_KEY ? "API key is set" : "API key is missing")

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Appointment Request <appointments@drasifalicardiology.com>",
      to: ["appointments@drasifalicardiology.com"], // Update to the actual recipient
      reply_to: email,
      subject: `New Appointment Request from ${name}`,
      html: `
        <h1>New Appointment Request</h1>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Preferred Date/Time:</strong> ${preferredDate}</p>
        <p><strong>New Patient:</strong> ${newPatient}</p>
        <p><strong>Reason for Visit:</strong> ${reasonForVisit}</p>
        <p><strong>Additional Notes:</strong> ${additionalNotes}</p>
      `,
    })

    if (error) {
      console.error("Error sending email:", error)
      return {
        success: false,
        message: "Failed to send appointment request. Please try again later.",
        error: error.message,
      }
    }

    console.log("Appointment request email sent successfully:", data)

    return {
      success: true,
      message: "Your appointment request has been sent successfully. Our team will contact you shortly to confirm.",
    }
  } catch (error) {
    console.error("Error in submitAppointmentRequest:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
