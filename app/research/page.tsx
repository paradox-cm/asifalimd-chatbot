import { Brain, Activity, Watch, Heart, Users, Dumbbell, Globe, Microscope } from "lucide-react"
import FadeInSection from "@/components/fade-in-section"
import CollapsiblePublications from "@/components/collapsible-publications"
import CollapsibleSection from "@/components/collapsible-section"

export default function ResearchPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        className="w-full py-10 sm:py-12 md:py-16 lg:py-20 px-2 sm:px-3 md:px-4 bg-background"
        aria-label="Research Introduction"
      >
        <div className="container mx-auto px-2 sm:px-3 md:px-4" style={{ maxWidth: "1160px" }}>
          <FadeInSection>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-foreground">
              Research & Publications
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-6">
              Building an inclusive research future—one trial, one patient, one insight at a time.
            </p>
            <p className="text-lg md:text-xl text-foreground/70 mb-8 border-l-4 border-clinical-500 pl-4 py-2">
              Dr. Ali serves as a speaker, advisor, and principal investigator for pharmaceutical innovation with a
              focus on cardiovascular therapies, trial inclusivity, and real-world study translation.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Research Areas of Focus */}
      <CollapsibleSection title="Research Areas of Focus" defaultOpen={true}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card h-full">
            <div className="flex items-center justify-start gap-4">
              <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full shrink-0">
                <Brain className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Autonomic Dysfunction</h3>
            </div>
          </div>

          <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card h-full">
            <div className="flex items-center justify-start gap-4">
              <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full shrink-0">
                <Activity className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Post-COVID Syndromes</h3>
            </div>
          </div>

          <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card h-full">
            <div className="flex items-center justify-start gap-4">
              <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full shrink-0">
                <Microscope className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Digital Health & AI in Diagnostics</h3>
            </div>
          </div>

          <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card h-full">
            <div className="flex items-center justify-start gap-4">
              <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full shrink-0">
                <Heart className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Cardiovascular Imaging</h3>
            </div>
          </div>

          <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card h-full">
            <div className="flex items-center justify-start gap-4">
              <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full shrink-0">
                <Users className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Inclusive Clinical Trial Design</h3>
            </div>
          </div>

          <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card h-full">
            <div className="flex items-center justify-start gap-4">
              <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full shrink-0">
                <Watch className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Wearable Validation & Remote Monitoring</h3>
            </div>
          </div>

          <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card h-full">
            <div className="flex items-center justify-start gap-4">
              <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full shrink-0">
                <Dumbbell className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Exercise & Lifestyle Medicine</h3>
            </div>
          </div>

          <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card h-full">
            <div className="flex items-center justify-start gap-4">
              <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full shrink-0">
                <Globe className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Public Health and Health Equity</h3>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Quote / Ethos Callout */}
      <section
        className="w-full py-10 sm:py-12 md:py-16 lg:py-20 px-2 sm:px-3 md:px-4 bg-background border-t border-b border-border"
        aria-label="Research Philosophy"
      >
        <div className="container mx-auto px-2 sm:px-3 md:px-4" style={{ maxWidth: "1160px" }}>
          <blockquote className="border-l-4 border-clinical-500 pl-6 py-4 italic text-xl md:text-2xl text-foreground/80">
            "The goal isn't data for data's sake. It's evidence that leads to equity, action, and better care."
          </blockquote>
        </div>
      </section>

      {/* Cena Research Institute Section */}
      <section
        className="w-full py-10 sm:py-12 md:py-16 lg:py-20 px-2 sm:px-3 md:px-4 bg-background"
        aria-label="Cena Research Institute"
      >
        <div className="container mx-auto px-2 sm:px-3 md:px-4" style={{ maxWidth: "1160px" }}>
          <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground border-b border-clinical-200 dark:border-clinical-800 pb-3">
              Cena Research Institute (CRI)
            </h2>
            <p className="text-lg text-clinical-600 dark:text-clinical-400 italic mb-6">
              Inclusive clinical research. Evidence that reflects everyone.
            </p>

            <div className="space-y-6 text-foreground/80">
              <p className="text-lg">
                Cena Research Institute (CRI) is Dr. Ali's clinical research arm, dedicated to advancing medical science
                through inclusive, real-world research.
              </p>

              <p className="text-lg">
                Founded in 2014, CRI brings together a multidisciplinary team of physicians, scientists, and students
                committed to ensuring that underrepresented groups—women, elderly patients, minorities, and rare disease
                populations—are fully reflected in clinical trials.
              </p>

              <p className="text-lg">
                Through collaborations across pharmaceutical, medical technology, and academic sectors, CRI leads
                projects spanning:
              </p>

              <ul className="list-disc pl-6 space-y-2 text-lg">
                <li>Cardiovascular and autonomic research</li>
                <li>Novel device validation</li>
                <li>Health equity studies</li>
                <li>Digital health interventions</li>
                <li>Space medicine and countermeasures research (e.g., NASA EECP studies)</li>
              </ul>

              <p className="text-lg">
                Grounded in Houston and committed to multilingual support, CRI is redefining what it means for research
                to be truly representative—and truly actionable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Highlight Section */}
      <CollapsibleSection title="Selected Publications & Contributions">
        <div className="mb-6">
          <p className="text-lg text-foreground/80">
            A curated selection of Dr. Ali's scholarly work, sorted in reverse chronological order.
          </p>
        </div>
        <div className="publications-wrapper">
          <CollapsiblePublications hideTitle={true} />
        </div>
      </CollapsibleSection>
    </div>
  )
}
