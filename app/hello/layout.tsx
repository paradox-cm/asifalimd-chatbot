import type React from "react"
import type { Metadata } from "next"
import "./print.css"

export const metadata: Metadata = {
  title: "Dr. Asif Ali, MD | Investor One-Sheet",
  description:
    "Cardiologist, Health-Tech Strategist, and Academic Leader bridging medicine, innovation, and equity through digital health.",
}

export default function InvestorOneSheetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
