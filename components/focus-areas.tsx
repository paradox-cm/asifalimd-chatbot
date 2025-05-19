import Link from "next/link"
import { Stethoscope, FlaskRoundIcon as Flask, Rocket } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function FocusAreas() {
  return (
    <section className="w-full py-12 md:py-16 px-2 md:px-4 bg-background" aria-label="Focus Areas">
      <div className="container mx-auto px-2 md:px-4" style={{ maxWidth: "1160px" }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {/* Clinical */}
          <Card className="hover:border-clinical-400 hover:shadow-md transition-all duration-300">
            <CardContent className="p-5 md:p-6">
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <div className="bg-clinical-100 dark:bg-clinical-900/30 p-2 rounded-md">
                  <Stethoscope className="h-6 w-6 md:h-7 md:w-7 text-clinical-600 dark:text-clinical-400 flex-shrink-0" />
                </div>
                <h3 className="text-lg md:text-xl font-medium text-foreground">Clinical</h3>
              </div>
              <p className="text-sm md:text-base text-foreground/70 mb-4 md:mb-6">
                Precision cardiovascular care with a focus on dysautonomia, diagnostics, and long-term prevention.
              </p>
              <Link
                href="/clinical"
                className="text-clinical-600 hover:text-clinical-800 dark:text-clinical-400 dark:hover:text-clinical-300 font-medium transition-colors duration-300 inline-flex items-center text-sm md:text-base"
              >
                Explore Clinical Work <span className="ml-1">→</span>
              </Link>
            </CardContent>
          </Card>

          {/* Research */}
          <Card className="hover:border-clinical-400 hover:shadow-md transition-all duration-300">
            <CardContent className="p-5 md:p-6">
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <div className="bg-clinical-100 dark:bg-clinical-900/30 p-2 rounded-md">
                  <Flask className="h-6 w-6 md:h-7 md:w-7 text-clinical-600 dark:text-clinical-400 flex-shrink-0" />
                </div>
                <h3 className="text-lg md:text-xl font-medium text-foreground">Research</h3>
              </div>
              <p className="text-sm md:text-base text-foreground/70 mb-4 md:mb-6">
                Founder of Cena Research, leading inclusive trials and post-COVID autonomic studies.
              </p>
              <Link
                href="/research"
                className="text-clinical-600 hover:text-clinical-800 dark:text-clinical-400 dark:hover:text-clinical-300 font-medium transition-colors duration-300 inline-flex items-center text-sm md:text-base"
              >
                View Research <span className="ml-1">→</span>
              </Link>
            </CardContent>
          </Card>

          {/* Ventures */}
          <Card className="hover:border-clinical-400 hover:shadow-md transition-all duration-300">
            <CardContent className="p-5 md:p-6">
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <div className="bg-clinical-100 dark:bg-clinical-900/30 p-2 rounded-md">
                  <Rocket className="h-6 w-6 md:h-7 md:w-7 text-clinical-600 dark:text-clinical-400 flex-shrink-0" />
                </div>
                <h3 className="text-lg md:text-xl font-medium text-foreground">Ventures</h3>
              </div>
              <p className="text-sm md:text-base text-foreground/70 mb-4 md:mb-6">
                Strategic advisor to 15+ startups. Expertise in clinical validation, AI, and go-to-market.
              </p>
              <Link
                href="/ventures"
                className="text-clinical-600 hover:text-clinical-800 dark:text-clinical-400 dark:hover:text-clinical-300 font-medium transition-colors duration-300 inline-flex items-center text-sm md:text-base"
              >
                See Med-Tech Ventures <span className="ml-1">→</span>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
