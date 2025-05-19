"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import MobileMenu from "@/components/mobile-menu"
import ScrollToTop from "@/components/scroll-to-top"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Force a check of the system preference on client-side mount
    const checkSystemPreference = () => {
      const storedTheme = localStorage.getItem("dr-asif-theme")

      // Only proceed if user is using system preference (no stored theme)
      if (!storedTheme) {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        const currentTheme = prefersDark ? "dark" : "light"

        // Check if the current theme matches the system preference
        const hasCorrectTheme = document.documentElement.classList.contains(currentTheme)

        // If not, update it
        if (!hasCorrectTheme) {
          document.documentElement.classList.remove("light", "dark")
          document.documentElement.classList.add(currentTheme)

          console.log("Corrected theme to match system preference:", currentTheme)
        }
      }
    }

    // Run on mount
    checkSystemPreference()

    // Also set up a listener for system changes
    const colorSchemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleSystemChange = (e: MediaQueryListEvent) => {
      checkSystemPreference()
    }

    if (colorSchemeMediaQuery.addEventListener) {
      colorSchemeMediaQuery.addEventListener("change", handleSystemChange)
    } else if (colorSchemeMediaQuery.addListener) {
      colorSchemeMediaQuery.addListener(handleSystemChange as any)
    }

    return () => {
      if (colorSchemeMediaQuery.removeEventListener) {
        colorSchemeMediaQuery.removeEventListener("change", handleSystemChange)
      } else if (colorSchemeMediaQuery.removeListener) {
        colorSchemeMediaQuery.removeListener(handleSystemChange as any)
      }
    }
  }, [])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  // Only show footer on non-home pages
  const showFooter = pathname !== "/"

  return (
    <>
      <Header onMobileMenuToggle={setMobileMenuOpen} mobileMenuOpen={mobileMenuOpen} />
      {/* Profile picture and info bar */}
      <div className="sticky top-[64px] z-10 flex justify-between items-start px-4 py-3 border-b border-border bg-background">
        <div className="flex items-center">
          <Link href="/about" className="block">
            <div
              className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-clinical-500 hover:border-clinical-600 transition-all duration-300 hover:scale-105 mr-3"
              aria-label="Dr. Asif Ali's profile - Click to view About page"
            >
              <Image
                src="/images/dr-ali-portrait.png"
                alt="Dr. Asif Ali"
                fill
                className="object-cover"
                sizes="48px"
                priority
              />
            </div>
          </Link>
          <div>
            <h2 className="text-sm font-medium">Asif Ali, MD</h2>
            <p className="text-xs text-foreground/70">Cardiologist | Researcher | Med-Tech Strategist</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href="/clinical">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-7 px-2 border-foreground/20"
              aria-label="View Clinical page"
            >
              Clinical
            </Button>
          </Link>
          <Link href="/research">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-7 px-2 border-foreground/20"
              aria-label="View Research page"
            >
              Research
            </Button>
          </Link>
          <Link href="/ventures">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-7 px-2 border-foreground/20"
              aria-label="View Ventures page"
            >
              Ventures
            </Button>
          </Link>
        </div>
      </div>
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
      <ScrollToTop />
    </>
  )
}
