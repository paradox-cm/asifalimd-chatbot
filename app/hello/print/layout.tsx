import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dr. Asif Ali, MD | Printable One-Sheet",
  description: "Printable one-sheet for Dr. Asif Ali, MD - Cardiologist, Health-Tech Strategist, and Academic Leader.",
}

export default function PrintableOneSheetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
