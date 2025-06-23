"use client"

import Image from "next/image"
import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { DownloadCloud, Expand, X, FileText } from "lucide-react"

interface QuoteItem {
  category: string
  text: string
}

const quotes: QuoteItem[] = [
  {
    category: "On Digital Innovation in Medicine",
    text: "Tech's not here to replace us. It's here to help us go further — to tailor care, reach more people, and finally show up for folks medicine has ignored for too long.",
  },
  {
    category: "On Research Inclusivity",
    text: "If our research doesn't reflect the real world — the real faces in our clinics — then the science is incomplete. Diversity in trials isn't a bonus. It's basic accuracy.",
  },
  {
    category: "On Preventive Cardiovascular Care",
    text: "Prevention isn't something you prescribe — it's something you build with people. It takes trust, long-term thinking, and the kind of data that actually helps guide everyday life.",
  },
  {
    category: "On AI in Clinical Practice",
    text: "AI's only useful in medicine if it helps make things clearer — not just for us as doctors, but for our patients too. It's got to cut through the noise.",
  },
  {
    category: "On Leadership in Medicine",
    text: "We're not just building programs — we're building platforms to empower others to solve problems we haven't yet imagined.",
  },
]

const DROPBOX_PDF_URL =
  "https://www.dropbox.com/scl/fi/jvucpci1tgrt76qxlwrge/Dr_Asif_Ali_Medfuel_Speaker_Media_Kit_Printable.pdf?rlkey=tbtlpgwgpy4vgrm3km2jiuian&dl=0"
const GOOGLE_DOCS_URL =
  "https://docs.google.com/document/d/1Bt52r3XxWOJ4wZ2J-Tm3iv8zUxWxiB44I3I3B6FA2XU/edit?usp=sharing"

