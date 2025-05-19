"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface CollapsibleSectionProps {
  title: string
  defaultOpen?: boolean
  className?: string
  titleClassName?: string
  contentClassName?: string
  children: React.ReactNode
  noBorder?: boolean
}

export default function CollapsibleSection({
  title,
  defaultOpen = false,
  className,
  titleClassName,
  contentClassName,
  children,
  noBorder = false,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={cn("w-full", noBorder ? "" : "border-t border-border", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between bg-background py-4 text-left",
          "hover:bg-gray-50 dark:hover:bg-gray-900/10 transition-colors duration-200",
          titleClassName,
        )}
        aria-expanded={isOpen}
      >
        <div
          className="container mx-auto px-2 md:px-4 flex justify-between items-center"
          style={{ maxWidth: "1160px" }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
          <div className="flex items-center justify-center rounded-full p-1 bg-clinical-100 dark:bg-clinical-900/30">
            {isOpen ? (
              <ChevronUp className="h-5 w-5 text-clinical-600 dark:text-clinical-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-clinical-600 dark:text-clinical-400" />
            )}
          </div>
        </div>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0",
        )}
        aria-hidden={!isOpen}
      >
        <div className="container mx-auto px-2 md:px-4" style={{ maxWidth: "1160px" }}>
          <div className={cn("py-6", contentClassName)}>{children}</div>
        </div>
      </div>
    </div>
  )
}
