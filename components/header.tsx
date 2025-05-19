"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback } from "react"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

interface HeaderProps {
  onMobileMenuToggle: (isOpen: boolean) => void
  mobileMenuOpen: boolean
}

export default function Header({ onMobileMenuToggle, mobileMenuOpen }: HeaderProps) {
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

  return (
    <header className="sticky top-0 z-[200] w-full border-b border-border bg-white dark:bg-background">
      <div
        className="container mx-auto flex h-16 items-center justify-between px-2 md:px-4"
        style={{ maxWidth: "1160px" }}
      >
        <Link
          href="/"
          className="text-lg md:text-xl font-medium text-foreground hover:text-clinical-600 dark:hover:text-clinical-400 transition-colors duration-300"
          aria-label="Asif Ali, MD - Home"
        >
          <span>Asif Ali, MD</span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => onMobileMenuToggle(!mobileMenuOpen)}
            className="p-2 text-foreground/80 hover:text-clinical-600 dark:hover:text-clinical-400 transition-colors duration-300 rounded-md"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  )
}
