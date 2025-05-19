"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Check, Brain, Heart, Activity, Tablet } from "lucide-react"
import FadeInSection from "./fade-in-section"

interface CaseStudy {
  id: string
  title: string
  role: string
  period: string
  focus: string
  impacts: string[]
  icon: "brain" | "heart" | "activity" | "tablet"
  color: "clinical" | "blue" | "purple"
}

export default function CaseStudiesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [maxIndex, setMaxIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(2.5)
  const carouselRef = useRef<HTMLDivElement>(null)

  const caseStudies: CaseStudy[] = [
    {
      id: "qardio",
      title: "Qardio – Global Clinical Strategy for Remote Monitoring",
      role: "Chief Medical Officer",
      period: "2022–2024",
      focus:
        "Dr. Ali led the clinical validation strategy for Qardio's remote cardiac monitoring devices and digital rehab programs, supporting FDA engagement and physician adoption pathways.",
      impacts: [
        "Helped align product with CPT code reimbursement",
        "Provided clinical workflows for PCP + cardiology integration",
        "Represented company at conferences and investor demos",
        "Co-authored white papers on digital hypertension management",
      ],
      icon: "brain",
      color: "clinical",
    },
    {
      id: "healthseers",
      title: "Healthseers / Cardio – Diagnostic AI for Hidden Heart Disease",
      role: "Chief Medical Officer",
      period: "2024–Present",
      focus:
        "Working with an AI-driven phonocardiography company, Dr. Ali shaped the clinical use case, data labeling criteria, and go-to-market path for underserved populations.",
      impacts: [
        "Designed inclusion protocol for clinical study",
        "Ensured equity in diagnostic thresholds across populations",
        "Advised on FDA predicate mapping",
        "Helped company transition from lab prototype to pilot deployment in clinics",
      ],
      icon: "heart",
      color: "clinical",
    },
    {
      id: "fitbit",
      title: "Fitbit – Wearables Strategy & Patient Engagement",
      role: "Medical Advisor",
      period: "2016–2018",
      focus:
        "Dr. Ali worked with Fitbit's healthcare team to explore clinical use cases for wearables in chronic disease management and preventive cardiology.",
      impacts: [
        "Helped frame use cases for heart rate and activity tracking in clinical preventive care",
        "Provided medical feedback on user experience and alert fatigue",
        "Co-developed physician education modules",
        "Advised on positioning devices for population health pilots",
      ],
      icon: "activity",
      color: "blue",
    },
    {
      id: "thrive360",
      title: "Thrive360 – VR-Based CBT for Cardiovascular Patients",
      role: "Chief Medical Officer",
      period: "2021–2023",
      focus:
        "Led medical strategy for a VR behavioral therapy platform targeting outpatient hypertension and mental health integration.",
      impacts: [
        "Designed outcome measures for BP-focused pilot",
        "Built provider onboarding flow",
        "Co-led a retrospective study on VR effectiveness",
        "Created patient education materials for digital literacy",
      ],
      icon: "tablet",
      color: "purple",
    },
  ]

  // Update items per view and max index based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(1.5)
      } else {
        setItemsPerView(2.5)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Update max index when items per view changes
  useEffect(() => {
    setMaxIndex(Math.max(0, caseStudies.length - Math.floor(itemsPerView)))
  }, [itemsPerView, caseStudies.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  const getIconComponent = (iconName: string, color: string) => {
    const iconProps = {
      className: `h-6 w-6 text-${color}-600 dark:text-${color}-400`,
    }

    switch (iconName) {
      case "brain":
        return <Brain {...iconProps} />
      case "heart":
        return <Heart {...iconProps} />
      case "activity":
        return <Activity {...iconProps} />
      case "tablet":
        return <Tablet {...iconProps} />
      default:
        return <Brain {...iconProps} />
    }
  }

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="overflow-hidden" ref={carouselRef} aria-live="polite" aria-roledescription="carousel">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
        >
          {caseStudies.map((study, index) => (
            <div
              key={study.id}
              className="flex-shrink-0 px-4"
              style={{ width: `${100 / itemsPerView}%` }}
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${caseStudies.length}`}
            >
              <FadeInSection delay={100 * (index + 1)}>
                <div className="border-2 border-border p-8 rounded-lg bg-card hover:border-clinical-400 transition-all duration-300 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`bg-${study.color}-100 dark:bg-${study.color}-900/50 p-3 rounded-full`}>
                      {getIconComponent(study.icon, study.color)}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{study.title}</h3>
                  </div>

                  <div className="mb-4">
                    <p className="text-foreground/80 font-medium">
                      Role: {study.role} ({study.period})
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-medium mb-2 text-foreground">Focus:</h4>
                    <p className="text-foreground/70">{study.focus}</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium mb-3 text-foreground">Impact:</h4>
                    <ul className="space-y-2">
                      {study.impacts.map((impact, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className={`h-5 w-5 text-${study.color}-500 mt-0.5 flex-shrink-0`} />
                          <span className="text-foreground/70">{impact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeInSection>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        disabled={currentIndex === 0}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-background/80 dark:bg-card/80 backdrop-blur-sm p-3 rounded-full border border-border hover:bg-card transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed z-10"
        aria-label="Previous case study"
      >
        <ChevronLeft className="h-6 w-6 text-foreground/70" />
      </button>

      <button
        onClick={goToNext}
        disabled={currentIndex >= maxIndex}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-background/80 dark:bg-card/80 backdrop-blur-sm p-3 rounded-full border border-border hover:bg-card transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed z-10"
        aria-label="Next case study"
      >
        <ChevronRight className="h-6 w-6 text-foreground/70" />
      </button>

      {/* Pagination Indicators */}
      <div className="flex justify-center mt-8 gap-2">
        {caseStudies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-clinical-600 w-6" : "bg-foreground/20 w-2 hover:bg-foreground/40"
            }`}
            aria-label={`Go to case study ${index + 1}`}
            aria-current={index === currentIndex ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  )
}
