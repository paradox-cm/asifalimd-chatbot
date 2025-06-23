"use client"

import { useEffect, useCallback } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()

  // Function to check if a path is active (exact match or subpath)
  const isActive = useCallback(
    (path: string) => {
      if (path === "/") {
        return pathname === "/"
      }
      return pathname === path || pathname.startsWith(`${path}/`)
    },
    [pathname],
  )

  // Close menu when pressing escape key
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (isOpen && e.key === "Escape") {
        onClose()
      }
    }

    // Close menu when route changes
    const handleRouteChange = () => {
      onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
      window.addEventListener("popstate", handleRouteChange)

      // Prevent body scrolling when menu is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
      window.removeEventListener("popstate", handleRouteChange)

      // Restore body scrolling
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Overlay backdrop - very light to show content behind */}
      <div className="fixed inset-0 bg-black/5 z-[150]" onClick={onClose} aria-hidden="true" />

      {/* Mobile menu panel with brighter white frosted glass effect and stronger blur */}
      <div
        className="fixed inset-x-0 top-16 bottom-0 z-[160] bg-white/60 dark:bg-gray-900/50 overflow-y-auto"
        style={{
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="container mx-auto px-4" style={{ maxWidth: "1160px" }}>
          <div className="p-4">
            <nav className="flex flex-col space-y-4 py-4">
              <Link
                href="/clinical"
                className={cn(
                  "py-3 text-lg transition-colors duration-300 relative font-medium",
                  isActive("/clinical")
                    ? "text-clinical-600 dark:text-clinical-400"
                    : "text-gray-800 dark:text-gray-100 hover:text-clinical-600 dark:hover:text-clinical-400",
                )}
                onClick={onClose}
                aria-current={isActive("/clinical") ? "page" : undefined}
              >
                Clinical
                {isActive("/clinical") && (
                  <span
                    className="absolute -bottom-1 left-0 w-16 h-0.5 bg-clinical-500 dark:bg-clinical-400"
                    aria-hidden="true"
                  />
                )}
              </Link>
              <Link
                href="/research"
                className={cn(
                  "py-3 text-lg transition-colors duration-300 relative font-medium",
                  isActive("/research")
                    ? "text-clinical-600 dark:text-clinical-400"
                    : "text-gray-800 dark:text-gray-100 hover:text-clinical-600 dark:hover:text-clinical-400",
                )}
                onClick={onClose}
                aria-current={isActive("/research") ? "page" : undefined}
              >
                Research
                {isActive("/research") && (
                  <span
                    className="absolute -bottom-1 left-0 w-16 h-0.5 bg-clinical-500 dark:bg-clinical-400"
                    aria-hidden="true"
                  />
                )}
              </Link>
              <Link
                href="/ventures"
                className={cn(
                  "py-3 text-lg transition-colors duration-300 relative font-medium",
                  isActive("/ventures")
                    ? "text-clinical-600 dark:text-clinical-400"
                    : "text-gray-800 dark:text-gray-100 hover:text-clinical-600 dark:hover:text-clinical-400",
                )}
                onClick={onClose}
                aria-current={isActive("/ventures") ? "page" : undefined}
              >
                Ventures
                {isActive("/ventures") && (
                  <span
                    className="absolute -bottom-1 left-0 w-16 h-0.5 bg-clinical-500 dark:bg-clinical-400"
                    aria-hidden="true"
                  />
                )}
              </Link>
              <Link
                href="/media"
                className={cn(
                  "py-3 text-lg transition-colors duration-300 relative font-medium",
                  isActive("/media")
                    ? "text-clinical-600 dark:text-clinical-400"
                    : "text-gray-800 dark:text-gray-100 hover:text-clinical-600 dark:hover:text-clinical-400",
                )}
                onClick={onClose}
                aria-current={isActive("/media") ? "page" : undefined}
              >
                Media
                {isActive("/media") && (
                  <span
                    className="absolute -bottom-1 left-0 w-16 h-0.5 bg-clinical-500 dark:bg-clinical-400"
                    aria-hidden="true"
                  />
                )}
              </Link>
              <Link
                href="/about"
                className={cn(
                  "py-3 text-lg transition-colors duration-300 relative font-medium",
                  isActive("/about")
                    ? "text-clinical-600 dark:text-clinical-400"
                    : "text-gray-800 dark:text-gray-100 hover:text-clinical-600 dark:hover:text-clinical-400",
                )}
                onClick={onClose}
                aria-current={isActive("/about") ? "page" : undefined}
              >
                About
                {isActive("/about") && (
                  <span
                    className="absolute -bottom-1 left-0 w-16 h-0.5 bg-clinical-500 dark:bg-clinical-400"
                    aria-hidden="true"
                  />
                )}
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "py-3 text-lg transition-colors duration-300 relative font-medium",
                  isActive("/contact")
                    ? "text-clinical-600 dark:text-clinical-400"
                    : "text-gray-800 dark:text-gray-100 hover:text-clinical-600 dark:hover:text-clinical-400",
                )}
                onClick={onClose}
                aria-current={isActive("/contact") ? "page" : undefined}
              >
                Contact
                {isActive("/contact") && (
                  <span
                    className="absolute -bottom-1 left-0 w-16 h-0.5 bg-clinical-500 dark:bg-clinical-400"
                    aria-hidden="true"
                  />
                )}
              </Link>
            </nav>
            <button
              onClick={onClose}
              className="mt-6 w-full py-3 border border-gray-200 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:text-clinical-600 dark:hover:text-clinical-400 transition-colors duration-300 flex items-center justify-center font-medium"
            >
              Close Menu
            </button>
            <Link
              href="/media-kit"
              className="mt-2 w-full py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-clinical-600 dark:hover:text-clinical-400 transition-colors duration-300 flex items-center justify-center"
              onClick={onClose}
            >
              Media Kit
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
