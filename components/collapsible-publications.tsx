"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, BookOpen, FlaskRound } from "lucide-react"

export default function CollapsiblePublications() {
  const isExpanded = true

  return (
    <section id="publications" className="w-full bg-background" aria-label="Publications">
      <div className="container mx-auto px-2 sm:px-3 md:px-4" style={{ maxWidth: "1160px" }}>
        {isExpanded && (
          <div id="publications-content" className="transition-all duration-300 origin-top">
            <div className="border-2 border-border rounded-lg bg-card mb-10 mt-6 overflow-hidden">
              <Tabs defaultValue="articles" className="w-full">
                <div className="px-3 sm:px-4 md:px-6 pt-4 sm:pt-5 md:pt-6">
                  <TabsList className="grid w-full grid-cols-3 bg-muted/50 dark:bg-muted/20 rounded-t-lg border-b border-border p-1">
                    <TabsTrigger
                      className="text-sm md:text-base rounded-md transition-all duration-200 hover:bg-background/80 hover:text-foreground data-[state=active]:bg-clinical-100 dark:data-[state=active]:bg-clinical-900/30 data-[state=active]:text-clinical-700 dark:data-[state=active]:text-clinical-400 data-[state=active]:font-medium data-[state=active]:shadow-sm"
                      value="articles"
                    >
                      <FileText className="h-4 w-4 mr-2 hidden md:inline" />
                      Journal Articles
                    </TabsTrigger>
                    <TabsTrigger
                      className="text-sm md:text-base rounded-md transition-all duration-200 hover:bg-background/80 hover:text-foreground data-[state=active]:bg-clinical-100 dark:data-[state=active]:bg-clinical-900/30 data-[state=active]:text-clinical-700 dark:data-[state=active]:text-clinical-400 data-[state=active]:font-medium data-[state=active]:shadow-sm"
                      value="books"
                    >
                      <BookOpen className="h-4 w-4 mr-2 hidden md:inline" />
                      Textbooks
                    </TabsTrigger>
                    <TabsTrigger
                      className="text-sm md:text-base rounded-md transition-all duration-200 hover:bg-background/80 hover:text-foreground data-[state=active]:bg-clinical-100 dark:data-[state=active]:bg-clinical-900/30 data-[state=active]:text-clinical-700 dark:data-[state=active]:text-clinical-400 data-[state=active]:font-medium data-[state=active]:shadow-sm"
                      value="trials"
                    >
                      <FlaskRound className="h-4 w-4 mr-2 hidden md:inline" />
                      Clinical Trials
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="articles" className="p-3 sm:p-4 md:p-6 pt-2 sm:pt-3 md:pt-4">
                  <ul className="space-y-4 sm:space-y-6">
                    {[
                      {
                        title:
                          "Circle of Vieussens: Its Importance in the Presence of Significant Coronary Artery Stenosis in a 26-Year-Old Female With Kawasaki Disease",
                        journal: "Cureus",
                        date: "August 2024",
                      },
                      {
                        title: "Mal De Debarquement Syndrome: An Often Unrecognized and Unreported Condition",
                        journal: "Cureus",
                        date: "July 2024",
                      },
                      {
                        title:
                          "Brief Review and Primer of Key Terminology for Artificial Intelligence and Machine Learning in Hypertension",
                        journal: "Hypertension – American Heart Association Journals",
                        date: "July 16, 2024",
                      },
                      {
                        title:
                          "Mental Health Applications of Generative AI and Large Language Modeling in the United States",
                        journal: "MDPI – Digital Mental Health",
                        date: "July 12, 2024",
                      },
                      {
                        title: "High Altitude, Air Travel, and Heart Disease",
                        journal: "UpToDate",
                        date: "March 22, 2023",
                      },
                      {
                        title:
                          "Consumption of Energy Beverage is Associated With an Attenuation of Arterial Endothelial Flow-Mediated Dilatation",
                        journal: "AHA Abstract #519",
                        date: "March 17, 2018",
                      },
                      {
                        title:
                          "Community Cardiovascular Screening to Identify Middle School Children at Risk of Sudden Cardiac Death: The HEARTS Study",
                        journal: "Journal of Child & Adolescent Behavior",
                        date: "February 23, 2015",
                      },
                      {
                        title: "Brugada Syndrome in a Black Man with Seizures and Urinary Incontinence",
                        journal: "Texas Heart Institute Journal",
                        date: "January 1, 2006",
                      },
                    ].map((article, index) => (
                      <li
                        key={index}
                        className="border-l-2 border-clinical-200 dark:border-clinical-800 pl-3 sm:pl-4 py-1 transition-all duration-300 hover:border-clinical-500"
                      >
                        <h3 className="text-lg font-medium text-foreground mb-1 italic">{article.title}</h3>
                        <p className="text-sm text-foreground/60 flex items-center gap-2">
                          <span className="font-medium text-clinical-600 dark:text-clinical-400">
                            {article.journal}
                          </span>
                          <span className="inline-block h-1 w-1 rounded-full bg-foreground/30"></span>
                          <span>{article.date}</span>
                        </p>
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="books" className="p-3 sm:p-4 md:p-6 pt-2 sm:pt-3 md:pt-4">
                  <ul className="space-y-4 sm:space-y-6">
                    {[
                      {
                        title: "Clinical Questions: Cardiology, 2nd Edition",
                        publisher: "McGraw-Hill Education / Medical",
                        date: "December 27, 2016",
                      },
                      {
                        title: "Clinical Questions: Cardiology, 1st Edition",
                        publisher: "McGraw-Hill Education / Medical",
                        date: "November 24, 2011",
                      },
                    ].map((book, index) => (
                      <li
                        key={index}
                        className="border-l-2 border-clinical-200 dark:border-clinical-800 pl-3 sm:pl-4 py-1 transition-all duration-300 hover:border-clinical-500"
                      >
                        <h3 className="text-lg font-medium text-foreground mb-1">{book.title}</h3>
                        <p className="text-sm text-foreground/60 flex items-center gap-2">
                          <span className="font-medium text-clinical-600 dark:text-clinical-400">{book.publisher}</span>
                          <span className="inline-block h-1 w-1 rounded-full bg-foreground/30"></span>
                          <span>{book.date}</span>
                        </p>
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="trials" className="p-3 sm:p-4 md:p-6 pt-2 sm:pt-3 md:pt-4">
                  <ul className="space-y-4 sm:space-y-6">
                    {[
                      {
                        title: "Valencell (2023)",
                        description: "Fingertip and Wrist Blood Pressure Data Collection in Older Adults",
                      },
                      {
                        title: "EECP Retrospective Trial (2022–2023)",
                        description: "Effects of Enhanced External Counterpulsation on BP and Heart Rate",
                      },
                      {
                        title: "Thrive360 (2022–2023)",
                        description: "VR-based CBT for Hypertension in Outpatient Cardiovascular Care",
                      },
                      {
                        title: "Target BP – Global Phase 3 Clinical Trial (2019–2022)",
                        description: "Ablative Solutions Renal Denervation Study",
                      },
                    ].map((trial, index) => (
                      <li
                        key={index}
                        className="border-l-2 border-clinical-200 dark:border-clinical-800 pl-3 sm:pl-4 py-1 transition-all duration-300 hover:border-clinical-500"
                      >
                        <h3 className="text-lg font-medium text-foreground mb-1">{trial.title}</h3>
                        <p className="text-sm text-foreground/70">{trial.description}</p>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <Link href="/cv">
                <Button className="bg-clinical-600 hover:bg-clinical-700 text-white transition-all duration-300">
                  View CV
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
