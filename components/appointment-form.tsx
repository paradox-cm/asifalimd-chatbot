"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { submitAppointmentRequest } from "@/app/actions/appointment-request"
import { CalendarDays, Check, X } from "lucide-react"

export function AppointmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formState, setFormState] = useState<{
    success?: boolean
    message?: string
    error?: string
  } | null>(null)
  const [newPatient, setNewPatient] = useState<string>("true")
  const [reasonForVisit, setReasonForVisit] = useState<string>("")

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setFormState(null)

    try {
      // Add the newPatient value to the form data
      formData.set("newPatient", newPatient)

      // Add the reasonForVisit value to the form data if it's not already there
      if (!formData.get("reasonForVisit") && reasonForVisit) {
        formData.set("reasonForVisit", reasonForVisit)
      }

      const result = await submitAppointmentRequest(formData)
      setFormState(result)

      // Log the result for debugging
      console.log("Form submission result:", result)
    } catch (error) {
      console.error("Form submission error:", error)
      setFormState({
        success: false,
        message: "An error occurred. Please try again.",
        error: error instanceof Error ? error.message : String(error),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays className="h-5 w-5 text-clinical-600 dark:text-clinical-400" />
        <h3 className="text-xl font-semibold">Request an Appointment</h3>
      </div>

      {formState?.success ? (
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-4">
          <div className="flex items-start gap-3">
            <div className="bg-green-100 dark:bg-green-800/30 p-1 rounded-full mt-0.5">
              <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h4 className="font-medium text-green-800 dark:text-green-300">Request Sent</h4>
              <p className="text-sm text-green-700 dark:text-green-400">{formState.message}</p>
            </div>
          </div>
        </div>
      ) : (
        <form action={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <Input id="name" name="name" placeholder="Your full name" required autoComplete="name" className="h-12" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Your email address"
                required
                autoComplete="email"
                className="h-12"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1.5">
                Phone <span className="text-red-500">*</span>
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Your phone number"
                required
                autoComplete="tel"
                className="h-12"
              />
            </div>
          </div>

          <div>
            <label htmlFor="preferredDate" className="block text-sm font-medium mb-1.5">
              Preferred Date/Time <span className="text-red-500">*</span>
            </label>
            <Input
              id="preferredDate"
              name="preferredDate"
              type="text"
              placeholder="e.g., Weekday afternoons, specific date"
              required
              className="px-4 py-2 h-12"
            />
          </div>

          <div>
            <label htmlFor="newPatient" className="block text-sm font-medium mb-1.5">
              Are you a new patient?
            </label>
            <Select value={newPatient} onValueChange={setNewPatient}>
              <SelectTrigger id="newPatient" className="h-12">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes, I'm a new patient</SelectItem>
                <SelectItem value="false">No, I'm an existing patient</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="reasonForVisit" className="block text-sm font-medium mb-1.5">
              Reason for Visit <span className="text-red-500">*</span>
            </label>
            <Select value={reasonForVisit} onValueChange={setReasonForVisit} name="reasonForVisit" required>
              <SelectTrigger id="reasonForVisit" className="h-12">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cardiology">General Cardiology</SelectItem>
                <SelectItem value="pots">POTS/Dysautonomia</SelectItem>
                <SelectItem value="longCovid">Long COVID</SelectItem>
                <SelectItem value="preventive">Preventive Cardiology</SelectItem>
                <SelectItem value="followUp">Follow-up Visit</SelectItem>
                <SelectItem value="other">Other (specify in notes)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="additionalNotes" className="block text-sm font-medium mb-1.5">
              Additional Notes
            </label>
            <Textarea
              id="additionalNotes"
              name="additionalNotes"
              placeholder="Any additional information that might be helpful"
              rows={3}
            />
          </div>

          {formState?.success === false && (
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
              <div className="flex items-start gap-3">
                <div className="bg-red-100 dark:bg-red-800/30 p-1 rounded-full mt-0.5">
                  <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-red-700 dark:text-red-400">{formState.message}</p>
                  {formState.error && (
                    <p className="text-xs text-red-600 dark:text-red-300 mt-1">Error details: {formState.error}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="pt-2">
            <Button type="submit" className="w-full h-12 text-base" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Request Appointment"}
            </Button>
            <p className="text-xs text-foreground/60 mt-2 text-center">
              Our team will contact you to confirm availability and details.
            </p>
          </div>
        </form>
      )}
    </div>
  )
}
