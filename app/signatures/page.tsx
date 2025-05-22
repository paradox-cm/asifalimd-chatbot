"use client"

import React from "react"
import { Check, Copy, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect } from "react"

export default function SignaturesPage() {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null)
  const [expandedCodeIndex, setExpandedCodeIndex] = React.useState<number | null>(null)

  // Additional light mode enforcement for this specific page
  useEffect(() => {
    // Force light mode on all parent elements
    const forceLightMode = () => {
      const parentElements = document.querySelectorAll("header, footer, nav, main, .mobile-menu")
      parentElements.forEach((el) => {
        el.classList.remove("dark")
        el.classList.add("light", "bg-white")

        // Force light mode on all child elements
        const darkElements = el.querySelectorAll('[class*="dark:"]')
        darkElements.forEach((darkEl) => {
          // Extract and apply light mode classes
          const classes = darkEl.className.split(" ")
          classes.forEach((cls) => {
            if (cls.startsWith("dark:")) {
              const lightClass = cls.replace("dark:", "")
              darkEl.classList.add(lightClass)
            }
          })
        })
      })
    }

    // Apply immediately and after a short delay
    forceLightMode()
    const timeoutId = setTimeout(forceLightMode, 100)

    return () => clearTimeout(timeoutId)
  }, [])

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const toggleCodeExpand = (index: number) => {
    setExpandedCodeIndex(expandedCodeIndex === index ? null : index)
  }

  const signatures = [
    {
      title: "Personal Signature — Asif Ali, M.D.",
      color: "#1A1A1A",
      html: `<table cellpadding="0" cellspacing="0" style="font-family: Segoe UI, Arial, sans-serif; font-size: 13px; color: #1A1A1A; line-height: 1.5;">
  <tr>
    <td style="padding-right: 15px; vertical-align: top;">
      <div style="background-color: #E1F5FE; border-radius: 8px; padding: 10px; margin-bottom: 12px; display: inline-block;">
        <strong style="font-size: 15px; color: #0277BD;">Asif Ali, M.D.</strong><br>
        <span style="color: #0288D1;">Cardiologist | Researcher | Med-Tech Strategist</span>
      </div><br>
      <span>📧 <a href="mailto:asif@asifalimd.com" style="color: #1A1A1A; text-decoration: none;">asif@asifalimd.com</a> | ☎ (713) 464-4140</span><br>
      <span>🏥 8830 Long Point Rd, Suite 507, Houston, TX 77055</span><br>
      <span>🌐 <a href="https://www.asifalimd.com" style="color: #1A1A1A; text-decoration: none;">www.asifalimd.com</a></span>
    </td>
  </tr>
</table>`,
    },
    {
      title: "Clinical Signature — Houston Heart Consultants",
      color: "#CC0000",
      html: `<table cellpadding="0" cellspacing="0" style="font-family: Segoe UI, Arial, sans-serif; font-size: 13px; color: #1A1A1A; line-height: 1.5;">
  <tr>
    <td style="vertical-align: top;">
      <strong style="font-size: 15px; color: #1A1A1A;">Asif Ali, M.D.</strong><br>
      <span style="color: #4B4B4B;">Partner, Houston Heart Consultants</span><br>
      <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HCCHeart-Logo-ulMK5SDY9ElhMja2JiuoxxENRRW3kv.png" alt="Houston Heart Consultants Logo" width="168" height="58" style="display: block; margin: 8px 0;">
      <hr style="border: none; height: 1px; background-color: #E0E0E0; margin: 8px 0;">
      <span>📧 <a href="mailto:drasif@hccheart.com" style="color: #CC0000; text-decoration: none;">drasif@hccheart.com</a> | ☎ 713-464-4140</span><br>
      <span>🏥 8830 Long Point Rd, Suite 507, Houston, TX 77055</span><br>
      <span>🌐 <a href="https://www.hccheart.com" style="color: #CC0000; text-decoration: none;">www.hccheart.com</a></span>
    </td>
  </tr>
</table>`,
    },
    {
      title: "Innovation Signature — CENA Ventures",
      color: "#004B87",
      html: `<table cellpadding="0" cellspacing="0" style="font-family: Segoe UI, Arial, sans-serif; font-size: 13px; color: #1A1A1A; line-height: 1.5;">
  <tr>
    <td style="vertical-align: top;">
      <strong style="font-size: 15px; color: #1A1A1A;">Asif Ali, M.D.</strong><br>
      <span style="color: #4B4B4B;">Managing Director, CENA Ventures</span><br>
      <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CENA-Logo%402x-epiwYjyDIJDtxhjHej5DbHuMVqcqpl.png" alt="CENA Ventures Logo" width="168" height="58" style="display: block; margin: 8px 0;">
      <hr style="border: none; height: 1px; background-color: #E0E0E0; margin: 8px 0;">
      <span>📧 <a href="mailto:asif@cenaconsultants.com" style="color: #004B87; text-decoration: none;">asif@cenaconsultants.com</a></span><br>
      <span>🏢 Headquarters: 8830 Long Point Rd, Suite 507, Houston, TX 77055</span><br>
      <span>🌐 <a href="https://www.cena.ventures" style="color: #004B87; text-decoration: none;">www.cena.ventures</a></span>
    </td>
  </tr>
</table>`,
    },
    {
      title: "Research Signature — Cena Research Institute (CRI)",
      color: "#008080",
      html: `<table cellpadding="0" cellspacing="0" style="font-family: Segoe UI, Arial, sans-serif; font-size: 13px; color: #1A1A1A; line-height: 1.5;">
  <tr>
    <td style="vertical-align: top;">
      <strong style="font-size: 15px; color: #1A1A1A;">Asif Ali, M.D.</strong><br>
      <span style="color: #4B4B4B;">Founder & Director, Cena Research Institute</span><br>
      <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CRI%402x-SAKZ6Ak98wBOlZUw2S04IXyKmeYIq3.png" alt="Cena Research Institute Logo" width="140" height="48" style="display: block; margin: 8px 0;">
      <hr style="border: none; height: 1px; background-color: #E0E0E0; margin: 8px 0;">
      <span>📧 <a href="mailto:asif@cenaresearch.com" style="color: #008080; text-decoration: none;">asif@cenaresearch.com</a></span><br>
      <span>🏢 Headquarters: 8830 Long Point Rd, Suite 507, Houston, TX 77055</span><br>
      <span>🌐 <a href="https://www.cenaresearch.com" style="color: #008080; text-decoration: none;">www.cenaresearch.com</a></span>
    </td>
  </tr>
</table>`,
    },
  ]

  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl bg-white">
      <h1 className="text-3xl font-bold mb-2 text-gray-900">Email Signature System for Dr. Asif Ali, M.D.</h1>
      <p className="text-lg text-gray-600 mb-8">
        A unified system of professional signatures for personal, clinical, innovation, and research correspondence.
      </p>

      <div className="space-y-12">
        {signatures.map((signature, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold mb-4" style={{ color: signature.color }}>
                {signature.title}
              </h2>

              {/* Signature Preview */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-100">
                <div dangerouslySetInnerHTML={{ __html: signature.html }} />
              </div>

              {/* HTML Code Toggle Button - Fixed for light mode */}
              <button
                className="w-full mb-4 flex items-center justify-between bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md border border-gray-300 transition-colors"
                onClick={() => toggleCodeExpand(index)}
              >
                <span className="font-medium">View HTML Code</span>
                {expandedCodeIndex === index ? (
                  <ChevronUp className="h-4 w-4 ml-2" />
                ) : (
                  <ChevronDown className="h-4 w-4 ml-2" />
                )}
              </button>

              {/* HTML Code (Collapsible) */}
              <div
                className={cn(
                  "relative overflow-hidden transition-all duration-300 ease-in-out",
                  expandedCodeIndex === index ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0",
                )}
              >
                <div className="relative bg-gray-100 rounded-xl p-4 overflow-x-auto">
                  <div className="pr-40">
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap">{signature.html}</pre>
                  </div>

                  <div className="absolute top-3 right-3">
                    {/* Copy HTML Button - Fixed for light mode */}
                    <button
                      className={`flex items-center text-sm font-medium px-3 py-1.5 rounded-md border transition-colors ${
                        copiedIndex === index
                          ? "bg-green-100 text-green-700 border-green-300 hover:bg-green-200"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                      onClick={() => copyToClipboard(signature.html, index)}
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy HTML
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
