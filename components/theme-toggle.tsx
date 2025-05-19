"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [isSystemPreference, setIsSystemPreference] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Initialize on mount and handle system changes
  useEffect(() => {
    setMounted(true)

    // Function to update component state based on current DOM state
    const syncWithDocumentTheme = () => {
      const isDarkMode = document.documentElement.classList.contains("dark")
      setTheme(isDarkMode ? "dark" : "light")

      // Check if we're using system preference
      const storedTheme = localStorage.getItem("dr-asif-theme")
      setIsSystemPreference(!storedTheme)
    }

    // Initial sync
    syncWithDocumentTheme()

    // Listen for theme changes from any source
    const handleThemeChange = (e: CustomEvent) => {
      console.log("Theme change event received:", e.detail)
      setTheme(e.detail.theme)

      // If the change came from system and we're following system preference
      if (e.detail.source === "system" && !localStorage.getItem("dr-asif-theme")) {
        setIsSystemPreference(true)
      }
    }

    window.addEventListener("theme-change", handleThemeChange as EventListener)

    // Listen for system preference changes
    const colorSchemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      console.log("System preference media query change:", e.matches ? "dark" : "light")
      // Only update if we're following system preference
      if (!localStorage.getItem("dr-asif-theme")) {
        setTheme(e.matches ? "dark" : "light")
        setIsSystemPreference(true)
      }
    }

    if (colorSchemeMediaQuery.addEventListener) {
      colorSchemeMediaQuery.addEventListener("change", handleSystemThemeChange)
    } else if (colorSchemeMediaQuery.addListener) {
      colorSchemeMediaQuery.addListener(handleSystemThemeChange)
    }

    // Set up a MutationObserver to watch for class changes on the html element
    // This ensures our component stays in sync with any external theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          syncWithDocumentTheme()
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true })

    return () => {
      window.removeEventListener("theme-change", handleThemeChange as EventListener)

      if (colorSchemeMediaQuery.removeEventListener) {
        colorSchemeMediaQuery.removeEventListener("change", handleSystemThemeChange)
      } else if (colorSchemeMediaQuery.removeListener) {
        colorSchemeMediaQuery.removeListener(handleSystemThemeChange)
      }

      observer.disconnect()
    }
  }, [])

  // Handle toggle
  const toggleTheme = () => {
    if (isSystemPreference) {
      // If currently using system preference, switch to manual mode with opposite of current theme
      const newTheme = theme === "dark" ? "light" : "dark"
      setTheme(newTheme)
      setIsSystemPreference(false)

      // Use the global function from theme-script.tsx
      if (window.setManualTheme) {
        window.setManualTheme(newTheme)
      } else {
        // Fallback if global function isn't available
        localStorage.setItem("dr-asif-theme", newTheme)
        document.documentElement.classList.remove("light", "dark")
        document.documentElement.classList.add(newTheme)
      }
    } else {
      // If using manual preference, reset to system preference
      setIsSystemPreference(true)

      // Use the global function from theme-script.tsx
      if (window.resetToSystemTheme) {
        const systemTheme = window.resetToSystemTheme()
        setTheme(systemTheme as "light" | "dark")
      } else {
        // Fallback if global function isn't available
        localStorage.removeItem("dr-asif-theme")
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        const systemTheme = prefersDark ? "dark" : "light"
        setTheme(systemTheme)
        document.documentElement.classList.remove("light", "dark")
        document.documentElement.classList.add(systemTheme)
      }
    }
  }

  if (!mounted) {
    // Return a placeholder with the same dimensions to prevent layout shift
    return <Button variant="ghost" size="icon" className="rounded-full w-10 h-10" aria-hidden="true" tabIndex={-1} />
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full text-foreground/80 hover:text-clinical-600 dark:hover:text-clinical-400"
      aria-label={
        isSystemPreference
          ? "Currently using system theme preference. Click to toggle between light and dark modes."
          : theme === "dark"
            ? "Switch to light mode"
            : "Switch to dark mode"
      }
      title={isSystemPreference ? "Using system preference" : theme === "dark" ? "Dark mode" : "Light mode"}
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      {isSystemPreference && <span className="sr-only">(System)</span>}
    </Button>
  )
}
