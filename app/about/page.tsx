import { Building, GraduationCap, FlaskRound, Rocket, Heart } from "lucide-react"
import FadeInSection from "@/components/fade-in-section"
import { testimonials } from "@/data/testimonials"
import MissionValueCard from "@/components/mission-value-card"
import CollapsibleSection from "@/components/collapsible-section"
import ImageWithFallback from "@/components/image-with-fallback"

export default function AboutPage() {
  // Filter for colleague testimonials (those with roles, which indicates they're colleagues not patients)
  const colleagueTestimonials = testimonials.filter((t) => t.role && !t.featured).slice(0, 3)

  return (
    <div className="flex flex-col">
      {/* STEP 1: Intro + Doctorpreneur Identity */}
      <section className="w-full py-6 px-2 sm:px-3 md:px-4 bg-background" aria-label="About Dr. Ali">
        <div className="container mx-auto px-2 sm:px-3 md:px-4" style={{ maxWidth: "1160px" }}>
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            <div className="w-full md:w-1/3">
              <ImageWithFallback
                src="/images/dr-ali-portrait.png"
                alt="Dr. Asif Ali"
                width={400}
                height={400}
                className="rounded-lg object-cover"
                priority
                fallbackSrc="/images/dr-ali-new-headshot.png"
              />
            </div>
            <div className="w-full md:w-2/3">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-foreground">
                About Dr. Asif Ali
              </h1>
              <p className="text-xl md:text-2xl text-foreground/80 mb-6">
                Clinician. Researcher. Innovator. Doctorpreneur.
              </p>
              <div className="border-l border-clinical-500 pl-4 py-2 mb-8">
                <p className="text-lg md:text-xl text-foreground/70 mb-4">
                  Dr. Asif Ali is a cardiologist, clinical investigator, and physician-innovator who works across
                  tiers—from underserved patients to health systems, from academic research to AI startups.
                </p>
                <p className="text-lg md:text-xl text-foreground/70">
                  Based in Houston and operating within the Texas Medical Center ecosystem, he blends hands-on care with
                  clinical research and health-tech leadership.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio Section - NEW - Now Collapsible */}
      <CollapsibleSection title="Biography" defaultOpen={true}>
        <FadeInSection>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4 text-lg text-foreground/80">
              <p>
                Dr. Asif Ali, MD is a nationally recognized cardiologist, clinical investigator, and health-tech
                strategist based in Houston, Texas.
              </p>
              <p>
                A physician at the intersection of care, research, and innovation, Dr. Ali leads precision
                cardiovascular care at Houston Cardiology Consultants, drives inclusive clinical trials through Cena
                Research Institute, and advises breakthrough health technology ventures via Cena Ventures.
              </p>
              <p>
                In addition to his clinical and entrepreneurial leadership, Dr. Ali serves as a member of the American
                Heart Association's Health Tech Advisory Group, advancing the use of digital health technologies and
                remote patient monitoring to improve cardiovascular outcomes.
              </p>
              <p>
                His work centers on advancing diagnostics for autonomic and cardiovascular disorders, translating
                real-world patient insights into scalable health solutions, and championing health equity across medical
                systems.
              </p>
            </div>
          </div>
        </FadeInSection>
      </CollapsibleSection>

      {/* Personal Statement Section */}
      <section className="w-full py-6 px-2 sm:px-3 md:px-4 bg-background" aria-label="Personal Statement">
        <div className="container mx-auto px-2 sm:px-3 md:px-4" style={{ maxWidth: "1160px" }}>
          <FadeInSection>
            <div className="border-2 border-clinical-200 dark:border-clinical-800 rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 bg-white dark:bg-background/60 shadow-sm">
              <blockquote className="text-xl md:text-2xl italic text-foreground/80 mb-6">
                "I became a physician to listen. Over time, I realized that listening isn't just clinical—it's
                structural, systemic, and scientific. Whether it's a patient whose symptoms have been dismissed, a
                startup struggling to connect with real-world workflows, or a research protocol that doesn't reflect the
                people it aims to serve—I step in to translate. That's my work. That's my calling. To connect the
                evidence with the empathy, and ensure medicine moves forward with integrity."
              </blockquote>
              <p className="text-right text-foreground/70 font-medium">— Dr. Asif Ali</p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* STEP 2: Roles & Timeline Section - Now Collapsible */}
      <CollapsibleSection title="Professional Roles & Affiliations" defaultOpen={false}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FadeInSection delay={100}>
            <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full">
                  <Building className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-foreground">Houston Cardiology Consultants</h3>
                  <p className="text-clinical-600 dark:text-clinical-400 font-medium mb-1">
                    Partner & Practicing Cardiologist
                  </p>
                  <p className="text-sm text-foreground/60 mb-3">2011 – Present</p>
                  <p className="text-foreground/70">
                    Precision cardiovascular diagnostics, preventive medicine, and complex care for dysautonomia and
                    post-COVID syndromes.
                  </p>
                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={150}>
            <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full">
                  <FlaskRound className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-foreground">Cena Research Institute</h3>
                  <p className="text-clinical-600 dark:text-clinical-400 font-medium mb-1">
                    Founder & Medical Director
                  </p>
                  <p className="text-sm text-foreground/60 mb-3">2023 – Present</p>
                  <p className="text-foreground/70">
                    Leading community-embedded trials and inclusive research in digital health, autonomic care, and
                    cardiovascular disease.
                  </p>
                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={200}>
            <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full">
                  <Rocket className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-foreground">Cena Ventures</h3>
                  <p className="text-clinical-600 dark:text-clinical-400 font-medium mb-1">
                    Chief Consultant & Advisor
                  </p>
                  <p className="text-sm text-foreground/60 mb-3">2005 – Present</p>
                  <p className="text-foreground/70">
                    Strategic advisory for more than 15 med-tech companies—clinical trial design, regulatory pathways,
                    go-to-market.
                  </p>
                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={250}>
            <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full">
                  <GraduationCap className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-foreground">
                    McGovern Medical School / University of Houston
                  </h3>
                  <p className="text-clinical-600 dark:text-clinical-400 font-medium mb-1">
                    Clinical Assistant Professor
                  </p>
                  <p className="text-sm text-foreground/60 mb-3">2010–2021, 2024–Present</p>
                  <p className="text-foreground/70">
                    Educator and mentor for medical students and residents in cardiovascular medicine.
                  </p>
                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={300}>
            <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300 md:col-span-2">
              <div className="flex items-start gap-4">
                <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full">
                  <Heart className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-foreground">American Heart Association</h3>
                  <p className="text-clinical-600 dark:text-clinical-400 font-medium mb-1">
                    Member, Health Tech Advisory Group
                  </p>
                  <p className="text-sm text-foreground/60 mb-3">2023 – Present</p>
                  <p className="text-foreground/70">
                    Focus on AI, remote patient monitoring, and cardiac rehab innovation.
                  </p>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </CollapsibleSection>

      {/* STEP 3: Mission & Values - Now Collapsible */}
      <CollapsibleSection title="Mission & Values" defaultOpen={false}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MissionValueCard emoji="🩺" title="Compassionate Expertise" />

          <MissionValueCard emoji="🧬" title="Translational Science" />

          <MissionValueCard emoji="🌎" title="Health Equity" />

          <MissionValueCard emoji="🔗" title="Strategic Collaboration" />

          <MissionValueCard emoji="📚" title="Mentorship & Education" />
        </div>
      </CollapsibleSection>
    </div>
  )
}
