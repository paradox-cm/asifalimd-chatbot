import Link from "next/link"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import FadeInSection from "@/components/fade-in-section"

export default function CVPage() {
  return (
    <main className="container mx-auto max-w-4xl py-12 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold">Curriculum Vitae</h1>
        <Link
          href="https://www.dropbox.com/scl/fi/d1ui1irwfj44wb7q7dozl/Asif-Ali-CV-August-2024.docx.pdf?rlkey=v8mdrt44wju8jr5sylebz0ppb&dl=0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="flex items-center gap-2" aria-label="Download CV as PDF">
            <Download size={16} className="mr-1" />
            Download CV
          </Button>
        </Link>
      </div>

      <div className="space-y-12">
        <FadeInSection>
          <section aria-labelledby="education-heading" className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
            <h2 id="education-heading" className="text-2xl font-bold mb-6 text-primary border-b pb-2">
              Education and Training
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold">McGovern Medical School, The University of Texas</h3>
                <p className="text-muted-foreground mb-2">Houston, TX</p>
                <ul className="list-disc list-inside ml-4 space-y-1 text-foreground/80">
                  <li>Fellowship, Ultrasound Imaging (2010–2011)</li>
                  <li>Fellowship, Cardiology (2007–2010)</li>
                  <li>Residency, Internal Medicine (2002–2005)</li>
                  <li>Doctor of Medicine (1998–2002)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold">The University of Texas School of Public Health</h3>
                <p className="text-muted-foreground mb-2">Houston, TX</p>
                <ul className="list-disc list-inside ml-4 text-foreground/80">
                  <li>Master of Science, Public Health (1996–1998)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Trinity University</h3>
                <p className="text-muted-foreground mb-2">San Antonio, TX</p>
                <ul className="list-disc list-inside ml-4 text-foreground/80">
                  <li>Bachelor of Science, Biology (1992–1996)</li>
                </ul>
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <section aria-labelledby="experience-heading" className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
            <h2 id="experience-heading" className="text-2xl font-bold mb-6 text-primary border-b pb-2">
              Professional Experience
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                  <h3 className="text-xl font-semibold">College of Medicine, University of Houston</h3>
                  <span className="text-muted-foreground font-medium mt-1 sm:mt-0">2024–Present</span>
                </div>
                <p className="text-foreground/80">Clinical Assistant Professor</p>
                <p className="text-sm text-foreground/70 mt-1">
                  Annually appointed Position by the Dean of the University of Houston College of Medicine.
                </p>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                  <h3 className="text-xl font-semibold">American Heart Association</h3>
                  <span className="text-muted-foreground font-medium mt-1 sm:mt-0">2023–Present</span>
                </div>
                <p className="text-foreground/80">Member of National Health Technology Advisory Group</p>
                <p className="text-sm text-foreground/70 mt-1">
                  A group focused on AI in Remote Patient Monitoring and Cardiac Rehab via the Center for Health
                  Technology & Innovation.
                </p>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                  <h3 className="text-xl font-semibold">Cena Research Institute</h3>
                  <span className="text-muted-foreground font-medium mt-1 sm:mt-0">2023–Present</span>
                </div>
                <p className="text-foreground/80">Founder & Medical Director</p>
                <p className="text-sm text-foreground/70 mt-1">
                  A provider of turn-key clinical research solutions serving innovative cardiology related medical
                  technologies.
                </p>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                  <h3 className="text-xl font-semibold">Houston Cardiology Consultants</h3>
                  <span className="text-muted-foreground font-medium mt-1 sm:mt-0">2011–Present</span>
                </div>
                <p className="text-foreground/80">Partner</p>
                <p className="text-sm text-foreground/70 mt-1">
                  Cardiovascular Health Care & Preventative Medical Practice located in Houston founded in 1983.
                </p>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                  <h3 className="text-xl font-semibold">McGovern Medical School, The University of Texas</h3>
                  <span className="text-muted-foreground font-medium mt-1 sm:mt-0">2010–2021, 2024–Present</span>
                </div>
                <p className="text-foreground/80">Clinical Assistant Professor</p>
                <p className="text-sm text-foreground/70 mt-1">
                  Annually appointed Position by the Dean of McGovern Medical School.
                </p>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                  <h3 className="text-xl font-semibold">Cena Ventures</h3>
                  <span className="text-muted-foreground font-medium mt-1 sm:mt-0">2005–Present</span>
                </div>
                <p className="text-foreground/80">Chief Consultant</p>
                <p className="text-sm text-foreground/70 mt-1">
                  Advisory Practice Serving Emerging Companies in the Healthcare Technology Space.
                </p>
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <section aria-labelledby="advisory-heading" className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
            <h2 id="advisory-heading" className="text-2xl font-bold mb-6 text-primary border-b pb-2">
              Corporate Advisory Experience
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="p-4 rounded-md bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-shadow duration-300">
                  <div className="flex flex-col mb-2">
                    <h3 className="text-lg font-semibold">Tabia Health</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-foreground/80 font-medium">Chief Medical Officer</p>
                      <span className="text-sm text-muted-foreground">2024–Present</span>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/70">
                    AI-powered digital care pathway orchestration platform that ensures clinical interventions are
                    ordered and executed on time.
                  </p>
                </div>

                <div className="p-4 rounded-md bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-shadow duration-300">
                  <div className="flex flex-col mb-2">
                    <h3 className="text-lg font-semibold">FirstHX</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-foreground/80 font-medium">Managing Director US</p>
                      <span className="text-sm text-muted-foreground">2024–Present</span>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/70">
                    Knowledge-based history taking solution that helps patients communicate their medical histories to
                    their healthcare team.
                  </p>
                </div>

                <div className="p-4 rounded-md bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-shadow duration-300">
                  <div className="flex flex-col mb-2">
                    <h3 className="text-lg font-semibold">Healthseers/Cardio</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-foreground/80 font-medium">Chief Medical Officer</p>
                      <span className="text-sm text-muted-foreground">2024–Present</span>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/70">
                    Multiple-track AI-enhanced PhonoCardioGraphy solution to detect heart defects that chronically
                    escape detection.
                  </p>
                </div>

                <div className="p-4 rounded-md bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-shadow duration-300">
                  <div className="flex flex-col mb-2">
                    <h3 className="text-lg font-semibold">Avive AED</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-foreground/80 font-medium">Chief Medical Advisor</p>
                      <span className="text-sm text-muted-foreground">2017–Present</span>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/70">
                    Manufacturer of next generation Automated External Defibrillator (AED).
                  </p>
                </div>

                <div className="p-4 rounded-md bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-shadow duration-300">
                  <div className="flex flex-col mb-2">
                    <h3 className="text-lg font-semibold">Qardio</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-foreground/80 font-medium">Global Chief Medical Officer</p>
                      <span className="text-sm text-muted-foreground">2022–2024</span>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/70">
                    Global leader in Remote Patient Monitoring and Remote Cardiac Rehabilitation.
                  </p>
                </div>

                <div className="p-4 rounded-md bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-shadow duration-300">
                  <div className="flex flex-col mb-2">
                    <h3 className="text-lg font-semibold">Thrive360</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-foreground/80 font-medium">Chief Medical Officer</p>
                      <span className="text-sm text-muted-foreground">2021–2023</span>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/70">Oculus Based (Virtual Reality) Mental Health Solution.</p>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground italic">
                  Additional advisory roles include CloudSteam Medical Imaging, Lumi Health, PLX Pharma, Preventric,
                  Curogram, Vsee, Fruit Street, Fitbit, and more.
                </p>
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <section aria-labelledby="trials-heading" className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
            <h2 id="trials-heading" className="text-2xl font-bold mb-6 text-primary border-b pb-2">
              Clinical Trials
            </h2>
            <div className="space-y-4">
              <div className="p-4 border-l-4 border-clinical-500 bg-gray-50 dark:bg-gray-800 rounded-r-md">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <h3 className="text-lg font-semibold">
                    Valencell: Fingertip and Wrist Blood Pressure Data Collection in Older Adults
                  </h3>
                  <span className="text-muted-foreground font-medium mt-1 sm:mt-0">2023</span>
                </div>
              </div>

              <div className="p-4 border-l-4 border-clinical-500 bg-gray-50 dark:bg-gray-800 rounded-r-md">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <h3 className="text-lg font-semibold">Enhanced External Counterpulsation Effects</h3>
                  <span className="text-muted-foreground font-medium mt-1 sm:mt-0">2022-2023</span>
                </div>
                <p className="text-sm text-foreground/70 mt-1">
                  Retrospective Trial of Effects of EECP on BP and Heart Rate
                </p>
              </div>

              <div className="p-4 border-l-4 border-clinical-500 bg-gray-50 dark:bg-gray-800 rounded-r-md">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <h3 className="text-lg font-semibold">Thrive360: Virtual Reality Cognitive Behavioral Therapy</h3>
                  <span className="text-muted-foreground font-medium mt-1 sm:mt-0">2022-2023</span>
                </div>
                <p className="text-sm text-foreground/70 mt-1">
                  Effects on stage 1 to 2 hypertensive patients in an outpatient cardiovascular practice
                </p>
              </div>

              <div className="p-4 border-l-4 border-clinical-500 bg-gray-50 dark:bg-gray-800 rounded-r-md">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <h3 className="text-lg font-semibold">TargetBP: Renal Denervation Study</h3>
                  <span className="text-muted-foreground font-medium mt-1 sm:mt-0">2019-2022</span>
                </div>
                <p className="text-sm text-foreground/70 mt-1">Global Phase 3 Clinical Trial for Ablative Solutions</p>
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <section
            aria-labelledby="publications-heading"
            className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm"
          >
            <h2 id="publications-heading" className="text-2xl font-bold mb-6 text-primary border-b pb-2">
              Selected Publications
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                <h3 className="text-lg font-semibold">
                  Circle of Vieussens: Its Importance in the Presence of Significant Coronary Artery Stenosis in a
                  26-Year-Old Female With Kawasaki Disease
                </h3>
                <p className="text-muted-foreground mt-1">Cureus. August 10, 2024.</p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                <h3 className="text-lg font-semibold">
                  Mal De Debarquement Syndrome: An Often Unrecognized and Unreported Condition
                </h3>
                <p className="text-muted-foreground mt-1">Cureus. July 15, 2024.</p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                <h3 className="text-lg font-semibold">
                  Brief Review and Primer of Key Terminology for Artificial Intelligence and Machine Learning in
                  Hypertension
                </h3>
                <p className="text-muted-foreground mt-1">
                  American Heart Association Journals – Hypertension. July 16, 2024.
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                <h3 className="text-lg font-semibold">
                  Mental Health Applications of Generative AI and Large Language Modeling in the United States
                </h3>
                <p className="text-muted-foreground mt-1">
                  MDPI-Digital Mental Health: Changes, Challenges and Success Strategies. July 12, 2024.
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                <h3 className="text-lg font-semibold">High Altitude, Air Travel, and Heart Disease</h3>
                <p className="text-muted-foreground mt-1">UpToDate. March 22, 2023.</p>
              </div>

              <div className="mt-6 text-center">
                <Link
                  href="/research#publications"
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                >
                  View all publications
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <section aria-labelledby="memberships-heading" className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
            <h2 id="memberships-heading" className="text-2xl font-bold mb-6 text-primary border-b pb-2">
              Memberships
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                <h3 className="text-lg font-semibold">American Heart Association</h3>
                <p className="text-muted-foreground">Member (2020–Present)</p>
              </div>

              <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                <h3 className="text-lg font-semibold">American Medical Association</h3>
                <p className="text-muted-foreground">Member (2014–Present)</p>
              </div>

              <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                <h3 className="text-lg font-semibold">True Health Initiative</h3>
                <p className="text-muted-foreground">Council of Directors (2010–Present)</p>
              </div>

              <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                <h3 className="text-lg font-semibold">American College of Physicians</h3>
                <p className="text-muted-foreground">Associate Member (2002–Present)</p>
              </div>

              <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                <h3 className="text-lg font-semibold">Harris County Medical Society (HCMS)</h3>
                <p className="text-muted-foreground">Member (2002–Present)</p>
                <p className="text-muted-foreground">Western Branch President (2017–2018)</p>
                <p className="text-muted-foreground">HITS committee (2019–Present)</p>
              </div>

              <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                <h3 className="text-lg font-semibold">Texas Medical Association (TMA)</h3>
                <p className="text-muted-foreground">Member (2002–Present)</p>
                <p className="text-muted-foreground">Alternate Delegate (2018)</p>
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <section aria-labelledby="media-heading" className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
            <h2 id="media-heading" className="text-2xl font-bold mb-6 text-primary border-b pb-2">
              Media Appearances
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md flex flex-col sm:flex-row justify-between">
                <div>
                  <h3 className="text-lg font-semibold">"Ask The Expert: Heart Attack Risk Factors"</h3>
                  <p className="text-sm text-foreground/70">KHOU Houston Channel 11</p>
                </div>
                <span className="text-muted-foreground font-medium mt-1 sm:mt-0">2018</span>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md flex flex-col sm:flex-row justify-between">
                <div>
                  <h3 className="text-lg font-semibold">"Digital Therapeutics and Telemedicine in Health Care 2.0"</h3>
                  <p className="text-sm text-foreground/70">McGraw Hill HQ</p>
                </div>
                <span className="text-muted-foreground font-medium mt-1 sm:mt-0">2018</span>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md flex flex-col sm:flex-row justify-between">
                <div>
                  <h3 className="text-lg font-semibold">"Wearables and Wellness"</h3>
                  <p className="text-sm text-foreground/70">Fox and Friends National TV, Fox News NY Studios</p>
                </div>
                <span className="text-muted-foreground font-medium mt-1 sm:mt-0">2016</span>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md flex flex-col sm:flex-row justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    "The Doctor Will Virtually See You Now: Telemedicine's Rise In Health Care"
                  </h3>
                  <p className="text-sm text-foreground/70">ReachMD</p>
                </div>
                <span className="text-muted-foreground font-medium mt-1 sm:mt-0">2016</span>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md flex flex-col sm:flex-row justify-between">
                <div>
                  <h3 className="text-lg font-semibold">"Sudden Cardiac Death in Adolescents"</h3>
                  <p className="text-sm text-foreground/70">The Dr. Oz Show</p>
                </div>
                <span className="text-muted-foreground font-medium mt-1 sm:mt-0">2010</span>
              </div>

              <div className="mt-6 text-center">
                <Link href="/media" className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
                  View all media appearances
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <div className="mt-8 pt-4 border-t text-center flex flex-col items-center">
            <p className="text-muted-foreground mb-4">
              For a complete curriculum vitae, please download the PDF version.
            </p>
            <Link
              href="https://www.dropbox.com/scl/fi/d1ui1irwfj44wb7q7dozl/Asif-Ali-CV-August-2024.docx.pdf?rlkey=v8mdrt44wju8jr5sylebz0ppb&dl=0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="flex items-center gap-2" aria-label="Download complete CV as PDF">
                <Download size={16} className="mr-1" />
                Download Complete CV
              </Button>
            </Link>
          </div>
        </FadeInSection>
      </div>
    </main>
  )
}
