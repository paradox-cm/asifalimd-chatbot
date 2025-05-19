"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight, ExternalLink, Award, Heart, ArrowRight } from "lucide-react"
import { testimonials } from "@/data/testimonials"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import FadeInSection from "./fade-in-section"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export default function TestimonialCarousel() {
  // Filter testimonials by type
  const featuredPatientTestimonials = testimonials.filter((t) => t.featured)
  const peerTestimonials = testimonials.filter((t) => !t.featured && !t.source)

  // State for patient testimonial carousel
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Auto-advance the carousel with improved handling
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      if (!isAnimating) {
        goToNext()
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [currentIndex, isAnimating, isPaused])

  // Pause carousel on hover or focus
  const pauseCarousel = useCallback(() => {
    setIsPaused(true)
  }, [])

  // Resume carousel when mouse leaves or focus is lost
  const resumeCarousel = useCallback(() => {
    setIsPaused(false)
  }, [])

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!carouselRef.current) return

      // Only handle keyboard events when the carousel has focus
      if (!carouselRef.current.contains(document.activeElement)) return

      switch (e.key) {
        case "ArrowLeft":
          goToPrevious()
          break
        case "ArrowRight":
          goToNext()
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const goToPrevious = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? featuredPatientTestimonials.length - 1 : prevIndex - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating, featuredPatientTestimonials.length])

  const goToNext = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex === featuredPatientTestimonials.length - 1 ? 0 : prevIndex + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating, featuredPatientTestimonials.length])

  const goToIndex = useCallback(
    (index: number) => {
      if (isAnimating || index === currentIndex) return
      setIsAnimating(true)
      setCurrentIndex(index)
      setTimeout(() => setIsAnimating(false), 500)
    },
    [isAnimating, currentIndex],
  )

  return (
    <section className="w-full py-12 md:py-16 px-2 md:px-4 bg-background" aria-label="Testimonials">
      <div className="container mx-auto px-2 md:px-4" style={{ maxWidth: "1160px" }}>
        <FadeInSection>
          <Tabs defaultValue="patients" className="w-full">
            <TabsList className="w-full mb-6 grid-cols-2">
              <TabsTrigger
                value="patients"
                className="text-xs sm:text-sm md:text-base py-2 data-[state=active]:bg-clinical-100 dark:data-[state=active]:bg-clinical-900/30 data-[state=active]:text-clinical-700 dark:data-[state=active]:text-clinical-400"
              >
                <Heart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span>Patient Testimonials</span>
              </TabsTrigger>
              <TabsTrigger
                value="peers"
                className="text-xs sm:text-sm md:text-base py-2 data-[state=active]:bg-clinical-100 dark:data-[state=active]:bg-clinical-900/30 data-[state=active]:text-clinical-700 dark:data-[state=active]:text-clinical-400"
              >
                <Award className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span>Peer & Industry</span>
              </TabsTrigger>
            </TabsList>

            {/* Peer & Industry Testimonials */}
            <TabsContent value="peers" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {peerTestimonials.slice(0, 3).map((testimonial) => (
                  <Card key={testimonial.id} className="hover:border-clinical-400 h-full">
                    <CardContent className="p-4 sm:p-6">
                      <div className="text-2xl sm:text-3xl text-clinical-500 dark:text-clinical-400 mb-3 sm:mb-4">
                        "
                      </div>
                      <blockquote className="mb-4 sm:mb-6">
                        <p className="text-sm sm:text-base md:text-lg italic text-foreground/80 mb-3 sm:mb-4">
                          {testimonial.quote.length > 200
                            ? `${testimonial.quote.substring(0, 200)}...`
                            : testimonial.quote}
                        </p>
                        <Link
                          href={`/testimonials#peer-${testimonial.id}`}
                          className="text-xs sm:text-sm text-clinical-600 hover:text-clinical-800 dark:text-clinical-400 dark:hover:text-clinical-300 inline-flex items-center gap-1 mb-3"
                        >
                          View full quote <ArrowRight className="h-3 w-3" />
                        </Link>
                        <footer className="text-foreground/60 font-medium text-xs sm:text-sm">
                          <span className="block font-semibold text-foreground">{testimonial.author}</span>
                          {testimonial.role && <span>{testimonial.role}</span>}
                        </footer>
                      </blockquote>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Patient Testimonials Carousel */}
            <TabsContent value="patients">
              <div
                className="relative"
                ref={carouselRef}
                onMouseEnter={pauseCarousel}
                onMouseLeave={resumeCarousel}
                onFocus={pauseCarousel}
                onBlur={resumeCarousel}
                role="region"
                aria-roledescription="carousel"
                aria-label="Patient testimonial carousel"
              >
                <Card className="overflow-hidden px-2 sm:px-4 md:px-8">
                  <div
                    className="transition-all duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)`, display: "flex" }}
                    aria-live="polite"
                  >
                    {featuredPatientTestimonials.map((testimonial, index) => (
                      <div
                        key={testimonial.id}
                        className="w-full flex-shrink-0 p-3 sm:p-5 md:p-10"
                        style={{ minWidth: "100%" }}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`${index + 1} of ${featuredPatientTestimonials.length}`}
                        aria-hidden={currentIndex !== index}
                      >
                        <blockquote className="relative">
                          <p className="text-sm sm:text-base md:text-2xl italic text-foreground/80 mb-6">
                            "{testimonial.quote}"
                          </p>
                          <footer className="text-foreground/60 font-medium text-xs sm:text-sm md:text-base">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                              <span className="font-medium text-foreground">— {testimonial.author}</span>
                              {testimonial.role && <span>{testimonial.role}</span>}
                              {testimonial.source && (
                                <a
                                  href={testimonial.source.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 text-clinical-600 hover:text-clinical-800 dark:text-clinical-400 dark:hover:text-clinical-300 transition-colors"
                                >
                                  <span>[{testimonial.source.name}]</span>
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              )}
                            </div>
                          </footer>
                        </blockquote>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Navigation Arrows */}
                <button
                  onClick={goToPrevious}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-background/80 dark:bg-card/80 backdrop-blur-sm p-1 sm:p-1.5 md:p-2 rounded-full border border-border hover:bg-card transition-colors duration-300 z-10"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6 text-foreground/70" />
                </button>

                <button
                  onClick={goToNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-background/80 dark:bg-card/80 backdrop-blur-sm p-1 sm:p-1.5 md:p-2 rounded-full border border-border hover:bg-card transition-colors duration-300 z-10"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6 text-foreground/70" />
                </button>

                {/* Pagination Dots */}
                <div
                  className="flex justify-center mt-4 md:mt-6 gap-1.5 md:gap-2"
                  role="tablist"
                  aria-label="Testimonial slides"
                >
                  {featuredPatientTestimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToIndex(index)}
                      className={`h-2 md:h-2.5 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? "bg-clinical-600 w-5 md:w-6"
                          : "bg-foreground/20 w-2 md:w-2.5 hover:bg-foreground/40"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                      aria-selected={index === currentIndex ? "true" : "false"}
                      role="tab"
                      tabIndex={index === currentIndex ? 0 : -1}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* View All Testimonials CTA */}
          <div className="flex justify-center mt-8">
            <Link href="/testimonials" scroll={true}>
              <Button
                variant="outline"
                className="border-clinical-500 text-clinical-600 hover:bg-clinical-50 hover:text-clinical-700 dark:border-clinical-400 dark:text-clinical-400 dark:hover:bg-clinical-900/30 flex items-center gap-2"
              >
                View All Testimonials
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}
