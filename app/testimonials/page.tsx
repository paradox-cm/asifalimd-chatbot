import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Award, Stethoscope, GraduationCap, Heart } from "lucide-react"
import FadeInSection from "@/components/fade-in-section"

export default function TestimonialsPage() {
  return (
    <div className="flex flex-col divide-y divide-border">
      {/* Title Block + Intro */}
      <section className="w-full py-16 md:py-20 px-4 bg-background" aria-label="Testimonials Introduction">
        <div className="container mx-auto px-4" style={{ maxWidth: "1160px" }}>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-foreground">
            Testimonials
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-6">Peer, Collaborator, and Patient Testimonials</p>
          <p className="text-lg md:text-xl text-foreground/70 mb-8 border-l-4 border-clinical-500 pl-4 py-2">
            Across medicine, research, and innovation, Dr. Asif Ali is recognized for his clinical expertise,
            leadership, mentorship, and commitment to patient care.
          </p>
        </div>
      </section>

      {/* Tabbed Testimonials Section */}
      <section className="w-full py-16 px-4 bg-background" aria-label="Testimonial Categories">
        <div className="container mx-auto px-4" style={{ maxWidth: "1160px" }}>
          <Tabs defaultValue="leadership" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6 gap-1">
              <TabsTrigger
                value="leadership"
                className="text-xs sm:text-sm md:text-base py-2 data-[state=active]:bg-clinical-100 dark:data-[state=active]:bg-clinical-900/30 data-[state=active]:text-clinical-700 dark:data-[state=active]:text-clinical-400 flex items-center gap-1 sm:gap-2"
              >
                <Award className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="truncate">Leadership</span>
              </TabsTrigger>
              <TabsTrigger
                value="clinical"
                className="text-xs sm:text-sm md:text-base py-2 data-[state=active]:bg-clinical-100 dark:data-[state=active]:bg-clinical-900/30 data-[state=active]:text-clinical-700 dark:data-[state=active]:text-clinical-400 flex items-center gap-1 sm:gap-2"
              >
                <Stethoscope className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="truncate">Clinical</span>
              </TabsTrigger>
              <TabsTrigger
                value="mentorship"
                className="text-xs sm:text-sm md:text-base py-2 data-[state=active]:bg-clinical-100 dark:data-[state=active]:bg-clinical-900/30 data-[state=active]:text-clinical-700 dark:data-[state=active]:text-clinical-400 flex items-center gap-1 sm:gap-2"
              >
                <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="truncate">Mentorship</span>
              </TabsTrigger>
              <TabsTrigger
                value="patients"
                className="text-xs sm:text-sm md:text-base py-2 data-[state=active]:bg-clinical-100 dark:data-[state=active]:bg-clinical-900/30 data-[state=active]:text-clinical-700 dark:data-[state=active]:text-clinical-400 flex items-center gap-1 sm:gap-2"
              >
                <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="truncate">Patients</span>
              </TabsTrigger>
            </TabsList>

            {/* Leadership & Innovation Tab */}
            <TabsContent value="leadership" className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                Leadership, Innovation, and Strategy
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FadeInSection delay={100}>
                  <Card className="hover:border-clinical-400 h-full">
                    <CardContent className="p-6">
                      <div className="text-3xl text-clinical-500 dark:text-clinical-400 mb-4">"</div>
                      <blockquote className="mb-6">
                        <p className="text-lg italic text-foreground/80 mb-4">
                          I've had the pleasure of knowing and working with Dr. Ali, and he's someone anyone would want
                          in their corner. He's what you'd call a 'doctorpreneur' because of his ability to combine his
                          business knowledge with his medical expertise. He is skilled in producing meaningful
                          connections, as well as developing strategies for both company growth and research
                          opportunities. He has high integrity and is very evidence and data driven.
                        </p>
                        <footer className="text-foreground/60 font-medium">
                          <span className="block font-semibold text-foreground">Christy Lamka</span>
                          <span>Chief Operating Officer & Co-Founder at Thrive360</span>
                        </footer>
                      </blockquote>
                    </CardContent>
                  </Card>
                </FadeInSection>

                <FadeInSection delay={200}>
                  <Card className="hover:border-clinical-400 h-full">
                    <CardContent className="p-6">
                      <div className="text-3xl text-clinical-500 dark:text-clinical-400 mb-4">"</div>
                      <blockquote className="mb-6">
                        <p className="text-lg italic text-foreground/80 mb-4">
                          As President & CEO of PLx Pharma, I had the honor of working with Dr. Ali on key projects. His
                          extensive network and influence in the cardiovascular community provided invaluable strategic
                          advice to our leadership team. He's passionate about education, highly creative, energetic,
                          and a true leader among his peers.
                        </p>
                        <footer className="text-foreground/60 font-medium">
                          <span className="block font-semibold text-foreground">Natasha Giordano</span>
                          <span>President & CEO, PLx Pharma</span>
                        </footer>
                      </blockquote>
                    </CardContent>
                  </Card>
                </FadeInSection>

                <FadeInSection delay={300}>
                  <Card className="hover:border-clinical-400 h-full">
                    <CardContent className="p-6">
                      <div className="text-3xl text-clinical-500 dark:text-clinical-400 mb-4">"</div>
                      <blockquote className="mb-6">
                        <p className="text-lg italic text-foreground/80 mb-4">
                          Dr. Ali was the founding member of our Medical Advisory Board at Revive Solutions. He
                          consistently delivered exceptional clinical insight, introduced us to key stakeholders, and
                          played a crucial role in our business development. His integrity, clinical acumen, and network
                          are unparalleled.
                        </p>
                        <footer className="text-foreground/60 font-medium">
                          <span className="block font-semibold text-foreground">Sameer Jafri</span>
                          <span>CEO at Avive Solutions | Forbes 30 Under 30</span>
                        </footer>
                      </blockquote>
                    </CardContent>
                  </Card>
                </FadeInSection>

                <FadeInSection delay={400}>
                  <Card className="hover:border-clinical-400 h-full">
                    <CardContent className="p-6">
                      <div className="text-3xl text-clinical-500 dark:text-clinical-400 mb-4">"</div>
                      <blockquote className="mb-6">
                        <p className="text-lg italic text-foreground/80 mb-4">
                          Dr. Ali is not only a phenomenal physician but also a visionary physician entrepreneur. I have
                          had the honor of his mentorship and look forward to seeing his continued leadership in
                          health-tech, wellness, and research.
                        </p>
                        <footer className="text-foreground/60 font-medium">
                          <span className="block font-semibold text-foreground">Abubakr C.</span>
                          <span>Chair of Medicine, Northside Hospital Network</span>
                        </footer>
                      </blockquote>
                    </CardContent>
                  </Card>
                </FadeInSection>
              </div>
            </TabsContent>

            {/* Clinical Excellence Tab */}
            <TabsContent value="clinical" className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                Clinical Excellence and Patient-Centric Care
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FadeInSection delay={100}>
                  <Card className="hover:border-clinical-400 h-full">
                    <CardContent className="p-6">
                      <div className="text-3xl text-clinical-500 dark:text-clinical-400 mb-4">"</div>
                      <blockquote className="mb-6">
                        <p className="text-lg italic text-foreground/80 mb-4">
                          I have known Dr. Ali for three years—he's that good. His reputation among physicians is
                          matched only by his medical knowledge and intuition. He listens, he cares, and he is globally
                          respected as a preventative cardiologist.
                        </p>
                        <footer className="text-foreground/60 font-medium">
                          <span className="block font-semibold text-foreground">John Maisonville</span>
                          <span>Practice Manager & Medical Laser Tech</span>
                        </footer>
                      </blockquote>
                    </CardContent>
                  </Card>
                </FadeInSection>

                <FadeInSection delay={200}>
                  <Card className="hover:border-clinical-400 h-full">
                    <CardContent className="p-6">
                      <div className="text-3xl text-clinical-500 dark:text-clinical-400 mb-4">"</div>
                      <blockquote className="mb-6">
                        <p className="text-lg italic text-foreground/80 mb-4">
                          Dr. Ali's dedication to preventive cardiology, his firm clinical judgment, and his constant
                          drive to advance patient care make him an extraordinary mentor and clinician. Observing under
                          him was one of the best steps I took toward residency.
                        </p>
                        <footer className="text-foreground/60 font-medium">
                          <span className="block font-semibold text-foreground">Rijo John, MD</span>
                        </footer>
                      </blockquote>
                    </CardContent>
                  </Card>
                </FadeInSection>

                <FadeInSection delay={300}>
                  <Card className="hover:border-clinical-400 h-full">
                    <CardContent className="p-6">
                      <div className="text-3xl text-clinical-500 dark:text-clinical-400 mb-4">"</div>
                      <blockquote className="mb-6">
                        <p className="text-lg italic text-foreground/80 mb-4">
                          It was clear even during residency that Dr. Ali was destined to be a standout cardiologist.
                          His organization, professionalism, and bedside manner set him apart from day one.
                        </p>
                        <footer className="text-foreground/60 font-medium">
                          <span className="block font-semibold text-foreground">Theresia Jaco</span>
                          <span>Certified Cardiac Sonographer</span>
                        </footer>
                      </blockquote>
                    </CardContent>
                  </Card>
                </FadeInSection>

                <FadeInSection delay={400}>
                  <Card className="hover:border-clinical-400 h-full">
                    <CardContent className="p-6">
                      <div className="text-3xl text-clinical-500 dark:text-clinical-400 mb-4">"</div>
                      <blockquote className="mb-6">
                        <p className="text-lg italic text-foreground/80 mb-4">
                          Dr. Asif Ali is an excellent cardiologist, a superb researcher, and a great manager. It's a
                          pleasure to work alongside him.
                        </p>
                        <footer className="text-foreground/60 font-medium">
                          <span className="block font-semibold text-foreground">
                            John P. Higgins, MD, MBA (GWU), MPHIL (Cantab)
                          </span>
                          <span>Sports Cardiologist at Memorial Hermann and UTHealth McGovern Medical School</span>
                        </footer>
                      </blockquote>
                    </CardContent>
                  </Card>
                </FadeInSection>
              </div>
            </TabsContent>

            {/* Mentorship & Education Tab */}
            <TabsContent value="mentorship" className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                Mentorship, Education, and Human Impact
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FadeInSection delay={100}>
                  <Card className="hover:border-clinical-400 h-full">
                    <CardContent className="p-6">
                      <div className="text-3xl text-clinical-500 dark:text-clinical-400 mb-4">"</div>
                      <blockquote className="mb-6">
                        <p className="text-lg italic text-foreground/80 mb-4">
                          Dr. Ali changed my life. He was not only my mentor during clinical rotations but also shaped
                          my understanding of what it means to be a compassionate and analytical physician. His
                          leadership extends beyond cardiology into patient education and career development.
                        </p>
                        <footer className="text-foreground/60 font-medium">
                          <span className="block font-semibold text-foreground">Mohamed Koronfel</span>
                          <span>Interventional Pain Specialist & Medical Director</span>
                        </footer>
                      </blockquote>
                    </CardContent>
                  </Card>
                </FadeInSection>

                <FadeInSection delay={200}>
                  <Card className="hover:border-clinical-400 h-full">
                    <CardContent className="p-6">
                      <div className="text-3xl text-clinical-500 dark:text-clinical-400 mb-4">"</div>
                      <blockquote className="mb-6">
                        <p className="text-lg italic text-foreground/80 mb-4">
                          Dr. Asif Ali is an outstanding teacher and physician. As an international graduate, his
                          mentorship gave me clarity for the USMLE and for practicing medicine in the U.S. His approach
                          to communication and patient care is transformative.
                        </p>
                        <footer className="text-foreground/60 font-medium">
                          <span className="block font-semibold text-foreground">Meraj Ahmed, MD</span>
                        </footer>
                      </blockquote>
                    </CardContent>
                  </Card>
                </FadeInSection>

                <FadeInSection delay={300}>
                  <Card className="hover:border-clinical-400 h-full">
                    <CardContent className="p-6">
                      <div className="text-3xl text-clinical-500 dark:text-clinical-400 mb-4">"</div>
                      <blockquote className="mb-6">
                        <p className="text-lg italic text-foreground/80 mb-4">
                          Dr. Ali's knowledge of cardiology and clinical judgment is exceptional. His ability to build
                          trust with patients and his focus on education makes him a rare combination of clinician and
                          mentor.
                        </p>
                        <footer className="text-foreground/60 font-medium">
                          <span className="block font-semibold text-foreground">Mohammad Saud Khan</span>
                          <span>Interventional Cardiology Fellow</span>
                        </footer>
                      </blockquote>
                    </CardContent>
                  </Card>
                </FadeInSection>

                <FadeInSection delay={400}>
                  <Card className="hover:border-clinical-400 h-full">
                    <CardContent className="p-6">
                      <div className="text-3xl text-clinical-500 dark:text-clinical-400 mb-4">"</div>
                      <blockquote className="mb-6">
                        <p className="text-lg italic text-foreground/80 mb-4">
                          Dr. Ali taught me not only cardiology but how to think and communicate like a physician. His
                          support was pivotal during my CS exam and continues to influence my clinical career.
                        </p>
                        <footer className="text-foreground/60 font-medium">
                          <span className="block font-semibold text-foreground">Walid Hassaballa, MD</span>
                        </footer>
                      </blockquote>
                    </CardContent>
                  </Card>
                </FadeInSection>
              </div>
            </TabsContent>

            {/* Patient Testimonials Tab */}
            <TabsContent value="patients" className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                Patient Perspective and Long-Term Trust
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FadeInSection delay={100}>
                  <Card id={`patient-1`} className="hover:border-clinical-400 transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className="text-3xl text-clinical-500 dark:text-clinical-400 mb-4">"</div>
                      <blockquote className="mb-6">
                        <p className="text-lg italic text-foreground/80 mb-4">
                          Dr. Ali's intelligence, kindness, and commitment to personal patient care were critical to my
                          husband's recovery. His combination of old-fashioned TLC with modern medical knowledge sets
                          him apart. We give Dr. Ali our highest recommendation.
                        </p>
                        <footer className="text-foreground/60 font-medium">
                          <span className="block font-semibold text-foreground">Ellen I. Goldberg</span>
                          <span>Director Emeritus, Sister Cities of Houston</span>
                        </footer>
                      </blockquote>
                    </CardContent>
                  </Card>
                </FadeInSection>

                <FadeInSection delay={300}>
                  <Card id={`patient-3`} className="hover:border-clinical-400 transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className="text-3xl text-clinical-500 dark:text-clinical-400 mb-4">"</div>
                      <blockquote className="mb-6">
                        <p className="text-lg italic text-foreground/80 mb-4">
                          Dr. Ali has been my cardiologist for almost three years, and I owe him everything. He has been
                          there for me more than any doctor I've had over the years.
                        </p>
                        <footer className="text-foreground/60 font-medium">
                          <span className="block font-semibold text-foreground">Patient</span>
                          <a
                            href="https://www.yelp.com/biz/ali-abdul-md-houston"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-clinical-600 hover:text-clinical-800 dark:text-clinical-400 dark:hover:text-clinical-300 transition-colors"
                          >
                            Yelp Review
                          </a>
                        </footer>
                      </blockquote>
                    </CardContent>
                  </Card>
                </FadeInSection>

                <FadeInSection delay={400}>
                  <Card id={`patient-4`} className="hover:border-clinical-400 transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className="text-3xl text-clinical-500 dark:text-clinical-400 mb-4">"</div>
                      <blockquote className="mb-6">
                        <p className="text-lg italic text-foreground/80 mb-4">
                          Dr. Ali took my unusual symptoms and made a quick diagnosis of a pretty rare disease which
                          numerous other doctors were perplexed by. Couldn't be more grateful.
                        </p>
                        <footer className="text-foreground/60 font-medium">
                          <span className="block font-semibold text-foreground">Patient</span>
                          <a
                            href="https://www.vitals.com/doctors/Dr_Asif_Ali.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-clinical-600 hover:text-clinical-800 dark:text-clinical-400 dark:hover:text-clinical-300 transition-colors"
                          >
                            Vitals Review
                          </a>
                        </footer>
                      </blockquote>
                    </CardContent>
                  </Card>
                </FadeInSection>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA / Inquiry Block */}
      <section className="w-full py-16 px-4 bg-background" aria-label="Contact CTA">
        <div className="container mx-auto px-4" style={{ maxWidth: "1160px" }}>
          <Card>
            <CardContent className="p-4 sm:p-6 md:p-8 text-center">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">
                Interested in working with Dr. Ali?
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-foreground/70 mb-4 sm:mb-6 max-w-2xl mx-auto">
                Whether you're seeking clinical care, a research collaboration, or strategic advisory services, Dr. Ali
                is committed to excellence in every engagement.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Link href="/clinical" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Clinical Services
                  </Button>
                </Link>
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button className="flex items-center justify-center gap-2 w-full sm:w-auto">
                    Contact & Collaborate
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
