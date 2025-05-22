"use client"

import type React from "react"
import { useEffect } from "react"

export default function SignaturesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Force light mode for the entire page including header and footer
  useEffect(() => {
    // Function to apply light mode
    const applyLightMode = () => {
      // Force light mode on document
      document.documentElement.classList.remove("dark")
      document.documentElement.classList.add("light")

      // Force light mode on body
      document.body.classList.remove("dark")
      document.body.classList.add("light", "bg-white", "text-black")

      // Override any dark mode styles
      const style = document.createElement("style")
      style.id = "force-light-mode"
      style.innerHTML = `
        .dark { color-scheme: light !important; }
        .dark * { color-scheme: light !important; }
        [data-theme="dark"] { color-scheme: light !important; }
        [data-theme="dark"] * { color-scheme: light !important; }
        
        /* Force light mode colors on key elements */
        body, header, footer, main, nav, .nav-link, .logo, .mobile-menu {
          background-color: white !important;
          color: black !important;
        }
        
        /* Force light borders */
        .border-gray-800, .dark .border-gray-800, .border-gray-700, .dark .border-gray-700 {
          border-color: #e5e7eb !important;
        }
        
        /* Force light backgrounds */
        .bg-gray-900, .dark .bg-gray-900, .bg-gray-800, .dark .bg-gray-800 {
          background-color: white !important;
        }
        
        /* Force light text */
        .text-white, .dark .text-white, .text-gray-200, .dark .text-gray-200 {
          color: #111827 !important;
        }
      `
      document.head.appendChild(style)
    }

    // Store the original theme
    const originalTheme = document.documentElement.classList.contains("dark") ? "dark" : "light"
    const originalThemePreference = localStorage.getItem("theme")

    // Apply light mode immediately
    applyLightMode()

    // Set theme in localStorage
    localStorage.setItem("theme", "light")

    // Apply light mode again after a short delay to override any theme changes
    const timeoutId = setTimeout(applyLightMode, 50)

    // Restore original theme when component unmounts
    return () => {
      clearTimeout(timeoutId)

      // Remove the style element
      const styleElement = document.getElementById("force-light-mode")
      if (styleElement) {
        styleElement.remove()
      }

      // Restore document classes
      document.documentElement.classList.remove("light")
      document.body.classList.remove("light", "bg-white", "text-black")

      if (originalTheme === "dark") {
        document.documentElement.classList.add("dark")
        document.body.classList.add("dark")
      }

      // Restore localStorage
      if (originalThemePreference) {
        localStorage.setItem("theme", originalThemePreference)
      } else {
        localStorage.removeItem("theme")
      }
    }
  }, [])

  return <div className="bg-white text-black">{children}</div>
}
