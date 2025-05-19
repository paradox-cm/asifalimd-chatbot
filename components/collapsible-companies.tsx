"use client"

import { useState } from "react"
import {
  ChevronDown,
  ChevronUp,
  Briefcase,
  Users,
  Building,
  Brain,
  Stethoscope,
  Tablet,
  Activity,
  MonitorSmartphone,
  Zap,
  Pill,
} from "lucide-react"
import FadeInSection from "@/components/fade-in-section"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function CollapsibleCompanies() {
  const [isExpanded, setIsExpanded] = useState(true)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <section
      className="w-full py-10 sm:py-12 md:py-16 lg:py-20 px-2 sm:px-3 md:px-4 bg-background"
      aria-label="Companies"
    >
      <div className="container mx-auto px-2 sm:px-3 md:px-4" style={{ maxWidth: "1160px" }}>
        <div className="flex justify-between items-center mb-4 sm:mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Companies Dr. Ali Has Advised</h2>
          <button
            onClick={toggleExpanded}
            className="flex items-center justify-center p-2 rounded-full hover:bg-muted transition-colors"
            aria-expanded={isExpanded}
            aria-controls="companies-content"
            aria-label={isExpanded ? "Collapse companies section" : "Expand companies section"}
          >
            {isExpanded ? (
              <ChevronUp className="h-6 w-6 text-foreground/70" />
            ) : (
              <ChevronDown className="h-6 w-6 text-foreground/70" />
            )}
          </button>
        </div>

        {isExpanded && (
          <div id="companies-content" className="transition-all duration-300 origin-top">
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4 sm:mb-6 md:mb-8">
                <TabsTrigger
                  value="active"
                  className="text-sm md:text-base data-[state=active]:bg-clinical-100 dark:data-[state=active]:bg-clinical-900/30 data-[state=active]:text-clinical-700 dark:data-[state=active]:text-clinical-400"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-emerald-500"></div>
                    <span>Active Roles</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="recent"
                  className="text-sm md:text-base data-[state=active]:bg-clinical-100 dark:data-[state=active]:bg-clinical-900/30 data-[state=active]:text-clinical-700 dark:data-[state=active]:text-clinical-400"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-amber-500"></div>
                    <span>Recent Roles</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="legacy"
                  className="text-sm md:text-base data-[state=active]:bg-clinical-100 dark:data-[state=active]:bg-clinical-900/30 data-[state=active]:text-clinical-700 dark:data-[state=active]:text-clinical-400"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-blue-500"></div>
                    <span>Legacy Roles</span>
                  </div>
                </TabsTrigger>
              </TabsList>

              {/* Active Roles Tab */}
              <TabsContent value="active" className="mt-0">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-foreground mb-6">Active Roles (2023–Present)</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FadeInSection delay={100}>
                    <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300 h-full">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="bg-clinical-100 dark:bg-clinical-900/50 p-2 rounded-full">
                          <Brain className="h-5 w-5 text-clinical-600 dark:text-clinical-400" />
                        </div>
                        <h3 className="font-semibold text-foreground">Tabia Health</h3>
                      </div>
                      <p className="text-sm text-foreground/60 mb-3">Chief Medical Officer | 2024–Present</p>
                      <p className="text-foreground/70 text-sm">AI-powered clinical care pathway orchestration.</p>
                    </div>
                  </FadeInSection>

                  <FadeInSection delay={150}>
                    <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300 h-full">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="bg-clinical-100 dark:bg-clinical-900/50 p-2 rounded-full">
                          <Stethoscope className="h-5 w-5 text-clinical-600 dark:text-clinical-400" />
                        </div>
                        <h3 className="font-semibold text-foreground">First HX</h3>
                      </div>
                      <p className="text-sm text-foreground/60 mb-3">Managing Director, US | 2024–Present</p>
                      <p className="text-foreground/70 text-sm">
                        Automated clinical history-taking to improve patient-clinician communication.
                      </p>
                    </div>
                  </FadeInSection>

                  <FadeInSection delay={200}>
                    <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300 h-full">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="bg-clinical-100 dark:bg-clinical-900/50 p-2 rounded-full">
                          <Activity className="h-5 w-5 text-clinical-600 dark:text-clinical-400" />
                        </div>
                        <h3 className="font-semibold text-foreground">Healthseers / Cardio</h3>
                      </div>
                      <p className="text-sm text-foreground/60 mb-3">Chief Medical Officer | 2024–Present</p>
                      <p className="text-foreground/70 text-sm">
                        Phonocardiography + AI for early detection of elusive heart defects.
                      </p>
                    </div>
                  </FadeInSection>

                  <FadeInSection delay={250}>
                    <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300 h-full">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="bg-clinical-100 dark:bg-clinical-900/50 p-2 rounded-full">
                          <Briefcase className="h-5 w-5 text-clinical-600 dark:text-clinical-400" />
                        </div>
                        <h3 className="font-semibold text-foreground">Cena Ventures</h3>
                      </div>
                      <p className="text-sm text-foreground/60 mb-3">Chief Consultant | 2005–Present</p>
                      <p className="text-foreground/70 text-sm">
                        Strategic advisory for early-stage health tech ventures.
                      </p>
                    </div>
                  </FadeInSection>

                  <FadeInSection delay={300}>
                    <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300 h-full">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="bg-clinical-100 dark:bg-clinical-900/50 p-2 rounded-full">
                          <Zap className="h-5 w-5 text-clinical-600 dark:text-clinical-400" />
                        </div>
                        <h3 className="font-semibold text-foreground">Avive AED</h3>
                      </div>
                      <p className="text-sm text-foreground/60 mb-3">Medical Advisor | 2017–Present</p>
                      <p className="text-foreground/70 text-sm">
                        Compact, connected AEDs with crowd-sourced response systems.
                      </p>
                    </div>
                  </FadeInSection>
                </div>
              </TabsContent>

              {/* Recent Roles Tab */}
              <TabsContent value="recent" className="mt-0">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-foreground mb-6">Recent Roles (Ended 2021–2024)</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FadeInSection delay={100}>
                    <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300 h-full">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="bg-clinical-100 dark:bg-clinical-900/50 p-2 rounded-full">
                          <Activity className="h-5 w-5 text-clinical-600 dark:text-clinical-400" />
                        </div>
                        <h3 className="font-semibold text-foreground">Qardio Global</h3>
                      </div>
                      <p className="text-sm text-foreground/60 mb-3">Chief Medical Officer | 2022–2024</p>
                      <p className="text-foreground/70 text-sm">
                        Remote patient monitoring & digital cardiac rehab leader.
                      </p>
                    </div>
                  </FadeInSection>

                  <FadeInSection delay={150}>
                    <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300 h-full">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="bg-clinical-100 dark:bg-clinical-900/50 p-2 rounded-full">
                          <Tablet className="h-5 w-5 text-clinical-600 dark:text-clinical-400" />
                        </div>
                        <h3 className="font-semibold text-foreground">Thrive360</h3>
                      </div>
                      <p className="text-sm text-foreground/60 mb-3">Chief Medical Officer | 2021–2023</p>
                      <p className="text-foreground/70 text-sm">VR-based mental health and behavior change platform.</p>
                    </div>
                  </FadeInSection>

                  <FadeInSection delay={200}>
                    <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300 h-full">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="bg-clinical-100 dark:bg-clinical-900/50 p-2 rounded-full">
                          <Brain className="h-5 w-5 text-clinical-600 dark:text-clinical-400" />
                        </div>
                        <h3 className="font-semibold text-foreground">Cloud Steam Medical Imaging</h3>
                      </div>
                      <p className="text-sm text-foreground/60 mb-3">Chief Medical Officer | 2021–2024</p>
                      <p className="text-foreground/70 text-sm">
                        Repurposing oil & gas imaging AI for cardiac diagnostics.
                      </p>
                    </div>
                  </FadeInSection>

                  <FadeInSection delay={250}>
                    <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300 h-full">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="bg-clinical-100 dark:bg-clinical-900/50 p-2 rounded-full">
                          <Activity className="h-5 w-5 text-clinical-600 dark:text-clinical-400" />
                        </div>
                        <h3 className="font-semibold text-foreground">Lumi Health</h3>
                      </div>
                      <p className="text-sm text-foreground/60 mb-3">Chief Medical Advisor | 2021–2023</p>
                      <p className="text-foreground/70 text-sm">
                        Medication adherence + remote management for heart failure.
                      </p>
                    </div>
                  </FadeInSection>

                  <FadeInSection delay={300}>
                    <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300 h-full">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="bg-clinical-100 dark:bg-clinical-900/50 p-2 rounded-full">
                          <Pill className="h-5 w-5 text-clinical-600 dark:text-clinical-400" />
                        </div>
                        <h3 className="font-semibold text-foreground">PLx Pharma</h3>
                      </div>
                      <p className="text-sm text-foreground/60 mb-3">Chief Medical Advisor | 2022–2023</p>
                      <p className="text-foreground/70 text-sm">
                        Phospholipid bilayer aspirin—GI-safe anti-inflammatory therapy.
                      </p>
                    </div>
                  </FadeInSection>

                  <FadeInSection delay={350}>
                    <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300 h-full">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="bg-clinical-100 dark:bg-clinical-900/50 p-2 rounded-full">
                          <Activity className="h-5 w-5 text-clinical-600 dark:text-clinical-400" />
                        </div>
                        <h3 className="font-semibold text-foreground">Preventric</h3>
                      </div>
                      <p className="text-sm text-foreground/60 mb-3">Chief Medical Officer | 2020–2023</p>
                      <p className="text-foreground/70 text-sm">
                        Digital ambulatory blood pressure monitoring (ABPM) platform.
                      </p>
                    </div>
                  </FadeInSection>
                </div>
              </TabsContent>

              {/* Legacy Roles Tab */}
              <TabsContent value="legacy" className="mt-0">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-foreground mb-6">
                    Legacy Advisory & Innovation Roles (Pre-2020)
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FadeInSection delay={100}>
                    <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300 h-full">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="bg-clinical-100 dark:bg-clinical-900/50 p-2 rounded-full">
                          <MonitorSmartphone className="h-5 w-5 text-clinical-600 dark:text-clinical-400" />
                        </div>
                        <h3 className="font-semibold text-foreground">Curogram</h3>
                      </div>
                      <p className="text-sm text-foreground/60 mb-3">Chief Medical Officer | 2020–2021</p>
                      <p className="text-foreground/70 text-sm">
                        HIPAA-compliant 2-way texting + telehealth messaging.
                      </p>
                    </div>
                  </FadeInSection>

                  <FadeInSection delay={150}>
                    <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300 h-full">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="bg-clinical-100 dark:bg-clinical-900/50 p-2 rounded-full">
                          <Stethoscope className="h-5 w-5 text-clinical-600 dark:text-clinical-400" />
                        </div>
                        <h3 className="font-semibold text-foreground">Fruit Street Health</h3>
                      </div>
                      <p className="text-sm text-foreground/60 mb-3">Chief Medical Officer | 2014–2019</p>
                      <p className="text-foreground/70 text-sm">
                        Telehealth-based CDC Diabetes Prevention Program (DPP).
                      </p>
                    </div>
                  </FadeInSection>

                  <FadeInSection delay={200}>
                    <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300 h-full">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="bg-clinical-100 dark:bg-clinical-900/50 p-2 rounded-full">
                          <MonitorSmartphone className="h-5 w-5 text-clinical-600 dark:text-clinical-400" />
                        </div>
                        <h3 className="font-semibold text-foreground">VSee</h3>
                      </div>
                      <p className="text-sm text-foreground/60 mb-3">Medical Advisor | 2016–2020</p>
                      <p className="text-foreground/70 text-sm">
                        Secure telemedicine platform for clinics and enterprise.
                      </p>
                    </div>
                  </FadeInSection>

                  <FadeInSection delay={250}>
                    <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300 h-full">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="bg-clinical-100 dark:bg-clinical-900/50 p-2 rounded-full">
                          <Activity className="h-5 w-5 text-clinical-600 dark:text-clinical-400" />
                        </div>
                        <h3 className="font-semibold text-foreground">Fitbit</h3>
                      </div>
                      <p className="text-sm text-foreground/60 mb-3">Medical Advisor | 2016–2018</p>
                      <p className="text-foreground/70 text-sm">
                        Connected health strategy for wearables + patient engagement.
                      </p>
                    </div>
                  </FadeInSection>

                  <FadeInSection delay={300}>
                    <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300 h-full">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="bg-clinical-100 dark:bg-clinical-900/50 p-2 rounded-full">
                          <Users className="h-5 w-5 text-clinical-600 dark:text-clinical-400" />
                        </div>
                        <h3 className="font-semibold text-foreground">Point of Care Network</h3>
                      </div>
                      <p className="text-sm text-foreground/60 mb-3">Chief Medical Officer | 2011–2013</p>
                      <p className="text-foreground/70 text-sm">
                        Nationwide provider collaboration network (APPs, MDs).
                      </p>
                    </div>
                  </FadeInSection>

                  <FadeInSection delay={350}>
                    <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300 h-full">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="bg-clinical-100 dark:bg-clinical-900/50 p-2 rounded-full">
                          <Building className="h-5 w-5 text-clinical-600 dark:text-clinical-400" />
                        </div>
                        <h3 className="font-semibold text-foreground">American Mold Guard ($AMGI)</h3>
                      </div>
                      <p className="text-sm text-foreground/60 mb-3">Chief Medical Officer | 2006–2008</p>
                      <p className="text-foreground/70 text-sm">
                        Mold prevention services for healthcare and construction sectors.
                      </p>
                    </div>
                  </FadeInSection>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </section>
  )
}
