import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Heart,
  Activity,
  Brain,
  Shield,
  Users,
  LineChart,
  ArrowRight,
  Check,
  Stethoscope,
  HeartPulse,
  UserCog,
} from "lucide-react"
import FadeInSection from "@/components/fade-in-section"
import Image from "next/image"
import CollapsibleSection from "@/components/collapsible-section"
import { AppointmentForm } from "@/components/appointment-form"

export default function ClinicalPage() {
  return (
    <div className="flex flex-col">
      {/* Title Block + Intro Heading */}
      <section className="w-full py-16 md:py-20 px-2 md:px-4 bg-background" aria-label="Clinical Practice Introduction">
        <div className="container mx-auto px-2 md:px-4" style={{ maxWidth: "1160px" }}>
          <FadeInSection>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-foreground">
              Clinical Practice
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-6">
              Precision cardiovascular care rooted in diagnostics, prevention, and deep listening.
            </p>
            <p className="text-lg md:text-xl text-foreground/70 mb-8 border-l-4 border-clinical-500 pl-4 py-2">
              Dr. Asif Ali is a board-certified cardiologist and partner at Houston Cardiology Consultants, where he
              leads patient care for complex cardiovascular and autonomic conditions. His clinical focus blends
              longitudinal care, digital diagnostics, and a commitment to health equity.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Clinical Focus Areas - NEW UNIFIED SECTION */}
      <CollapsibleSection title="Clinical Focus Areas" defaultOpen={true}>
        <p className="text-lg text-foreground/80 mb-8">
          Dr. Ali provides advanced diagnostics and longitudinal care for a wide range of cardiovascular and autonomic
          conditions—with a special focus on underserved and complex cases.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FadeInSection delay={100}>
            <Card className="hover:border-clinical-400 transition-all duration-300 h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full shrink-0">
                    <Brain className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Dysautonomia (including POTS)</h3>
                </div>
              </CardContent>
            </Card>
          </FadeInSection>

          <FadeInSection delay={150}>
            <Card className="hover:border-clinical-400 transition-all duration-300 h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full shrink-0">
                    <Heart className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Cardiovascular Diagnostics</h3>
                </div>
              </CardContent>
            </Card>
          </FadeInSection>

          <FadeInSection delay={200}>
            <Card className="hover:border-clinical-400 transition-all duration-300 h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full shrink-0">
                    <Shield className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Preventive Cardiology & Metabolic Health</h3>
                </div>
              </CardContent>
            </Card>
          </FadeInSection>

          <FadeInSection delay={250}>
            <Card className="hover:border-clinical-400 transition-all duration-300 h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full shrink-0">
                    <Activity className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Post-COVID Syndrome & Long-COVID Care</h3>
                </div>
              </CardContent>
            </Card>
          </FadeInSection>

          <FadeInSection delay={300}>
            <Card className="hover:border-clinical-400 transition-all duration-300 h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full shrink-0">
                    <Brain className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Autonomic Nervous System Disorders</h3>
                </div>
              </CardContent>
            </Card>
          </FadeInSection>

          <FadeInSection delay={350}>
            <Card className="hover:border-clinical-400 transition-all duration-300 h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full shrink-0">
                    <LineChart className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Digital Monitoring & Personalized Treatment Plans
                  </h3>
                </div>
              </CardContent>
            </Card>
          </FadeInSection>

          <FadeInSection delay={400}>
            <Card className="hover:border-clinical-400 transition-all duration-300 h-full md:col-span-2 lg:col-span-3">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full shrink-0">
                    <Users className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Underserved Populations & Health Equity</h3>
                </div>
              </CardContent>
            </Card>
          </FadeInSection>
        </div>
      </CollapsibleSection>

      {/* Clinical Services Offered - NEW SECTION */}
      <CollapsibleSection title="Clinical Services" defaultOpen={false}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Diagnostic Services */}
          <FadeInSection delay={100}>
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full">
                    <Stethoscope className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Diagnostic Services</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-clinical-500 mt-0.5 flex-shrink-0" />
                    <span>Advanced cardiovascular testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-clinical-500 mt-0.5 flex-shrink-0" />
                    <span>Autonomic nervous system evaluation (including tilt-table testing)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-clinical-500 mt-0.5 flex-shrink-0" />
                    <span>Postural Orthostatic Tachycardia Syndrome (POTS) diagnostics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-clinical-500 mt-0.5 flex-shrink-0" />
                    <span>Post-COVID autonomic dysfunction assessments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-clinical-500 mt-0.5 flex-shrink-0" />
                    <span>EKG, echocardiogram, Holter monitor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-clinical-500 mt-0.5 flex-shrink-0" />
                    <span>Blood pressure variability and metabolic paneling</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </FadeInSection>

          {/* Preventive & Longitudinal Care */}
          <FadeInSection delay={200}>
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full">
                    <HeartPulse className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Preventive & Longitudinal Care</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-clinical-500 mt-0.5 flex-shrink-0" />
                    <span>Personalized cardiovascular prevention plans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-clinical-500 mt-0.5 flex-shrink-0" />
                    <span>Lifestyle-based risk reduction (nutrition, fitness, sleep)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-clinical-500 mt-0.5 flex-shrink-0" />
                    <span>Medication optimization and step-down strategies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-clinical-500 mt-0.5 flex-shrink-0" />
                    <span>Ongoing care for complex, multi-system patients</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-clinical-500 mt-0.5 flex-shrink-0" />
                    <span>Digital monitoring and wearables integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-clinical-500 mt-0.5 flex-shrink-0" />
                    <span>Collaborative care planning with PCPs and specialists</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </FadeInSection>

          {/* Care for Underserved or Complex Cases */}
          <FadeInSection delay={300}>
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full">
                    <UserCog className="h-6 w-6 text-clinical-600 dark:text-clinical-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Care for Underserved or Complex Cases</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-clinical-500 mt-0.5 flex-shrink-0" />
                    <span>Long-COVID patient management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-clinical-500 mt-0.5 flex-shrink-0" />
                    <span>Women's cardiovascular health</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-clinical-500 mt-0.5 flex-shrink-0" />
                    <span>Health equity navigation support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-clinical-500 mt-0.5 flex-shrink-0" />
                    <span>Patients with prior misdiagnoses or diagnostic ambiguity</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </FadeInSection>
        </div>
      </CollapsibleSection>

      {/* How I Practice Section */}
      <CollapsibleSection title="Clinical Approach" defaultOpen={false}>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <p className="text-lg text-foreground/80 mb-4">
              Dr. Ali's care approach centers on precision, empathy, and partnership. He believes in translating complex
              science into clear care plans—especially for patients who've been misunderstood or underserved.
            </p>
            <p className="text-lg text-foreground/80 mb-4"></p>
            <p className="text-lg text-foreground/80 mb-6">
              Every patient encounter is built on deep listening and diagnostic curiosity.
            </p>

            <div className="mt-8">
              <div className="bg-clinical-50 dark:bg-clinical-900/20 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Are you a patient or referring provider?</h3>
                <Link href="/contact">
                  <Button className="flex items-center gap-2">
                    Contact Dr. Ali
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chris331333_A_black-and-white_sketch_of_a_doctor_explaining_h_8edd10ad-d29d-4806-ae6c-02d234775d01_3-VqrZwlo8ynjEBFbq9IOFKgC7M0l2eW.png"
                alt="Doctor consulting with patient"
                className="w-full h-auto"
                style={{ maxWidth: "500px" }}
              />
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Clinic Location & Contact */}
      <CollapsibleSection title="Where Dr. Ali Sees Patients" defaultOpen={false}>
        <Card>
          <CardContent className="p-6 md:p-8">
            {/* Description and logo side by side */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              {/* Text content - fills available space */}
              <div className="flex-grow">
                <p className="text-base md:text-lg text-foreground/80 mb-6">
                  Dr. Ali sees patients at Houston Cardiology Consultants, a leading cardiovascular group practice
                  serving the Greater Houston region since 1983.
                </p>
              </div>

              {/* Logo - hugs content */}
              <div className="flex-shrink-0 flex items-start">
                <Image
                  src="/images/logos/hcc-light.png"
                  alt="Houston Cardiology Consultants Logo"
                  width={208}
                  height={83}
                  className="h-auto w-48 dark:hidden"
                />
                <Image
                  src="/images/logos/hcc-dark.png"
                  alt="Houston Cardiology Consultants Logo"
                  width={83}
                  height={83}
                  className="h-auto w-48 hidden dark:block"
                />
              </div>
            </div>

            {/* Practice emphasis section with improved spacing */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-foreground mb-6">His practice emphasizes:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1 - Simplified */}
                <Card className="bg-card/50">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-start">
                      <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full mb-4">
                        <Activity className="h-5 w-5 text-clinical-600 dark:text-clinical-400" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Holistic Diagnostics</h3>
                      <p className="text-foreground/70">With cardiovascular + autonomic focus</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Card 2 - Simplified */}
                <Card className="bg-card/50">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-start">
                      <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full mb-4">
                        <Shield className="h-5 w-5 text-clinical-600 dark:text-clinical-400" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Longitudinal Prevention</h3>
                      <p className="text-foreground/70">
                        Including lifestyle, digital monitoring, and tailored pharmacology
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Card 3 - Simplified */}
                <Card className="bg-card/50">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-start">
                      <div className="bg-clinical-100 dark:bg-clinical-900/50 p-3 rounded-full mb-4">
                        <Users className="h-5 w-5 text-clinical-600 dark:text-clinical-400" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Personalized Care</h3>
                      <p className="text-foreground/70">
                        Deep listening, especially for underserved or misdiagnosed populations
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Action buttons - full width and evenly spaced */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="https://hccheart.com" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button variant="outline" className="w-full">
                  Visit Practice Website
                </Button>
              </a>
              <a href="https://hccheart.com/contact/" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button className="w-full">Contact For Appointments</Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </CollapsibleSection>

      {/* Appointment Request Form */}
      <CollapsibleSection title="Request an Appointment" defaultOpen={true}>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <p className="text-lg text-foreground/80 mb-4">
              Use this form to request an appointment with Dr. Ali. Our team will contact you shortly to confirm
              availability and provide further details.
            </p>
            <p className="text-lg text-foreground/80 mb-6">
              For urgent matters, please contact the office directly at{" "}
              <a
                href="tel:+1-713-790-9401"
                className="text-clinical-600 dark:text-clinical-400 hover:underline font-medium"
              >
                713-790-9401
              </a>
              .
            </p>

            <div className="bg-clinical-50 dark:bg-clinical-900/20 p-5 rounded-lg mb-6">
              <h4 className="font-medium mb-3">What to expect:</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-clinical-500 mt-0.5 flex-shrink-0" />
                  <span>Confirmation call or email within 1-2 business days</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-clinical-500 mt-0.5 flex-shrink-0" />
                  <span>Insurance verification prior to appointment</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-clinical-500 mt-0.5 flex-shrink-0" />
                  <span>New patient forms sent before your visit</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="md:w-1/2">
            <div className="bg-card border border-border rounded-lg p-4 md:p-6">
              <AppointmentForm />
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* The POTS Doc Section - Updated with new content - Currently hidden */}
      <section className="hidden w-full py-8 md:py-16 px-2 md:px-4 bg-background" aria-label="The POTS Doc">
        <div className="container mx-auto px-2 md:px-4" style={{ maxWidth: "1160px" }}>
          <Card>
            <CardContent className="p-4 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start gap-6 mb-6">
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <Image
                    src="/images/pots-doc-heart.png"
                    alt="POTS Doc Heart Logo"
                    width={48}
                    height={48}
                    className="w-16 md:w-12 h-auto"
                  />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-4 text-foreground text-center md:text-left">
                    The POTS Doc (Coming Soon)
                  </h2>
                  <div className="space-y-4 text-foreground/80">
                    <p className="text-base md:text-lg">
                      Dr. Asif Ali is nationally recognized for his expertise in Postural Orthostatic Tachycardia
                      Syndrome (POTS) and related autonomic disorders, including those emerging after COVID-19.
                    </p>
                    <p className="text-base md:text-lg">
                      As part of his ongoing commitment to this often-misunderstood patient community, The POTS Doc
                      identity was created to become a dedicated resource for patients navigating fatigue, dizziness,
                      rapid heart rate, and complex autonomic symptoms—particularly those who have been misdiagnosed,
                      dismissed, or underserved.
                    </p>
                    <p className="text-base md:text-lg">
                      A new site is currently in development to provide educational tools, diagnostic pathways, and
                      clinical guidance for patients and caregivers navigating dysautonomia.
                    </p>
                    <p className="text-base md:text-lg">
                      In the meantime, patients can continue to receive care through Dr. Ali's clinical practice at
                      Houston Cardiology Consultants, where he leads a comprehensive approach that blends advanced
                      diagnostics, autonomic rehabilitation, medication management, and longitudinal follow-up.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
