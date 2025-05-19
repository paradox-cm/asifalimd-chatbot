import Link from "next/link"
import { cn } from "@/lib/utils"
import ImageWithFallback from "@/components/image-with-fallback"

interface NavigationSectionProps {
  className?: string
}

export default function NavigationSection({ className }: NavigationSectionProps) {
  return (
    <div className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      <Link
        href="/clinical"
        className="flex flex-col items-center text-sm font-medium transition-colors hover:text-primary"
      >
        <div className="w-12 h-12 rounded-full overflow-hidden mb-1 border border-clinical-200 dark:border-clinical-800">
          <ImageWithFallback
            src="/images/clinical-neutral.png"
            alt="Clinical Practice"
            width={48}
            height={48}
            className="object-cover"
            fallbackSrc="/images/heart-logo.png"
          />
        </div>
        <span>Clinical</span>
      </Link>
      <Link
        href="/research"
        className="flex flex-col items-center text-sm font-medium transition-colors hover:text-primary"
      >
        <div className="w-12 h-12 rounded-full overflow-hidden mb-1 border border-clinical-200 dark:border-clinical-800">
          <ImageWithFallback
            src="/images/abstract-research.png"
            alt="Research"
            width={48}
            height={48}
            className="object-cover"
            fallbackSrc="/images/heart-logo.png"
          />
        </div>
        <span>Research</span>
      </Link>
      <Link
        href="/ventures"
        className="flex flex-col items-center text-sm font-medium transition-colors hover:text-primary"
      >
        <div className="w-12 h-12 rounded-full overflow-hidden mb-1 border border-clinical-200 dark:border-clinical-800">
          <ImageWithFallback
            src="/images/ventures-abstract-new.png"
            alt="Ventures"
            width={48}
            height={48}
            className="object-cover"
            fallbackSrc="/images/heart-logo.png"
          />
        </div>
        <span>Ventures</span>
      </Link>
      <Link
        href="/speaking"
        className="flex flex-col items-center text-sm font-medium transition-colors hover:text-primary"
      >
        <div className="w-12 h-12 rounded-full overflow-hidden mb-1 border border-clinical-200 dark:border-clinical-800">
          <ImageWithFallback
            src="/images/pots-doc-heart.png"
            alt="Speaking"
            width={48}
            height={48}
            className="object-cover"
            fallbackSrc="/images/heart-logo.png"
          />
        </div>
        <span>Speaking</span>
      </Link>
      <Link
        href="/about"
        className="flex flex-col items-center text-sm font-medium transition-colors hover:text-primary"
      >
        <div className="w-12 h-12 rounded-full overflow-hidden mb-1 border border-clinical-200 dark:border-clinical-800">
          <ImageWithFallback
            src="/images/dr-ali-new-headshot.png"
            alt="About"
            width={48}
            height={48}
            className="object-cover"
            fallbackSrc="/images/heart-logo.png"
          />
        </div>
        <span>About</span>
      </Link>
      <Link
        href="/contact"
        className="flex flex-col items-center text-sm font-medium transition-colors hover:text-primary"
      >
        <div className="w-12 h-12 rounded-full overflow-hidden mb-1 border border-clinical-200 dark:border-clinical-800">
          <ImageWithFallback
            src="/images/abstract-heart-blue.png"
            alt="Contact"
            width={48}
            height={48}
            className="object-cover"
            fallbackSrc="/images/heart-logo.png"
          />
        </div>
        <span>Contact</span>
      </Link>
    </div>
  )
}
