"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { QRCodeSVG } from "qrcode.react"

export default function PrintableOneSheet() {
  const [isPrintMode, setIsPrintMode] = useState(false)
  const [showPrintDialog, setShowPrintDialog] = useState(false)

  // Auto-trigger print dialog when requested via URL parameter
  useEffect(() => {
    // Add print-specific styles
    const style = document.createElement("style")
    style.textContent = `
      @media print {
        @page {
          size: letter portrait;
          margin: 0.5in;
        }
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.4;
          color: #000;
          background: #fff !important;
        }
        .print-button, .no-print {
          display: none !important;
        }
        section {
          page-break-inside: avoid;
        }
        h1, h2, h3, h4 {
          page-break-after: avoid;
        }
        img {
          max-width: 100% !important;
        }
        a {
          text-decoration: none;
          color: #000;
        }
        .badge {
          border: 1px solid #666;
          background: #f3f4f6 !important;
          color: #000 !important;
          padding: 0.1rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
          display: inline-block;
          margin-right: 0.25rem;
          margin-bottom: 0.25rem;
        }
        .bullet {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #666;
          margin-right: 8px;
          vertical-align: middle;
        }
        .qr-code-container {
          display: block !important;
        }
        .print-footer {
          position: fixed;
          bottom: 0.5in;
          width: 100%;
          text-align: center;
          font-size: 8pt;
          color: #666;
        }
      }
    `
    document.head.appendChild(style)

    // Check if URL has print parameter
    const urlParams = new URLSearchParams(window.location.search)
    const autoPrint = urlParams.get("print")

    if (autoPrint === "true") {
      setIsPrintMode(true)
      // Delay to ensure page is fully loaded
      setTimeout(() => {
        setShowPrintDialog(true)
      }, 1000)
    }
  }, [])

  // Handle print dialog
  useEffect(() => {
    if (showPrintDialog) {
      window.print()
      setShowPrintDialog(false)
    }
  }, [showPrintDialog])

  const handlePrint = () => {
    setIsPrintMode(true)
    setTimeout(() => {
      window.print()
    }, 100)
  }

  return (
    <div className="bg-white dark:bg-slate-900 text-black dark:text-white p-8 max-w-[8.5in] mx-auto">
      {/* Print Button */}
      <div className="print-button fixed top-4 right-4 z-50 print:hidden">
        <Button
          onClick={handlePrint}
          className="bg-clinical-600 hover:bg-clinical-700 dark:bg-clinical-700 dark:hover:bg-clinical-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
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
          Print PDF
        </Button>
      </div>

      <div className="print-button mb-8 text-center print:hidden">
        <Link href="/hello" className="text-clinical-600 hover:underline dark:text-clinical-400">
          ← Back to Interactive Version
        </Link>
      </div>

      {/* Header */}
      <header className="mb-6 border-b dark:border-slate-700 pb-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold dark:text-white">Dr. Asif Ali, MD</h1>
            <p className="text-gray-700 dark:text-gray-300">
              Cardiologist | Health-Tech Strategist | Clinical Advisor | Academic Leader
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              <a href="mailto:asifalitex@gmail.com" className="hover:underline dark:text-gray-300">
                asifalitex@gmail.com
              </a>{" "}
              |
              <a
                href="https://AsifAliMD.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline dark:text-gray-300"
              >
                {" "}
                AsifAliMD.com
              </a>
            </p>
          </div>
          <div className="mt-4 md:mt-0 relative w-24 h-24">
            <Image
              src="/images/dr-ali-portrait.png"
              alt="Dr. Asif Ali"
              fill
              className="object-cover rounded-full"
              sizes="96px"
              priority
            />
          </div>
        </div>
      </header>

      {/* Mission Statement */}
      <section className="mb-6">
        <h2 className="text-xl font-bold text-center mb-2 dark:text-white">
          Bridging medicine, innovation, and equity through digital health.
        </h2>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <span className="badge dark:bg-clinical-800 dark:text-clinical-100">Physician</span>
          <span className="badge dark:bg-clinical-800 dark:text-clinical-100">Fractional CMO</span>
          <span className="badge dark:bg-clinical-800 dark:text-clinical-100">Research Founder</span>
          <span className="badge dark:bg-clinical-800 dark:text-clinical-100">AHA AI Taskforce</span>
          <span className="badge dark:bg-clinical-800 dark:text-clinical-100">Doctorpreneur</span>
        </div>
      </section>

      {/* Overview */}
      <section className="mb-6">
        <h2 className="text-lg font-bold mb-2 border-b dark:border-slate-700 pb-1 dark:text-white">Overview</h2>
        <p className="text-sm dark:text-gray-300">
          Dr. Asif Ali is a physician-entrepreneur operating at the nexus of cardiovascular care, digital health
          innovation, and clinical technology validation. As founder of Cena Ventures and Medical Director of Cena
          Research Institute, he advises and leads more than 15 med-tech companies—from AI diagnostics and wearables to
          virtual cardiac rehabilitation. With dual appointments in academic medicine and public health, he is known for
          translating rigorous science into scalable, equitable digital health solutions.
        </p>
      </section>

      {/* Two Column Layout for Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          {/* Venture Leadership */}
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-2 border-b dark:border-slate-700 pb-1 dark:text-white">
              Venture Leadership & Advisory
            </h2>
            <h3 className="text-base font-semibold mb-1 dark:text-clinical-400">Key Roles</h3>
            <ul className="text-sm space-y-1 dark:text-gray-300">
              <li>
                <span className="bullet dark:bg-clinical-500"></span>
                <span className="font-bold">Tabia Health AI</span> – Chief Medical Officer (2023–Present)
              </li>
              <li>
                <span className="bullet dark:bg-clinical-500"></span>
                <span className="font-bold">Qardio</span> – Global Chief Medical Officer (2022–2024)
              </li>
              <li>
                <span className="bullet dark:bg-clinical-500"></span>
                <span className="font-bold">Thrive360</span> (VR for mental health) – CMO (2021–2023)
              </li>
              <li>
                <span className="bullet dark:bg-clinical-500"></span>
                <span className="font-bold">Lumi Health</span> (Heart failure DTx) – CMO (2021–2023)
              </li>
              <li>
                <span className="bullet dark:bg-clinical-500"></span>
                <span className="font-bold">Avive AED</span> – Chief Medical Advisor (2017–Present)
              </li>
              <li>
                <span className="bullet dark:bg-clinical-500"></span>
                <span className="font-bold">FirstHX</span> (AI history-taking) – U.S. Managing Director (2024–Present)
              </li>
            </ul>

            <h3 className="text-base font-semibold mt-3 mb-1 dark:text-clinical-400">Founder</h3>
            <ul className="text-sm space-y-1 dark:text-gray-300">
              <li>
                <span className="bullet dark:bg-clinical-500"></span>
                <span className="font-bold">Cena Ventures</span>
              </li>
              <li>
                <span className="bullet dark:bg-clinical-500"></span>
                <span className="font-bold">Cena Research Institute</span>
              </li>
            </ul>
          </section>

          {/* Clinical & Academic */}
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-2 border-b dark:border-slate-700 pb-1 dark:text-white">
              Clinical & Academic Foundation
            </h2>
            <p className="text-sm italic mb-2 dark:text-gray-300">
              "Practicing cardiologist with a focus on autonomic and preventive care."
            </p>
            <ul className="text-sm space-y-1 dark:text-gray-300">
              <li>
                <span className="bullet dark:bg-clinical-500"></span>Partner, Houston Cardiology Consultants
              </li>
              <li>
                <span className="bullet dark:bg-clinical-500"></span>Clinical Assistant Professor, McGovern Medical
                School & UH College of Medicine
              </li>
              <li>
                <span className="bullet dark:bg-clinical-500"></span>MPH, UTHealth | MD, McGovern Medical School
              </li>
              <li>
                <span className="bullet dark:bg-clinical-500"></span>Fellowships: Cardiology, Advanced Imaging
              </li>
            </ul>

            <h3 className="text-base font-semibold mt-3 mb-1 dark:text-clinical-400">Focus Areas</h3>
            <div className="flex flex-wrap gap-1">
              <span className="badge dark:bg-teal-900 dark:text-teal-100">Dysautonomia</span>
              <span className="badge dark:bg-teal-900 dark:text-teal-100">Preventive Cardiology</span>
              <span className="badge dark:bg-teal-900 dark:text-teal-100">AI in Cardiovascular Care</span>
              <span className="badge dark:bg-teal-900 dark:text-teal-100">Underserved Care Access</span>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div>
          {/* Strategic Leadership */}
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-2 border-b dark:border-slate-700 pb-1 dark:text-white">
              Strategic Appointments & Leadership
            </h2>
            <ul className="text-sm space-y-1 dark:text-gray-300">
              <li>
                <span className="bullet dark:bg-clinical-500"></span>
                <strong>AHA Health Tech Advisory</strong>: Lead, Health Tech Business Team
              </li>
              <li>
                <span className="bullet dark:bg-clinical-500"></span>
                <strong>AHA AI Taskforce</strong>: Co-lead, AI in Clinical Practice
              </li>
              <li>
                <span className="bullet dark:bg-clinical-500"></span>
                <strong>True Health Initiative</strong>: Council Member
              </li>
              <li>
                <span className="bullet dark:bg-clinical-500"></span>
                <strong>HCMS</strong>: Former President, Western Branch
              </li>
            </ul>
          </section>

          {/* Research & Recognition */}
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-2 border-b dark:border-slate-700 pb-1 dark:text-white">
              Research & Media Engagement
            </h2>
            <ul className="text-sm space-y-1 dark:text-gray-300">
              <li>
                <span className="bullet dark:bg-clinical-500"></span>Author: AHA Hypertension Journal – AI/ML Primer
                (2024)
              </li>
              <li>
                <span className="bullet dark:bg-clinical-500"></span>Panelist & Judge: AHA Health Innovation Pavilion
                (2022–2024)
              </li>
              <li>
                <span className="bullet dark:bg-clinical-500"></span>Frequent expert for national media (Fox, Dr. Oz,
                UpToDate, McGraw-Hill)
              </li>
              <li>
                <span className="bullet dark:bg-clinical-500"></span>Speaker: JPMorgan Health, AHA Scientific Sessions,
                ViVE, ACC
              </li>
            </ul>
          </section>

          {/* Available For */}
          <section className="mb-6">
            <h3 className="text-base font-semibold mb-1 dark:text-clinical-400">Available for:</h3>
            <div className="flex flex-wrap gap-1">
              <span className="badge dark:bg-clinical-800 dark:text-clinical-100">Fractional CMO</span>
              <span className="badge dark:bg-clinical-800 dark:text-clinical-100">Venture Advisory</span>
              <span className="badge dark:bg-clinical-800 dark:text-clinical-100">Validation Partnerships</span>
            </div>
          </section>
        </div>
      </div>

      {/* Social Media Links */}
      <section className="mb-6 mt-4">
        <h2 className="text-lg font-bold mb-2 dark:text-white">Connect Online</h2>
        <div className="flex gap-4">
          <a
            href="https://linkedin.com/in/drasifali"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-clinical-600 dark:text-clinical-400 hover:underline"
          >
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
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
            LinkedIn
          </a>
          <a
            href="https://twitter.com/drasifali"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-clinical-600 dark:text-clinical-400 hover:underline"
          >
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
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
            Twitter
          </a>
          <a
            href="/files/dr-asif-ali-cv.pdf"
            download
            className="flex items-center gap-2 text-clinical-600 dark:text-clinical-400 hover:underline"
          >
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
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download CV
          </a>
        </div>
      </section>

      {/* QR Code - Hidden on screen, visible in print */}
      <div className="qr-code-container hidden print:block mt-4 text-center">
        <div className="inline-block p-2 bg-white border border-gray-300 rounded">
          <QRCodeSVG value="https://AsifAliMD.com" size={80} />
          <p className="text-xs mt-1">Scan to visit website</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 pt-4 border-t dark:border-slate-700 text-center">
        <p className="text-sm dark:text-gray-300">
          <strong>Connect with Dr. Ali:</strong>{" "}
          <a href="mailto:asifalitex@gmail.com" className="hover:underline">
            asifalitex@gmail.com
          </a>{" "}
          |
          <a href="https://AsifAliMD.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
            {" "}
            AsifAliMD.com
          </a>
        </p>
        <p className="text-xs mt-2 italic dark:text-gray-400">Where evidence meets empathy.</p>
      </footer>

      {/* Print timestamp footer - only visible in print */}
      <div className="print-footer hidden print:block">
        Generated on {new Date().toLocaleDateString()} | For latest information, visit AsifAliMD.com
      </div>
    </div>
  )
}
