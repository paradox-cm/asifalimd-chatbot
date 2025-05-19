"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Brain, Activity, ClipboardCheck, Stethoscope, Globe, ArrowRight, Microscope } from "lucide-react"
import FadeInSection from "@/components/fade-in-section"
import { Badge } from "@/components/ui/badge"
import { submitSpeakingRequest } from "@/app/actions/speaking-request"
import CollapsibleSection from "@/components/collapsible-section"

export default function MediaPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formMessage, setFormMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormError(null)

    try {
      const formData = new FormData(e.currentTarget)
      const result = await submitSpeakingRequest(formData)

      if (result.success) {
        setFormSubmitted(true)
        setFormMessage(result.message)
      } else {
        setFormError(result.message)
      }
    } catch (error) {
      setFormError("An unexpected error occurred. Please try again later.")
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormSubmitted(false)
    setFormError(null)
    setFormMessage(null)
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        className="w-full py-10 sm:py-12 md:py-16 lg:py-20 px-2 sm:px-3 md:px-4 bg-background"
        aria-label="Media Introduction"
      >
        <div className="container mx-auto px-2 sm:px-3 md:px-4" style={{ maxWidth: "1160px" }}>
          <FadeInSection>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-foreground">
              Speaking & Media
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-6">
              Trusted voice on digital health, dysautonomia, equity, and medical innovation. Over 110+ media
              appearances.
            </p>
            <p className="text-lg md:text-xl text-foreground/70 mb-4 sm:mb-6 md:mb-8 border-l border-clinical-500 pl-4 py-2">
              Dr. Asif Ali speaks nationally on autonomic disorders, clinical AI, post-COVID care, and translational
              strategy. He has appeared on Fox News, The Dr. Oz Show, UpToDate, and major medical conferences such as
              the American Heart Association's Scientific Sessions.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Featured Media & Appearances Section */}
      <CollapsibleSection title="Featured Media & Appearances" defaultOpen={true}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FadeInSection delay={100}>
            <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300 h-full">
              <div className="flex flex-col">
                <div>
                  <p className="text-xl font-semibold text-foreground mb-1">Fox & Friends, National TV | 2016</p>
                  <h3 className="text-foreground/70">"Wearables and Wellness"</h3>
                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={150}>
            <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300 h-full">
              <div className="flex flex-col">
                <div>
                  <p className="text-xl font-semibold text-foreground mb-1">The Dr. Oz Show | 2010</p>
                  <h3 className="text-foreground/70">"Sudden Cardiac Death in Adolescents"</h3>
                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={200}>
            <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300 h-full">
              <div className="flex flex-col">
                <div>
                  <p className="text-xl font-semibold text-foreground mb-1">McGraw Hill HQ, Video Panel | 2018</p>
                  <h3 className="text-foreground/70">"Digital Therapeutics & Health 2.0"</h3>
                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={250}>
            <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300 h-full">
              <div className="flex flex-col">
                <div>
                  <p className="text-xl font-semibold text-foreground mb-1">Fox News NY Studio | 2016</p>
                  <h3 className="text-foreground/70">"How Telewellness is Changing Healthcare"</h3>
                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={300}>
            <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300 h-full">
              <div className="flex flex-col">
                <div>
                  <p className="text-xl font-semibold text-foreground mb-1">Abbott Nutrition HQ | 2019</p>
                  <h3 className="text-foreground/70">"The Future of Personalized Nutrition"</h3>
                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={350}>
            <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300 h-full">
              <div className="flex flex-col">
                <div>
                  <p className="text-xl font-semibold text-foreground mb-1">Fox News NY | 2016</p>
                  <h3 className="text-foreground/70">"Can a Heart Really Break?"</h3>
                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={400}>
            <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300 h-full md:col-span-2">
              <div className="flex flex-col">
                <div>
                  <p className="text-xl font-semibold text-foreground mb-1">
                    Multiple panels, keynotes, and poster sessions | 2022–2023
                  </p>
                  <h3 className="text-foreground/70">American Heart Association – Scientific Sessions</h3>
                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={450}>
            <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300 h-full">
              <div className="flex flex-col">
                <div>
                  <p className="text-xl font-semibold text-foreground mb-1">Podcast with EPAM / Lisa Butcher | 2021</p>
                  <h3 className="text-foreground/70">"Imagine if COVID Struck an IoMT World"</h3>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </CollapsibleSection>

      {/* Media Bio Section - Moved from About page */}
      <section
        className="w-full py-10 sm:py-12 md:py-16 lg:py-20 px-2 sm:px-3 md:px-4 bg-background"
        aria-label="Media Bio"
      >
        <div className="container mx-auto px-2 sm:px-3 md:px-4" style={{ maxWidth: "1160px" }}>
          <FadeInSection>
            <div className="border-2 border-border p-4 sm:p-6 md:p-8 rounded-lg bg-card">
              <div className="mb-4 sm:mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Media Bio</h2>
              </div>
              <div className="space-y-4 text-foreground/80">
                <p className="text-lg">
                  Dr. Asif Ali, MD is a cardiologist, educator, and med-tech strategist based in Houston, Texas.
                </p>
                <p className="text-lg">
                  He leads clinical care, inclusive research, and innovation strategy through his roles at Houston
                  Cardiology Consultants, McGovern Medical School, Cena Research Institute, and Cena Ventures.
                </p>
                <p className="text-lg">
                  He advises startups, speaks nationally on dysautonomia and digital health, and is a champion of
                  equitable, human-centered innovation in medicine.
                </p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Keynote & Talk Topics Section */}
      <CollapsibleSection title="Keynote & Talk Topics" defaultOpen={false}>
        <div className="flex flex-wrap gap-3 mb-4 sm:mb-6 md:mb-8">
          <Badge className="text-base py-2 px-4 bg-clinical-100 hover:bg-clinical-200 text-clinical-800 dark:bg-clinical-900/30 dark:text-clinical-300 dark:hover:bg-clinical-900/50">
            <Brain className="h-4 w-4 mr-2" />
            POTS and Dysautonomia: From confusion to clarity
          </Badge>

          <Badge className="text-base py-2 px-4 bg-clinical-100 hover:bg-clinical-200 text-clinical-800 dark:bg-clinical-900/30 dark:text-clinical-300 dark:hover:bg-clinical-900/50">
            <Activity className="h-4 w-4 mr-2" />
            Post-COVID care models and long-COVID diagnostics
          </Badge>

          <Badge className="text-base py-2 px-4 bg-clinical-100 hover:bg-clinical-200 text-clinical-800 dark:bg-clinical-900/30 dark:text-clinical-300 dark:hover:bg-clinical-900/50">
            <Stethoscope className="h-4 w-4 mr-2" />
            Physician-led innovation in digital health
          </Badge>

          <Badge className="text-base py-2 px-4 bg-clinical-100 hover:bg-clinical-200 text-clinical-800 dark:bg-clinical-900/30 dark:text-clinical-300 dark:hover:bg-clinical-900/50">
            <Microscope className="h-4 w-4 mr-2" />
            AI + ML in real-world cardiology
          </Badge>

          <Badge className="text-base py-2 px-4 bg-clinical-100 hover:bg-clinical-200 text-clinical-800 dark:bg-clinical-900/30 dark:text-clinical-300 dark:hover:bg-clinical-900/50">
            <ClipboardCheck className="h-4 w-4 mr-2" />
            Clinical trial inclusivity & community-based research
          </Badge>

          <Badge className="text-base py-2 px-4 bg-clinical-100 hover:bg-clinical-200 text-clinical-800 dark:bg-clinical-900/30 dark:text-clinical-300 dark:hover:bg-clinical-900/50">
            <Globe className="h-4 w-4 mr-2" />
            Health equity in med-tech and academia
          </Badge>
        </div>

        <div className="border-2 border-border p-4 sm:p-6 md:p-8 rounded-lg bg-card">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Invite Dr. Ali to Speak</h2>
          <p className="text-lg text-foreground/80 mb-4 sm:mb-6 md:mb-8">
            For conferences, podcasts, corporate panels, or press interviews, use the contact form below or reach out
            directly.
          </p>

          {formSubmitted ? (
            <div className="bg-clinical-50 dark:bg-clinical-900/30 border border-clinical-200 dark:border-clinical-800 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-2 text-foreground">Thank You!</h3>
              <p className="text-foreground/70 mb-4">
                {formMessage || "Your speaking engagement request has been submitted. We will get back to you shortly."}
              </p>
              <Button
                onClick={resetForm}
                variant="outline"
                className="mt-2 border-clinical-200 dark:border-clinical-800"
              >
                Submit Another Request
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {formError && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-800 dark:text-red-300">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground/70">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
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
                    name="organization"
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
                  name="email"
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
                  name="details"
                  placeholder="Please provide details about your event, including date, format, audience, and topics of interest."
                  rows={5}
                  required
                  className="border-border focus:border-clinical-500"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-clinical-600 hover:bg-clinical-700 text-white transition-all duration-300 flex items-center gap-2"
                >
                  {isSubmitting ? "Submitting..." : "Request Speaking Engagement"}
                  {!isSubmitting && <ArrowRight className="h-4 w-4" />}
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
      </CollapsibleSection>
    </div>
  )
}
