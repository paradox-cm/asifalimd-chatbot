import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { DownloadCloud, Quote } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Media Kit",
  description:
    "Official media kit for Dr. Asif Ali, MD. Includes biography, quotes, and downloadable assets for event programming and promotional materials.",
}

interface QuoteItem {
  category: string
  text: string
}

const quotes: QuoteItem[] = [
  {
    category: "On Digital Innovation in Medicine",
    text: "Technology is not here to replace the physician — it’s here to extend our reach, deepen personalization, and open doors for those medicine has long left behind.",
  },
  {
    category: "On Research Inclusivity",
    text: "Clinical trials should mirror the people we serve. Diversity in research isn’t just about equity — it’s the foundation of scientific precision.",
  },
  {
    category: "On Preventive Cardiovascular Care",
    text: "Prevention isn’t a prescription — it’s a relationship. One built on foresight, shared data, and patient trust.",
  },
  {
    category: "On AI in Clinical Practice",
    text: "AI only matters in medicine when it brings clarity to complexity — for both the doctor and the patient.",
  },
  {
    category: "On Leadership in Medicine",
    text: "We’re not just building programs — we’re building platforms to empower others to solve problems we haven’t yet imagined.",
  },
]

const PDF_DOWNLOAD_PATH = "/files/dr-asif-ali-cv.pdf" // Using CV as placeholder for full media kit
const PDF_DOWNLOAD_FILENAME = "Dr_Asif_Ali_Media_Kit.pdf"

export default function MediaKitPage() {
  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 sm:py-16 md:py-24">
        {/* Hero Section */}
        <section className="text-center mb-16 md:mb-20">
          <div className="relative mx-auto w-32 h-32 md:w-40 md:h-40 mb-6 rounded-full overflow-hidden shadow-lg border-2 border-clinical-200">
            <Image
              src="/images/dr-ali-new-headshot.png" // Ensure this path is correct
              alt="Dr. Asif Ali Headshot"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal dark:text-slate-100 mb-2">Dr. Asif Ali, MD</h1>
          <p className="text-lg md:text-xl text-clinical-700 dark:text-clinical-400 font-medium mb-8">
            Cardiologist | Clinical Innovator | Med-Tech Strategist
          </p>
          <Button size="lg" asChild>
            <a href={PDF_DOWNLOAD_PATH} download={PDF_DOWNLOAD_FILENAME}>
              <DownloadCloud className="mr-2 h-5 w-5" />
              Download Full Kit as PDF
            </a>
          </Button>
        </section>

        {/* Content Sections */}
        <Accordion type="multiple" className="w-full space-y-3 md:space-y-4">
          <AccordionItem value="welcome-note" className="border dark:border-slate-700 rounded-lg shadow-sm bg-card">
            <AccordionTrigger className="text-xl font-medium px-6 py-4 hover:no-underline text-charcoal dark:text-slate-200">
              Welcome Note
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-0">
              <div className="mb-6 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
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
                and digital engagement. It’s an honor to join peers committed to shaping the next chapter in health and
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
              <div className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
                <p>
                  Dr. Asif Ali is a Houston-based cardiologist and nationally recognized leader at the crossroads of
                  clinical care, digital health, and medical innovation. He serves as a partner at Houston Cardiology
                  Consultants and is the founder of the Cena Research Institute, where he advances inclusive clinical
                  trials and validation for emerging technologies.
                </p>
                <p>
                  Dr. Ali is a Clinical Assistant Professor at McGovern Medical School and a member of the American
                  Heart Association’s Health Tech Advisory Group, where he co-leads initiatives on AI, remote
                  monitoring, and virtual care. As a strategic advisor and fractional CMO to over 15 health-tech
                  ventures, he is known for translating medical rigor into scalable, human-centered solutions.
                </p>
                <p>
                  Whether mentoring startups or designing care models, Dr. Ali’s work is driven by a simple ethos: Where
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
                      <Quote className="inline-block h-5 w-5 mr-1 -mt-1 text-clinical-500" />
                      {quote.text}
                      <Quote className="inline-block h-5 w-5 ml-1 -mt-1 transform scale-x-[-1] text-clinical-500" />
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
              <div className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
                <p>This package includes the finalized speaker profile and quotes for Medfuel event coordination.</p>
                <p>Pending inclusion:</p>
                <ul className="list-disc pl-5">
                  <li>High-resolution headshot (included)</li>
                  <li>Confirmation of ticketing support (to be clarified)</li>
                </ul>
                <p>
                  Thank you again for the invitation. I look forward to being part of the conversation and contributing
                  to Medfuel’s impact in health innovation.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="download-kit" className="border dark:border-slate-700 rounded-lg shadow-sm bg-card">
            <AccordionTrigger className="text-xl font-medium px-6 py-4 hover:no-underline text-charcoal dark:text-slate-200">
              Download Media Kit
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-0 text-center">
              <Button size="lg" asChild className="mt-4">
                <a href={PDF_DOWNLOAD_PATH} download={PDF_DOWNLOAD_FILENAME}>
                  <DownloadCloud className="mr-2 h-5 w-5" />
                  Download PDF
                </a>
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
