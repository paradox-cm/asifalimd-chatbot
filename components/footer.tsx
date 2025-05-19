"use client"

import { useState } from "react"
import Link from "next/link"
import { Linkedin, Mail, Phone, MapPin, Printer } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { subscribeToNewsletter } from "@/app/actions/newsletter-signup"

export function Footer() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null)

  async function handleSubscribe(formData: FormData) {
    setIsSubmitting(true)
    setMessage(null)

    try {
      const result = await subscribeToNewsletter(formData)

      if (result.success) {
        setMessage({ text: result.message, type: "success" })
        // Reset the form
        const form = document.getElementById("newsletter-form") as HTMLFormElement
        form.reset()
      } else {
        console.error("Newsletter subscription error:", result.error || "Unknown error")
        setMessage({ text: result.message, type: "error" })
      }
    } catch (error) {
      console.error("Error in handleSubscribe:", error)
      setMessage({
        text: "An error occurred. Please try again later.",
        type: "error",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12" style={{ maxWidth: "1160px" }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Column 1 - Name and Contact Links */}
          <div className="md:col-span-4">
            <h2 className="text-lg font-medium text-foreground mb-2">Asif Ali, MD</h2>
            <p className="text-sm text-foreground/70 mb-5">Cardiologist | Clinical Researcher | Med-Tech Strategist</p>

            <div className="grid grid-cols-1 gap-3">
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-md border border-border bg-background hover:bg-clinical-50 dark:hover:bg-clinical-900/20 text-foreground/80 hover:text-clinical-600 transition-colors duration-300"
              >
                <Linkedin className="h-4 w-4" />
                <span>Connect on LinkedIn</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-md border border-border bg-background hover:bg-clinical-50 dark:hover:bg-clinical-900/20 text-foreground/80 hover:text-clinical-600 transition-colors duration-300"
              >
                <Mail className="h-4 w-4" />
                <span>Contact Dr. Ali</span>
              </Link>
            </div>
          </div>

          {/* Column 2 - Office Location */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-lg font-medium text-foreground mb-4">Office Location</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-clinical-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-foreground/70">8830 Long Point Rd Suite 507,</p>
                  <p className="text-xs text-foreground/70">Houston, TX 77055</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-clinical-600 flex-shrink-0" />
                <a
                  href="tel:7134644140"
                  className="text-xs text-foreground/70 hover:text-clinical-600 transition-colors"
                >
                  (713) 464-4140
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Printer className="h-4 w-4 text-clinical-600 flex-shrink-0" />
                <span className="text-xs text-foreground/70">Fax: (713) 464-7296</span>
              </div>
            </div>
          </div>

          {/* Column 3 - Newsletter Signup */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-lg font-medium text-foreground mb-2">Join Dr. Ali's Newsletter</h3>
            <p className="text-sm text-foreground/70 mb-4">
              Stay updated with the latest research, publications, and insights.
            </p>

            <form id="newsletter-form" action={handleSubscribe} className="space-y-4">
              <div className="flex flex-col space-y-2">
                <Input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  required
                  className="bg-background border-border focus:border-clinical-500 focus:ring-clinical-500"
                  disabled={isSubmitting}
                />
                {message && (
                  <p className={`text-sm ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
                    {message.text}
                  </p>
                )}
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex h-5 items-center">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    required
                    className="h-4 w-4 rounded border-gray-300 text-clinical-600 focus:ring-clinical-500"
                    disabled={isSubmitting}
                  />
                </div>
                <label htmlFor="consent" className="text-xs text-foreground/70">
                  I consent to the{" "}
                  <Link href="/privacy" className="text-clinical-600 hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button type="submit" disabled={isSubmitting} className="px-6 py-2 h-auto">
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright and Privacy Policy */}
        <div className="pt-8 mt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
            <p className="text-xs text-foreground/50 text-center md:text-left">
              © {new Date().getFullYear()} Dr. Asif Ali. All rights reserved.
            </p>
            <Link
              href="/privacy"
              className="text-xs text-foreground/50 hover:text-foreground transition-colors duration-300"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
