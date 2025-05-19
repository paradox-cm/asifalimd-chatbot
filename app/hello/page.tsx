"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState, useTransition } from "react"
import { submitMeetingRequest } from "@/app/actions/meeting-request"
import { Check, X, Loader2 } from "lucide-react"

export default function InvestorOneSheet() {
  // State for form submission
  const [isPending, startTransition] = useTransition()
  const [formState, setFormState] = useState<{
    success?: boolean
    message?: string
    error?: string
  } | null>(null)

  // Add print stylesheet dynamically
  useEffect(() => {
    // This ensures the print styles are only applied on the client side
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "/hello/print.css"
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [])

  // Handle form submission
  async function handleSubmit(formData: FormData) {
    // Clear previous form state
    setFormState(null)

    // Use React's useTransition to handle the async operation
    startTransition(async () => {
      try {
        console.log("Form submission started")
        const result = await submitMeetingRequest(formData)
        console.log("Form submission result:", result)
        setFormState(result)
      } catch (error) {
        console.error("Form submission error:", error)
        setFormState({
          success: false,
          message: "An error occurred. Please try again.",
          error: error instanceof Error ? error.message : String(error),
        })
      }
    })
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#08132C] text-charcoal dark:text-slate-100">
      {/* Print Buttons - Fixed position, only visible on screen */}
      <div className="fixed top-4 right-4 z-50 print:hidden flex gap-2">
        <Link href="/hello/print" target="_blank">
          <Button className="bg-clinical-600 hover:bg-clinical-700 dark:bg-clinical-700 dark:hover:bg-clinical-600 md:text-lg md:py-2.5 md:px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2 md:h-5 md:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Print Version
          </Button>
        </Link>
        <Button
          onClick={() => window.print()}
          className="bg-slate-600 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 md:text-lg md:py-2.5 md:px-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2 md:h-5 md:w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          Print Current
        </Button>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-8 md:px-8 md:py-10 md:text-lg">
        {/* Section 1: Hero Summary */}
        <section className="mb-12 md:mb-16">
          <Card className="p-6 md:p-10 bg-gradient-to-r from-clinical-50 to-white dark:from-clinical-900 dark:to-slate-900 border-clinical-200 dark:border-clinical-800">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center md:items-start">
              <div className="w-32 h-32 md:w-48 md:h-48 relative rounded-full overflow-hidden border-2 border-clinical-100 dark:border-clinical-700 flex-shrink-0">
                <Image
                  src="/images/dr-ali-portrait.png"
                  alt="Dr. Asif Ali"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 128px, 192px"
                  priority
                />
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-3xl font-medium mb-2 text-center md:text-left dark:text-white">
                  Bridging medicine, innovation, and equity through digital health.
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-4 text-center md:text-left md:text-xl">
                  <a href="mailto:asifalitex@gmail.com" className="hover:underline">
                    asifalitex@gmail.com
                  </a>{" "}
                  |
                  <a href="https://AsifAliMD.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {" "}
                    AsifAliMD.com
                  </a>
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3">
                  <Badge className="bg-clinical-100 text-clinical-800 hover:bg-clinical-200 dark:bg-clinical-800 dark:text-clinical-100 dark:hover:bg-clinical-700 md:text-base md:px-4 md:py-1.5">
                    Physician
                  </Badge>
                  <Badge className="bg-clinical-100 text-clinical-800 hover:bg-clinical-200 dark:bg-clinical-800 dark:text-clinical-100 dark:hover:bg-clinical-700 md:text-base md:px-4 md:py-1.5">
                    Fractional CMO
                  </Badge>
                  <Badge className="bg-clinical-100 text-clinical-800 hover:bg-clinical-200 dark:bg-clinical-800 dark:text-clinical-100 dark:hover:bg-clinical-700 md:text-base md:px-4 md:py-1.5">
                    Research Founder
                  </Badge>
                  <Badge className="bg-clinical-100 text-clinical-800 hover:bg-clinical-200 dark:bg-clinical-800 dark:text-clinical-100 dark:hover:bg-clinical-700 md:text-base md:px-4 md:py-1.5">
                    AHA AI Taskforce
                  </Badge>
                  <Badge className="bg-clinical-100 text-clinical-800 hover:bg-clinical-200 dark:bg-clinical-800 dark:text-clinical-100 dark:hover:bg-clinical-700 md:text-base md:px-4 md:py-1.5">
                    Doctorpreneur
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Section 2: Overview */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-xl md:text-2xl font-medium mb-4 border-b pb-2 dark:border-slate-700">Overview</h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed md:leading-relaxed">
            Dr. Asif Ali is a physician-entrepreneur operating at the nexus of cardiovascular care, digital health
            innovation, and clinical technology validation. As founder of Cena Ventures and Medical Director of Cena
            Research Institute, he advises and leads more than 15 med-tech companies—from AI diagnostics and wearables
            to virtual cardiac rehabilitation. With dual appointments in academic medicine and public health, he is
            known for translating rigorous science into scalable, equitable digital health solutions.
          </p>
        </section>

        {/* Section 3: Venture Leadership & Advisory Roles */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-xl md:text-2xl font-medium mb-4 border-b pb-2 dark:border-slate-700">
            Venture Leadership & Advisory Roles
          </h2>

          <div className="grid md:grid-cols-2 gap-8 md:gap-10">
            <div>
              <h3 className="text-lg md:text-xl font-medium mb-3 md:mb-4 text-clinical-700 dark:text-clinical-400">
                Strategic Partnerships
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5">
                <CompanyLogo name="Tabia Health AI" role="CMO" />
                <CompanyLogo name="Qardio" role="Global CMO" />
                <CompanyLogo name="Thrive360" role="CMO" />
                <CompanyLogo name="Lumi Health" role="CMO" />
                <CompanyLogo name="Avive AED" role="Advisor" />
                <CompanyLogo name="FirstHX" role="US Director" />
              </div>

              <div className="mt-6 md:mt-8">
                <h4 className="font-medium text-clinical-700 dark:text-clinical-400 mb-2 md:text-lg">Founder</h4>
                <div className="flex flex-col gap-2 md:gap-3">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-clinical-600 dark:bg-clinical-500"></div>
                    <span className="md:text-lg">
                      <span className="font-bold">Cena Ventures</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-clinical-600 dark:bg-clinical-500"></div>
                    <span className="md:text-lg">
                      <span className="font-bold">Cena Research Institute</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-medium mb-3 md:mb-4 text-clinical-700 dark:text-clinical-400">
                Key Roles
              </h3>
              <ul className="space-y-2 md:space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2 md:gap-3">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-clinical-600 dark:bg-clinical-500 mt-2"></div>
                  <span>
                    <span className="font-bold">Tabia Health AI</span> – Chief Medical Officer (2023–Present)
                  </span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-clinical-600 dark:bg-clinical-500 mt-2"></div>
                  <span>
                    <span className="font-bold">Qardio</span> – Global Chief Medical Officer (2022–2024)
                  </span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-clinical-600 dark:bg-clinical-500 mt-2"></div>
                  <span>
                    <span className="font-bold">Thrive360</span> (VR for mental health) – CMO (2021–2023)
                  </span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-clinical-600 dark:bg-clinical-500 mt-2"></div>
                  <span>
                    <span className="font-bold">Lumi Health</span> (Heart failure DTx) – CMO (2021–2023)
                  </span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-clinical-600 dark:bg-clinical-500 mt-2"></div>
                  <span>
                    <span className="font-bold">Avive AED</span> – Chief Medical Advisor (2017–Present)
                  </span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-clinical-600 dark:bg-clinical-500 mt-2"></div>
                  <span>
                    <span className="font-bold">FirstHX</span> (AI history-taking) – U.S. Managing Director
                    (2024–Present)
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Clinical & Academic Foundation */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-xl md:text-2xl font-medium mb-4 border-b pb-2 dark:border-slate-700">
            Academic & Clinical Foundation
          </h2>

          <div className="grid md:grid-cols-2 gap-8 md:gap-10">
            <div>
              <p className="text-lg md:text-xl font-medium mb-3 md:mb-4 text-clinical-700 dark:text-clinical-400">
                "Practicing cardiologist with a focus on autonomic and preventive care."
              </p>

              <ul className="space-y-2 md:space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2 md:gap-3">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-clinical-600 dark:bg-clinical-500 mt-2"></div>
                  <span>Partner, Houston Cardiology Consultants</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-clinical-600 dark:bg-clinical-500 mt-2"></div>
                  <span>Clinical Assistant Professor, McGovern Medical School & UH College of Medicine</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-clinical-600 dark:bg-clinical-500 mt-2"></div>
                  <span>MPH, UTHealth | MD, McGovern Medical School</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-clinical-600 dark:bg-clinical-500 mt-2"></div>
                  <span>Fellowships: Cardiology, Advanced Imaging</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-medium mb-3 md:mb-4 text-clinical-700 dark:text-clinical-400">
                Focus Areas
              </h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-200 dark:bg-teal-900 dark:text-teal-100 dark:hover:bg-teal-800 md:text-base md:px-4 md:py-1.5">
                  Dysautonomia
                </Badge>
                <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-200 dark:bg-teal-900 dark:text-teal-100 dark:hover:bg-teal-800 md:text-base md:px-4 md:py-1.5">
                  Preventive Cardiology
                </Badge>
                <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-200 dark:bg-teal-900 dark:text-teal-100 dark:hover:bg-teal-800 md:text-base md:px-4 md:py-1.5">
                  AI in Cardiovascular Care
                </Badge>
                <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-200 dark:bg-teal-900 dark:text-teal-100 dark:hover:bg-teal-800 md:text-base md:px-4 md:py-1.5">
                  Underserved Care Access
                </Badge>
              </div>

              <div className="mt-6 md:mt-8">
                <h3 className="text-lg md:text-xl font-medium mb-3 md:mb-4 text-clinical-700 dark:text-clinical-400">
                  Affiliations
                </h3>
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <div className="flex items-center gap-3 md:gap-4">
                    <Image
                      src="/images/logos/hcc-light.png"
                      alt="Houston Cardiology Consultants"
                      width={80}
                      height={80}
                      className="object-contain dark:hidden md:w-24 md:h-24"
                    />
                    <Image
                      src="/images/logos/hcc-dark.png"
                      alt="Houston Cardiology Consultants"
                      width={80}
                      height={80}
                      className="object-contain hidden dark:block md:w-24 md:h-24"
                    />
                    <span className="text-sm md:text-base">HCC</span>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4">
                    <Image
                      src="/images/logos/ut-health-black.png"
                      alt="UT Health"
                      width={80}
                      height={80}
                      className="object-contain dark:hidden md:w-24 md:h-24"
                    />
                    <Image
                      src="/images/logos/ut-health-white.png"
                      alt="UT Health"
                      width={80}
                      height={80}
                      className="object-contain hidden dark:block md:w-24 md:h-24"
                    />
                    <span className="text-sm md:text-base">UTHealth</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Strategic Leadership */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-xl md:text-2xl font-medium mb-4 border-b pb-2 dark:border-slate-700">
            Strategic Appointments & Leadership
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <LeadershipRole title="AHA Health Tech Advisory" subtitle="Lead: Health Tech Business Team" icon="heart" />
            <LeadershipRole title="AHA AI Taskforce" subtitle="Co-lead: AI in Clinical Practice" icon="brain" />
            <LeadershipRole title="True Health Initiative" subtitle="Council Member" icon="shield" />
            <LeadershipRole title="HCMS" subtitle="Former President, Western Branch" icon="users" />
          </div>
        </section>

        {/* Section 6: Research & Recognition */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-xl md:text-2xl font-medium mb-4 border-b pb-2 dark:border-slate-700">
            Select Research & Media Engagement
          </h2>

          <div>
            <h3 className="text-lg md:text-xl font-medium mb-3 md:mb-4 text-clinical-700 dark:text-clinical-400">
              Publications & Speaking
            </h3>
            <ul className="space-y-2 md:space-y-3 text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2 md:gap-3">
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-clinical-600 dark:bg-clinical-500 mt-2"></div>
                <span>Author: AHA Hypertension Journal – AI/ML Primer (2024)</span>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-clinical-600 dark:bg-clinical-500 mt-2"></div>
                <span>Panelist & Judge: AHA Health Innovation Pavilion (2022–2024)</span>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-clinical-600 dark:bg-clinical-500 mt-2"></div>
                <span>Frequent expert for national media (Fox, Dr. Oz, UpToDate, McGraw-Hill)</span>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-clinical-600 dark:bg-clinical-500 mt-2"></div>
                <span>Speaker: JPMorgan Health, AHA Scientific Sessions, ViVE, ACC</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 7: Footer/Contact */}
        <section id="contact" className="pt-6 md:pt-8 border-t dark:border-slate-700">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h2 className="text-xl md:text-2xl font-medium mb-4 md:mb-6 dark:text-white">Connect with Dr. Ali</h2>
              <div className="space-y-2 md:space-y-4">
                <p className="flex items-center gap-2 md:gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 md:h-6 md:w-6 text-clinical-600 dark:text-clinical-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <a href="mailto:asifalitex@gmail.com" className="dark:text-slate-300 hover:underline">
                    asifalitex@gmail.com
                  </a>
                </p>
                <p className="flex items-center gap-2 md:gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 md:h-6 md:w-6 text-clinical-600 dark:text-clinical-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <a
                    href="https://AsifAliMD.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dark:text-slate-300 hover:underline"
                  >
                    AsifAliMD.com
                  </a>
                </p>
                <p className="flex items-center gap-2 md:gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-clinical-600 dark:text-clinical-400 md:h-6 md:w-6"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <a
                    href="https://linkedin.com/in/drasifali"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dark:text-slate-300 hover:underline"
                  >
                    LinkedIn
                  </a>
                </p>
                <p className="flex items-center gap-2 md:gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-clinical-600 dark:text-clinical-400 md:h-6 md:w-6"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                  <Link href="/cv" className="dark:text-slate-300 hover:underline">
                    View CV
                  </Link>
                </p>
              </div>

              <div className="mt-6 md:mt-8">
                <h3 className="font-medium mb-2 md:mb-3 dark:text-white md:text-lg">Available for:</h3>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  <Badge className="bg-clinical-600 hover:bg-clinical-700 dark:bg-clinical-700 dark:hover:bg-clinical-600 md:text-base md:px-4 md:py-1.5">
                    Fractional CMO
                  </Badge>
                  <Badge className="bg-clinical-600 hover:bg-clinical-700 dark:bg-clinical-700 dark:hover:bg-clinical-600 md:text-base md:px-4 md:py-1.5">
                    Venture Advisory
                  </Badge>
                  <Badge className="bg-clinical-600 hover:bg-clinical-700 dark:bg-clinical-700 dark:hover:bg-clinical-600 md:text-base md:px-4 md:py-1.5">
                    Validation Partnerships
                  </Badge>
                </div>
              </div>
            </div>

            <div className="print:hidden">
              <h2 className="text-xl md:text-2xl font-medium mb-4 md:mb-6 dark:text-white">Request a Meeting</h2>

              {formState?.success ? (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 md:p-6 rounded-lg">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="bg-green-100 dark:bg-green-800/30 p-1 md:p-2 rounded-full mt-0.5">
                      <Check className="h-4 w-4 md:h-5 md:w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800 dark:text-green-300 md:text-lg">Request Sent</h4>
                      <p className="text-sm md:text-base text-green-700 dark:text-green-400">{formState.message}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <form action={handleSubmit} className="space-y-4 md:space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm md:text-base font-medium text-slate-700 dark:text-slate-300 mb-1 md:mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-clinical-500 focus:ring-clinical-500 dark:bg-slate-800 dark:text-white md:text-lg md:p-3"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm md:text-base font-medium text-slate-700 dark:text-slate-300 mb-1 md:mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-clinical-500 focus:ring-clinical-500 dark:bg-slate-800 dark:text-white md:text-lg md:p-3"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm md:text-base font-medium text-slate-700 dark:text-slate-300 mb-1 md:mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      required
                      className="w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-clinical-500 focus:ring-clinical-500 dark:bg-slate-800 dark:text-white md:text-lg md:p-3"
                    ></textarea>
                  </div>

                  {formState?.success === false && (
                    <div className="bg-red-50 dark:bg-red-900/20 p-3 md:p-4 rounded-md">
                      <div className="flex items-start gap-3 md:gap-4">
                        <div className="bg-red-100 dark:bg-red-800/30 p-1 md:p-1.5 rounded-full mt-0.5">
                          <X className="h-4 w-4 md:h-5 md:w-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <p className="text-sm md:text-base text-red-700 dark:text-red-400">{formState.message}</p>
                          {formState.error && (
                            <p className="text-xs md:text-sm text-red-600 dark:text-red-300 mt-1">
                              Error details: {formState.error}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-clinical-600 hover:bg-clinical-700 dark:bg-clinical-700 dark:hover:bg-clinical-600 md:text-lg md:py-3"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <span className="flex items-center justify-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      "Send Request"
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>

          <div className="mt-8 md:mt-10 text-center text-slate-600 dark:text-slate-400">
            <p className="text-sm md:text-base">Where evidence meets empathy.</p>
          </div>
        </section>

        {/* Print Button at Bottom */}
        <div className="mt-12 md:mt-16 text-center print:hidden">
          <Link href="/hello/print?print=true" target="_blank">
            <Button className="bg-clinical-600 hover:bg-clinical-700 dark:bg-clinical-700 dark:hover:bg-clinical-600 md:text-lg md:py-2.5 md:px-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 md:h-6 md:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Print This Page
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

// Helper Components
function CompanyLogo({ name, role }: { name: string; role: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-3 md:p-4 border rounded-md bg-white dark:bg-slate-800 dark:border-slate-700 hover:shadow-sm transition-shadow">
      <div className="w-10 h-10 md:w-12 md:h-12 bg-clinical-100 dark:bg-clinical-900 rounded-full flex items-center justify-center mb-2 md:mb-3">
        <span className="text-clinical-700 dark:text-clinical-300 text-xs md:text-sm font-medium">
          {name.substring(0, 2)}
        </span>
      </div>
      <span className="text-sm md:text-lg text-center font-medium dark:text-white">{name}</span>
      <span className="text-xs md:text-sm text-slate-500 dark:text-slate-400">{role}</span>
    </div>
  )
}

function LeadershipRole({ title, subtitle, icon }: { title: string; subtitle: string; icon: string }) {
  return (
    <div className="flex flex-col items-center text-center p-4 md:p-6 border rounded-md dark:border-slate-700 hover:shadow-sm transition-shadow dark:bg-slate-800">
      <div className="w-12 h-12 md:w-16 md:h-16 bg-clinical-100 dark:bg-clinical-900 rounded-full flex items-center justify-center mb-3 md:mb-4">
        {icon === "heart" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 md:h-8 md:w-8 text-clinical-700 dark:text-clinical-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        )}
        {icon === "brain" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 md:h-8 md:w-8 text-clinical-700 dark:text-clinical-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        )}
        {icon === "shield" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 md:h-8 md:w-8 text-clinical-700 dark:text-clinical-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        )}
        {icon === "users" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 md:h-8 md:w-8 text-clinical-700 dark:text-clinical-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        )}
      </div>
      <h3 className="font-medium text-sm md:text-base dark:text-white">{title}</h3>
      <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1">{subtitle}</p>
    </div>
  )
}