export default function MediaKitPage() {
  const [isImageOpen, setIsImageOpen] = useState(false)

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 sm:py-16 md:py-24">
        {/* Hero Section */}
        <section className="text-center mb-16 md:mb-20">
          <div className="relative mx-auto w-32 h-32 md:w-40 md:h-40 mb-6 group">
            <div
              className="relative w-full h-full rounded-full overflow-hidden shadow-lg border-2 border-clinical-200 cursor-pointer transition-transform hover:scale-105"
              onClick={() => setIsImageOpen(true)}
            >
              <Image
                src="/images/dr-ali-high-res-headshot.png"
                alt="Dr. Asif Ali Headshot"
                layout="fill"
                objectFit="cover"
                priority
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <Expand className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-6 w-6" />
              </div>
            </div>
            {/* Tooltip */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                Click to view full size
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-charcoal dark:text-slate-100 mb-2">Dr. Asif Ali, MD</h1>
          <p className="text-lg md:text-xl text-clinical-700 dark:text-clinical-400 font-medium mb-8">
            Cardiologist | Clinical Innovator | Med-Tech Strategist
          </p>
          <Button size="lg" asChild>
            <a
              href={DROPBOX_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <DownloadCloud className="h-5 w-5" />
              Download Media Kit PDF
            </a>
          </Button>
        </section>

        {/* Image Lightbox */}
        <Dialog open={isImageOpen} onOpenChange={setIsImageOpen}>
          <DialogContent className="max-w-2xl p-0 bg-transparent border-none shadow-none">
            <DialogClose className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-6 w-6 text-white" />
              <span className="sr-only">Close</span>
            </DialogClose>
            <div className="relative w-full h-[600px]">
              <Image
                src="/images/dr-ali-high-res-headshot.png"
                alt="Dr. Asif Ali Headshot - Full Size"
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
            {/* Download Button */}
            <div className="flex justify-center mt-4 pb-4">
              <Button asChild variant="secondary" size="sm">
                <a
                  href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dr-Asf-Ali-f1ZcxVUg6IQPq0ueRzzk2ZIA27wZyA.png"
                  download="Dr_Asif_Ali_High_Res_Headshot.png"
                  className="flex items-center gap-2"
                >
                  <DownloadCloud className="h-4 w-4" />
                  Download Image
                </a>
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Content Sections */}
        <Accordion type="multiple" className="w-full space-y-3 md:space-y-4">
          <AccordionItem value="welcome-note" className="border dark:border-slate-700 rounded-lg shadow-sm bg-card">
            <AccordionTrigger className="text-xl font-medium px-6 py-4 hover:no-underline text-charcoal dark:text-slate-200">
              Welcome Note
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-0">
              <div className="mb-6 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center sm:justify-center gap-4 sm:gap-6 md:gap-8">
                {/* Medfuel Logo */}
                <div className="relative h-10 w-36 sm:h-12 sm:w-44">
                  <Image
                    src="/images/logos/medfuel-logo.png"
                    alt="Medfuel Logo"
                    layout="fill"
                    objectFit="contain"
                    className="dark:brightness-0 dark:invert" // Basic dark mode adjustment
                  />
                </div>

                {/* Houston Cardiology Consultants Logo */}
                <div className="relative h-12 w-32 sm:h-16 sm:w-40">
                  <Image
                    src="/images/logos/hcc-light.png"
                    alt="Houston Cardiology Consultants Logo (Light)"
                    layout="fill"
                    objectFit="contain"
                    className="block dark:hidden"
                  />
                  <Image
                    src="/images/logos/hcc-dark.png"
                    alt="Houston Cardiology Consultants Logo (Dark)"
                    layout="fill"
                    objectFit="contain"
                    className="hidden dark:block"
                  />
                </div>

                {/* The POTS Doc Logo */}
                <div className="relative h-11 w-11 sm:h-14 sm:w-14">
                  <Image
                    src="/images/pots-doc-heart.png" // Using the more specific logo
                    alt="The POTS Doc Logo"
                    layout="fill"
                    objectFit="contain"
                    // This logo might need a specific dark mode version or filter if it doesn't show well
                  />
                </div>
              </div>
              <p>
                Thank you for the opportunity to participate in Medfuel 2025. This media folder contains my official
                speaker profile, perspective quotes, and biography to support event programming, promotional materials,
                and digital engagement. It's an honor to join peers committed to shaping the next chapter in health and
                medicine.
              </p>
              <p>
                Please feel free to reach out if additional materials or collaboration opportunities arise in the
                lead-up to the event.
              </p>
              <p className="text-right">— Dr. Asif Ali, MD</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="bio" className="border dark:border-slate-700 rounded-lg shadow-sm bg-card">
            <AccordionTrigger className="text-xl font-medium px-6 py-4 hover:no-underline text-charcoal dark:text-slate-200">
              Bio
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-0">
              <div className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-4">
                <p>
                  Dr. Asif Ali is a Houston-based cardiologist and nationally recognized leader at the crossroads of
                  clinical care, digital health, and medical innovation. He serves as a partner at Houston Cardiology
                  Consultants and is the founder of the Cena Research Institute, where he advances inclusive clinical
                  trials and validation for emerging technologies.
                </p>

                <p>
                  Dr. Ali is a Clinical Assistant Professor at McGovern Medical School and a member of the American
                  Heart Association's Health Tech Advisory Group, where he co-leads initiatives on AI, remote
                  monitoring, and virtual care. As a strategic advisor and fractional CMO to over 15 health-tech
                  ventures, he is known for translating medical rigor into scalable, human-centered solutions.
                </p>

                <p>
                  Whether mentoring startups or designing care models, Dr. Ali's work is driven by a simple ethos: Where
                  evidence meets empathy.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="quotes" className="border dark:border-slate-700 rounded-lg shadow-sm bg-card">
            <AccordionTrigger className="text-xl font-medium px-6 py-4 hover:no-underline text-charcoal dark:text-slate-200">
              Curated Quotes
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-0">
              <div className="space-y-8">
                {quotes.map((quote, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-clinical-500 pl-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-r-md"
                  >
                    <h4 className="font-semibold text-md text-clinical-700 dark:text-clinical-400 mb-1">
                      {quote.category}
                    </h4>
                    <blockquote className="italic text-slate-700 dark:text-slate-300 text-xl">
                      "{quote.text}"
                    </blockquote>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="final-notes" className="border dark:border-slate-700 rounded-lg shadow-sm bg-card">
            <AccordionTrigger className="text-xl font-medium px-6 py-4 hover:no-underline text-charcoal dark:text-slate-200">
              Final Notes
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-0">
              <div className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-4">
                <p>This package includes the finalized speaker profile and quotes for Medfuel event coordination.</p>

                <div>
                  <p className="mb-2">Pending inclusion:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>High-resolution headshot (included)</li>
                    <li>Confirmation of ticketing support (to be clarified)</li>
                  </ul>
                </div>

                <p>
                  Thank you again for the invitation. I look forward to being part of the conversation and contributing
                  to Medfuel's impact in health innovation.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="download-kit" className="border dark:border-slate-700 rounded-lg shadow-sm bg-card">
            <AccordionTrigger className="text-xl font-medium px-6 py-4 hover:no-underline text-charcoal dark:text-slate-200">
              Download Media Kit
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-0">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="xl" asChild>
                  <a href={DROPBOX_PDF_URL} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <DownloadCloud className="mr-2 h-5 w-5" />
                    Download PDF
                  </a>
                </Button>
                <Button size="xl" variant="secondary" asChild>
                  <a href={GOOGLE_DOCS_URL} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Open in Google Docs
                  </a>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
