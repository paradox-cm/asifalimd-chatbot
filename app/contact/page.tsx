"use client"

import type React from "react"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Linkedin, AlertCircle, CheckCircle, Loader2, MapPin, Phone, Printer } from "lucide-react"
import { submitContactForm } from "@/app/actions/contact-form"

export default function ContactPage() {
  const [isPending, startTransition] = useTransition()
  const [formError, setFormError] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    purpose: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, purpose: value }))

    // Clear error when field is edited
    if (errors.purpose) {
      setErrors((prev) => ({ ...prev, purpose: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.purpose) {
      newErrors.purpose = "Please select a purpose"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.length < 10) {
      newErrors.message = "Message is too short"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset status messages
    setFormError(null)
    setFormSuccess(null)

    // Validate form
    if (!validateForm()) {
      return
    }

    // Create FormData object
    const formDataObj = new FormData()
    formDataObj.append("name", formData.name)
    formDataObj.append("email", formData.email)
    formDataObj.append("organization", formData.organization)
    formDataObj.append("purpose", formData.purpose)
    formDataObj.append("message", formData.message)

    // Submit form using server action
    startTransition(async () => {
      try {
        const result = await submitContactForm(formDataObj)

        if (result.success) {
          setFormSuccess(result.message)
          // Reset form on success
          setFormData({
            name: "",
            organization: "",
            email: "",
            purpose: "",
            message: "",
          })
        } else {
          console.error("Form submission error:", result.error || "Unknown error")
          setFormError(result.message)
        }
      } catch (error) {
        console.error("Error submitting form:", error)
        setFormError("An unexpected error occurred. Please try again later.")
      }
    })
  }

  return (
    <div className="flex flex-col divide-y divide-border">
      {/* Title Block */}
      <section className="w-full py-16 md:py-20 px-2 md:px-4 bg-background" aria-label="Contact Introduction">
        <div className="container mx-auto px-2 md:px-4" style={{ maxWidth: "1160px" }}>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-foreground">
            Contact & Collaborate
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-6">Start the Conversation.</p>
          <p className="text-lg md:text-xl text-foreground/70 mb-8 border-l border-clinical-500 pl-4 py-2">
            For inquiries related to speaking, consulting, research, or media engagements, please use the form below.
            Dr. Ali's team will respond promptly.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="w-full py-16 px-2 md:px-4 bg-background" aria-label="Contact Form">
        <div className="container mx-auto px-2 md:px-4" style={{ maxWidth: "1160px" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Form Column */}
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {formError && (
                  <div className="p-4 border border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-800 rounded-md flex items-center gap-2 text-red-700 dark:text-red-400">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <p>{formError}</p>
                  </div>
                )}

                {formSuccess && (
                  <div className="p-4 border border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-800 rounded-md flex items-center gap-2 text-green-700 dark:text-green-400">
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    <p>{formSuccess}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground/70">
                    Full Name <span className="text-clinical-600">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className={`border-border focus:border-clinical-500 ${errors.name ? "border-red-500 focus:border-red-500" : ""}`}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    disabled={isPending}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-sm text-red-500 mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="organization" className="text-sm font-medium text-foreground/70">
                    Organization or Affiliation
                  </label>
                  <Input
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="Your organization (optional)"
                    className="border-border focus:border-clinical-500"
                    disabled={isPending}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground/70">
                    Email Address <span className="text-clinical-600">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Your email"
                    required
                    className={`border-border focus:border-clinical-500 ${errors.email ? "border-red-500 focus:border-red-500" : ""}`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    disabled={isPending}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-sm text-red-500 mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="purpose" className="text-sm font-medium text-foreground/70">
                    Purpose of Inquiry <span className="text-clinical-600">*</span>
                  </label>
                  <Select onValueChange={handleSelectChange} value={formData.purpose} disabled={isPending}>
                    <SelectTrigger
                      className={`border-border focus:border-clinical-500 ${errors.purpose ? "border-red-500 focus:border-red-500" : ""}`}
                      aria-invalid={!!errors.purpose}
                      aria-describedby={errors.purpose ? "purpose-error" : undefined}
                    >
                      <SelectValue placeholder="Select a purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="speaking">Speaking Engagement</SelectItem>
                      <SelectItem value="consulting">Med-Tech or Clinical Consulting</SelectItem>
                      <SelectItem value="media">Media or Interview Request</SelectItem>
                      <SelectItem value="academic">Academic or Research Collaboration</SelectItem>
                      <SelectItem value="general">General Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.purpose && (
                    <p id="purpose-error" className="text-sm text-red-500 mt-1">
                      {errors.purpose}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground/70">
                    Message / Details <span className="text-clinical-600">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please provide details about your inquiry"
                    rows={6}
                    required
                    className={`border-border focus:border-clinical-500 ${errors.message ? "border-red-500 focus:border-red-500" : ""}`}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    disabled={isPending}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-sm text-red-500 mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="bg-clinical-600 hover:bg-clinical-700 text-white transition-all duration-300"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Inquiry"
                  )}
                </Button>
              </form>
            </div>

            {/* Alternate Contact Methods */}
            <div className="space-y-8">
              <div className="border-2 border-border p-6 rounded-lg bg-card">
                <h2 className="text-xl font-bold mb-4 text-foreground">Office Location</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-clinical-100 dark:bg-clinical-900/50 p-2 rounded-full mt-1">
                      <MapPin className="h-5 w-5 text-clinical-600 dark:text-clinical-400" />
                    </div>
                    <div>
                      <p className="font-medium">Long Point / Spring</p>
                      <p className="text-foreground/70">8830 Long Point Rd Suite 507,</p>
                      <p className="text-foreground/70">Houston, TX 77055</p>
                    </div>
                  </div>

                  <a
                    href="tel:7134644140"
                    className="flex items-center gap-3 text-foreground/70 hover:text-clinical-600 transition-colors duration-300"
                  >
                    <div className="bg-clinical-100 dark:bg-clinical-900/50 p-2 rounded-full">
                      <Phone className="h-5 w-5 text-clinical-600 dark:text-clinical-400" />
                    </div>
                    <span>(713) 464-4140</span>
                  </a>

                  <div className="flex items-center gap-3 text-foreground/70">
                    <div className="bg-clinical-100 dark:bg-clinical-900/50 p-2 rounded-full">
                      <Printer className="h-5 w-5 text-clinical-600 dark:text-clinical-400" />
                    </div>
                    <span>Fax: (713) 464-7296</span>
                  </div>
                </div>
              </div>

              <div className="border-2 border-border p-6 rounded-lg bg-card">
                <h2 className="text-xl font-bold mb-4 text-foreground">Connect Online</h2>
                <div className="space-y-4">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-foreground/70 hover:text-clinical-600 transition-colors duration-300"
                  >
                    <div className="bg-clinical-100 dark:bg-clinical-900/50 p-2 rounded-full">
                      <Linkedin className="h-5 w-5 text-clinical-600 dark:text-clinical-400" />
                    </div>
                    <span>Connect on LinkedIn</span>
                  </a>
                </div>
              </div>

              <div className="border-2 border-border p-6 rounded-lg bg-card">
                <h2 className="text-xl font-bold mb-4 text-foreground">Response Time</h2>
                <p className="text-foreground/70">
                  Dr. Ali's team typically responds to inquiries within 2-3 business days. For urgent matters, please
                  indicate this in your message.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
