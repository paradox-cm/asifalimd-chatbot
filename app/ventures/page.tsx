import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Briefcase,
  FlaskRoundIcon as Flask,
  FileCheck,
  Wifi,
  TrendingUp,
  Target,
  Users,
  Building,
  ArrowRight,
  Brain,
  Stethoscope,
  Tablet,
  Activity,
  MonitorSmartphone,
  Zap,
  Pill,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import FadeInSection from "@/components/fade-in-section"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import CaseStudiesCarousel from "@/components/case-studies-carousel"
import CollapsibleSection from "@/components/collapsible-section"

export default function VenturesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        className="w-full py-10 sm:py-12 md:py-16 lg:py-20 px-2 sm:px-3 md:px-4 bg-background"
        aria-label="Innovation Introduction"
      >
        <div className="container mx-auto px-2 sm:px-3 md:px-4" style={{ maxWidth: "1160px" }}>
          <FadeInSection>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-foreground">
              Innovation & Ventures
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 dark:text-slate-400 mb-6">
              Translating clinical insight into scalable health solutions.
            </p>
            <p className="text-lg md:text-xl text-foreground/70 mb-4 sm:mb-6 md:mb-8 border-l-4 border-clinical-500 pl-4 py-2">
              Dr. Asif Ali serves as a strategic advisor, fractional CMO, and founding consultant to over 15 med-tech
              startups. Through Cena Ventures, he helps companies validate products, engage clinicians, and scale
              ethically into real-world care.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Companies Section - Tabbed Interface */}
      <CollapsibleSection title="Companies Dr. Ali Has Advised" defaultOpen={true}>
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
                  <p className="text-foreground/70 text-sm">Strategic advisory for early-stage health tech ventures.</p>
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
                  <p className="text-foreground/70 text-sm">HIPAA-compliant 2-way texting + telehealth messaging.</p>
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
                  <p className="text-foreground/70 text-sm">Telehealth-based CDC Diabetes Prevention Program (DPP).</p>
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
                  <p className="text-foreground/70 text-sm">Secure telemedicine platform for clinics and enterprise.</p>
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
                  <p className="text-foreground/70 text-sm">Nationwide provider collaboration network (APPs, MDs).</p>
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
      </CollapsibleSection>

      {/* Roles & Contributions Section */}
      <CollapsibleSection title="Roles & Contributions" defaultOpen={false}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FadeInSection delay={100}>
            <div className="border-2 border-border rounded-lg bg-card p-4 sm:p-5">
              <div className="flex items-center gap-4">
                <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full shrink-0">
                  <Briefcase className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Fractional / Chief Medical Officer</h3>
                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={150}>
            <div className="border-2 border-border rounded-lg bg-card p-4 sm:p-5">
              <div className="flex items-center gap-4">
                <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full shrink-0">
                  <Flask className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Clinical Trial Strategy & Design</h3>
                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={200}>
            <div className="border-2 border-border rounded-lg bg-card p-4 sm:p-5">
              <div className="flex items-center gap-4">
                <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full shrink-0">
                  <FileCheck className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Digital Health Validation</h3>
                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={250}>
            <div className="border-2 border-border rounded-lg bg-card p-4 sm:p-5">
              <div className="flex items-center gap-4">
                <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full shrink-0">
                  <Wifi className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">AI & Remote Monitoring Integration</h3>
                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={300}>
            <div className="border-2 border-border rounded-lg bg-card p-4 sm:p-5">
              <div className="flex items-center gap-4">
                <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full shrink-0">
                  <TrendingUp className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Go-to-market Strategy</h3>
                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={350}>
            <div className="border-2 border-border rounded-lg bg-card p-4 sm:p-5">
              <div className="flex items-center gap-4">
                <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full shrink-0">
                  <Target className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Product-market Fit</h3>
                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={400} className="md:col-span-2">
            <div className="border-2 border-border rounded-lg bg-card p-4 sm:p-5">
              <div className="flex items-center gap-4">
                <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full shrink-0">
                  <Users className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Physician Engagement & Investor Communications
                  </h3>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </CollapsibleSection>

      {/* Case Studies Section */}
      <CollapsibleSection title="Case Studies in Innovation" defaultOpen={false} contentClassName="py-4">
        {/* Replace the grid with the carousel component */}
        <CaseStudiesCarousel />
      </CollapsibleSection>

      {/* Divider */}
      <div className="w-full border-t border-border"></div>

      {/* CENA Ventures Section */}
      <section
        className="w-full py-10 sm:py-12 md:py-16 lg:py-20 px-2 sm:px-3 md:px-4 bg-background"
        aria-label="CENA Ventures"
      >
        <div className="container mx-auto px-2 sm:px-3 md:px-4" style={{ maxWidth: "1160px" }}>
          <div className="border-2 border-border p-4 sm:p-6 md:p-8 rounded-lg bg-card">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">CENA Ventures</h2>
            <p className="text-xl text-foreground/80 mb-6">Clinical insights. Early validation. Scaled impact.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-lg text-foreground/70 mb-4">
                  CENA Ventures is Dr. Ali's innovation platform designed to bridge clinical precision with
                  entrepreneurial momentum.
                </p>

                <p className="text-lg text-foreground/70 mb-4">
                  Working alongside mission-driven founders, Dr. Ali helps transform early-stage ideas into scalable
                  health solutions—prioritizing real-world evidence, patient-centered design, and adoption pathways from
                  the start.
                </p>
              </div>

              <div>
                <p className="text-lg text-foreground/70 mb-4">
                  Through CENA Ventures, he advises and co-develops across areas like digital diagnostics, remote
                  monitoring, and health equity innovation—helping startups align clinical value with regulatory and
                  market success.
                </p>

                <p className="text-lg text-foreground/70 mb-4">
                  His approach combines clinical expertise with strategic vision, ensuring that innovative health
                  technologies not only meet regulatory standards but also deliver meaningful outcomes for patients and
                  providers alike.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-foreground mb-4">Areas of Focus:</h3>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-clinical-100 hover:bg-clinical-200 text-clinical-800 dark:bg-clinical-900/30 dark:text-clinical-300 dark:hover:bg-clinical-900/50">
                  Digital Diagnostics
                </Badge>
                <Badge className="bg-clinical-100 hover:bg-clinical-200 text-clinical-800 dark:bg-clinical-900/30 dark:text-clinical-300 dark:hover:bg-clinical-900/50">
                  Remote Patient Monitoring
                </Badge>
                <Badge className="bg-clinical-100 hover:bg-clinical-200 text-clinical-800 dark:bg-clinical-900/30 dark:text-clinical-300 dark:hover:bg-clinical-900/50">
                  AI + Clinical Decision Support
                </Badge>
                <Badge className="bg-clinical-100 hover:bg-clinical-200 text-clinical-800 dark:bg-clinical-900/30 dark:text-clinical-300 dark:hover:bg-clinical-900/50">
                  Health Equity Innovation
                </Badge>
                <Badge className="bg-clinical-100 hover:bg-clinical-200 text-clinical-800 dark:bg-clinical-900/30 dark:text-clinical-300 dark:hover:bg-clinical-900/50">
                  Preventive Cardiology Technologies
                </Badge>
                <Badge className="bg-clinical-100 hover:bg-clinical-200 text-clinical-800 dark:bg-clinical-900/30 dark:text-clinical-300 dark:hover:bg-clinical-900/50">
                  Autonomic + Cardiovascular Disorders
                </Badge>
                <Badge className="bg-clinical-100 hover:bg-clinical-200 text-clinical-800 dark:bg-clinical-900/30 dark:text-clinical-300 dark:hover:bg-clinical-900/50">
                  Personalized Digital Therapeutics
                </Badge>
                <Badge className="bg-clinical-100 hover:bg-clinical-200 text-clinical-800 dark:bg-clinical-900/30 dark:text-clinical-300 dark:hover:bg-clinical-900/50">
                  Regulatory Strategy & Evidence Generation
                </Badge>
                <Badge className="bg-clinical-100 hover:bg-clinical-200 text-clinical-800 dark:bg-clinical-900/30 dark:text-clinical-300 dark:hover:bg-clinical-900/50">
                  Clinical Trial Acceleration
                </Badge>
                <Badge className="bg-clinical-100 hover:bg-clinical-200 text-clinical-800 dark:bg-clinical-900/30 dark:text-clinical-300 dark:hover:bg-clinical-900/50">
                  Population Health Tools
                </Badge>
                <Badge className="bg-clinical-100 hover:bg-clinical-200 text-clinical-800 dark:bg-clinical-900/30 dark:text-clinical-300 dark:hover:bg-clinical-900/50">
                  Wearables for Real-World Monitoring
                </Badge>
                <Badge className="bg-clinical-100 hover:bg-clinical-200 text-clinical-800 dark:bg-clinical-900/30 dark:text-clinical-300 dark:hover:bg-clinical-900/50">
                  Patient-Centered Design & Usability
                </Badge>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/contact">
                <Button className="bg-clinical-600 hover:bg-clinical-700 text-white transition-all duration-300 flex items-center gap-2">
                  Let's Collaborate
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
