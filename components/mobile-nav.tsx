"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import ImageWithFallback from "@/components/image-with-fallback"

interface MobileNavProps {
  className?: string
  onClose?: () => void
}

export default function MobileNav({ className, onClose }: MobileNavProps) {
  return (
    <div className={cn("flex flex-col space-y-6 p-6", className)}>
      <Link
        href="/clinical"
        className="flex items-center space-x-4 text-base font-medium transition-colors hover:text-primary"
        onClick={onClose}
      >
        <div className="w-10 h-10 rounded-full overflow-hidden border border-clinical-200 dark:border-clinical-800">
          <ImageWithFallback
            src="/images/clinical-neutral.png"
            alt="Clinical Practice"
            width={40}
            height={40}
            className="object-cover"
            fallbackSrc="/images/heart-logo.png"
          />
        </div>
        <span>Clinical Practice</span>
      </Link>
      <Link
        href="/research"
        className="flex items-center space-x-4 text-base font-medium transition-colors hover:text-primary"
        onClick={onClose}
      >
        <div className="w-10 h-10 rounded-full overflow-hidden border border-clinical-200 dark:border-clinical-800">
          <ImageWithFallback
            src="/images/abstract-research.png"
            alt="Research"
            width={40}
            height={40}
            className="object-cover"
            fallbackSrc="/images/heart-logo.png"
          />
        </div>
        <span>Research</span>
      </Link>
      <Link
        href="/ventures"
        className="flex items-center space-x-4 text-base font-medium transition-colors hover:text-primary"
        onClick={onClose}
      >
        <div className="w-10 h-10 rounded-full overflow-hidden border border-clinical-200 dark:border-clinical-800">
          <ImageWithFallback
            src="/images/ventures-abstract-new.png"
            alt="Ventures"
            width={40}
            height={40}
            className="object-cover"
            fallbackSrc="/images/heart-logo.png"
          />
        </div>
        <span>Ventures</span>
      </Link>
      <Link
        href="/speaking"
        className="flex items-center space-x-4 text-base font-medium transition-colors hover:text-primary"
        onClick={onClose}
      >
        <div className="w-10 h-10 rounded-full overflow-hidden border border-clinical-200 dark:border-clinical-800">
          <ImageWithFallback
            src="/images/pots-doc-heart.png"
            alt="Speaking"
            width={40}
            height={40}
            className="object-cover"
            fallbackSrc="/images/heart-logo.png"
          />
        </div>
        <span>Speaking</span>
      </Link>
      <Link
        href="/about"
        className="flex items-center space-x-4 text-base font-medium transition-colors hover:text-primary"
        onClick={onClose}
      >
        <div className="w-10 h-10 rounded-full overflow-hidden border border-clinical-200 dark:border-clinical-800">
          <ImageWithFallback
            src="/images/dr-ali-new-headshot.png"
            alt="About"
            width={40}
            height={40}
            className="object-cover"
            fallbackSrc="/images/heart-logo.png"
          />
        </div>
        <span>About</span>
      </Link>
      <Link
        href="/contact"
        className="flex items-center space-x-4 text-base font-medium transition-colors hover:text-primary"
        onClick={onClose}
      >
        <div className="w-10 h-10 rounded-full overflow-hidden border border-clinical-200 dark:border-clinical-800">
          <ImageWithFallback
            src="/images/abstract-heart-blue.png"
            alt="Contact"
            width={40}
            height={40}
            className="object-cover"
            fallbackSrc="/images/heart-logo.png"
          />
        </div>
        <span>Contact</span>
      </Link>
    </div>
  )
}
