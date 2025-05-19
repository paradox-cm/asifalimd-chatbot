"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Tv,
  Radio,
  Users,
  FileText,
  Users2,
  Brain,
  Wifi,
  Activity,
  ClipboardCheck,
  Stethoscope,
  Globe,
  ArrowRight,
} from "lucide-react"

export default function MediaPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, this would send the form data to a server
    setFormSubmitted(true)
  }

  return (
    <div className="flex flex-col divide-y divide-border">
      {/* Title Block */}
      <section className="w-full py-16 md:py-20 px-4 bg-background" aria-label="Media Introduction">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-foreground">
            Media & Speaking
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-6">
            Trusted Voice on Digital Health, Autonomic Care, and Inclusive Innovation.
          </p>
          <p className="text-lg md:text-xl text-foreground/70 mb-8 border-l-4 border-clinical-500 pl-4 py-2">
            Dr. Asif Ali is a nationally recognized speaker and advisor. He brings clarity, rigor, and compassion to the
            conversations shaping modern medicine.
          </p>
        </div>
      </section>

      {/* Appearances Section */}
      <section className="w-full py-16 px-4 bg-background" aria-label="Media Appearances">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-foreground">Selected Media & Speaking Appearances</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border-2 border-border p-6 rounded-lg bg-card flex items-start gap-4">
              <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full">
                <Tv className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">The Dr. Oz Show</h3>
                <p className="text-foreground/70">National TV appearance</p>
              </div>
            </div>

            <div className="border-2 border-border p-6 rounded-lg bg-card flex items-start gap-4">
              <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full">
                <Radio className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">FOX News</h3>
                <p className="text-foreground/70">Contributor on public health segments</p>
              </div>
            </div>

            <div className="border-2 border-border p-6 rounded-lg bg-card flex items-start gap-4">
              <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full">
                <Users className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Texas Medical Association</h3>
                <p className="text-foreground/70">Featured conference speaker</p>
              </div>
            </div>

            <div className="border-2 border-border p-6 rounded-lg bg-card flex items-start gap-4">
              <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full">
                <FileText className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">UpToDate</h3>
                <p className="text-foreground/70">Contributor and reviewer</p>
              </div>
            </div>

            <div className="border-2 border-border p-6 rounded-lg bg-card flex items-start gap-4 md:col-span-2 lg:col-span-2">
              <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full">
                <Users2 className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">AHA Health Tech Advisory Group</h3>
                <p className="text-foreground/70">National working group presentations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Speaking Topics */}
      <section className="w-full py-16 px-4 bg-background" aria-label="Speaking Topics">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-foreground">Popular Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-border p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-clinical-100 dark:bg-clinical-900/50 p-2 rounded-full">
                  <Brain className="h-5 w-5 text-clinical-600 dark:text-clinical-400" />
                </div>
                <h3 className="font-semibold text-foreground">Dysautonomia & POTS</h3>
              </div>
              <p className="text-foreground/70">Diagnostic innovation and patient advocacy</p>
            </div>

            <div className="border-2 border-border p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-clinical-100 dark:bg-clinical-900/50 p-2 rounded-full">
                  <Wifi className="h-5 w-5 text-clinical-600 dark:text-clinical-400" />
                </div>
                <h3 className="font-semibold text-foreground">Digital Health</h3>
              </div>
              <p className="text-foreground/70">Wearables, remote monitoring, AI in clinical care</p>
            </div>

            <div className="border-2 border-border p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-clinical-100 dark:bg-clinical-900/50 p-2 rounded-full">
                  <Activity className="h-5 w-5 text-clinical-600 dark:text-clinical-400" />
                </div>
                <h3 className="font-semibold text-foreground">Post-COVID Care Models</h3>
              </div>
              <p className="text-foreground/70">Autonomic dysfunction and long-COVID</p>
            </div>

            <div className="border-2 border-border p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-clinical-100 dark:bg-clinical-900/50 p-2 rounded-full">
                  <ClipboardCheck className="h-5 w-5 text-clinical-600 dark:text-clinical-400" />
                </div>
                <h3 className="font-semibold text-foreground">Inclusive Research</h3>
              </div>
              <p className="text-foreground/70">Trials that reflect real-world populations</p>
            </div>

            <div className="border-2 border-border p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-clinical-100 dark:bg-clinical-900/50 p-2 rounded-full">
                  <Stethoscope className="h-5 w-5 text-clinical-600 dark:text-clinical-400" />
                </div>
                <h3 className="font-semibold text-foreground">Med-Tech Strategy</h3>
              </div>
              <p className="text-foreground/70">Physician-led product validation and scale</p>
            </div>

            <div className="border-2 border-border p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-clinical-100 dark:bg-clinical-900/50 p-2 rounded-full">
                  <Globe className="h-5 w-5 text-clinical-600 dark:text-clinical-400" />
                </div>
                <h3 className="font-semibold text-foreground">Health Equity</h3>
              </div>
              <p className="text-foreground/70">Systemic solutions for underserved populations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials or Peer Quotes */}
      <section className="w-full py-12 px-4 bg-background" aria-label="Testimonial">
        <div className="container mx-auto max-w-6xl">
          <blockquote className="border-l-4 border-clinical-500 pl-6 py-4 italic text-xl md:text-2xl text-foreground/80">
            "Dr. Ali is an inspiring, solutions-focused leader praised for authenticity, integrity, and clarity."
          </blockquote>
        </div>
      </section>

      {/* Speaking Engagement Request Section */}
      <section className="w-full py-16 px-4 bg-background" aria-label="Speaking Request">
        <div className="container mx-auto max-w-6xl">
          <div className="border-2 border-border p-8 rounded-lg bg-card">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">Invite Dr. Ali to Speak or Consult</h2>
            <p className="text-lg text-foreground/80 mb-8">
              For conferences, panels, media interviews, or clinical briefings, please use the form below or visit the
              Contact page.
            </p>

            {formSubmitted ? (
              <div className="bg-clinical-50 dark:bg-clinical-900/30 border border-clinical-200 dark:border-clinical-800 rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold mb-2 text-foreground">Thank You!</h3>
                <p className="text-foreground/70 mb-4">
                  Your speaking engagement request has been submitted. We will get back to you shortly.
                </p>
                <Button
                  onClick={() => setFormSubmitted(false)}
                  variant="outline"
                  className="mt-2 border-clinical-200 dark:border-clinical-800"
                >
                  Submit Another Request
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground/70">
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      required
                      className="border-border focus:border-clinical-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="organization" className="text-sm font-medium text-foreground/70">
                      Organization
                    </label>
                    <Input
                      id="organization"
                      placeholder="Your organization"
                      required
                      className="border-border focus:border-clinical-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground/70">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    required
                    className="border-border focus:border-clinical-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="details" className="text-sm font-medium text-foreground/70">
                    Event Details or Topic of Interest
                  </label>
                  <Textarea
                    id="details"
                    placeholder="Please provide details about your event, including date, format, audience, and topics of interest."
                    rows={5}
                    required
                    className="border-border focus:border-clinical-500"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="submit"
                    className="bg-clinical-600 hover:bg-clinical-700 text-white transition-all duration-300 flex items-center gap-2"
                  >
                    Request Speaking Engagement
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="border-2 border-border hover:border-clinical-500 hover:text-clinical-700 dark:hover:text-clinical-400 transition-all duration-300 w-full sm:w-auto"
                    >
                      Contact & Collaborate
                    </Button>
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
