"use client"

import FadeInSection from "./fade-in-section"

export default function PartnerLogos() {
  return (
    <section className="w-full py-12 md:py-16 px-2 md:px-4 bg-white dark:bg-slate-950/10" aria-label="Trusted By">
      <div className="container mx-auto px-2 md:px-4" style={{ maxWidth: "1160px" }}>
        <FadeInSection>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 place-items-center">
            {/* American Heart Association - Using direct blob URLs */}
            <div className="flex items-center justify-center h-[36px] md:h-[52px] relative">
              {/* Light mode version - hidden in dark mode */}
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AHA-black-fjgojKE9qF1TUDE6VwMwxsl74mBJ2p.png"
                alt="American Heart Association logo"
                className="h-[36px] md:h-[52px] w-auto object-contain block dark:hidden"
              />
              {/* Dark mode version - hidden in light mode */}
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AHA-white-lQJZlaa5wrjbrJVWyNRHQlyf8wHzxI.png"
                alt="American Heart Association logo"
                className="h-[36px] md:h-[52px] w-auto object-contain hidden dark:block"
              />
            </div>

            {/* Texas Heart Institute */}
            <div className="flex items-center justify-center h-[36px] md:h-[52px] relative">
              {/* Light mode version - hidden in dark mode */}
              <img
                src="/images/logos/thi-logo-black.png"
                alt="Texas Heart Institute logo"
                className="h-[36px] md:h-[52px] w-auto object-contain block dark:hidden"
              />
              {/* Dark mode version - hidden in light mode */}
              <img
                src="/images/logos/thi-logo-white.png"
                alt="Texas Heart Institute logo"
                className="h-[36px] md:h-[52px] w-auto object-contain hidden dark:block"
              />
            </div>

            {/* UT Health */}
            <div className="flex items-center justify-center h-[36px] md:h-[52px] relative">
              {/* Light mode version - hidden in dark mode */}
              <img
                src="/images/logos/ut-health-black.png"
                alt="UT Health logo"
                className="h-[36px] md:h-[52px] w-auto object-contain block dark:hidden"
              />
              {/* Dark mode version - hidden in light mode */}
              <img
                src="/images/logos/ut-health-white.png"
                alt="UT Health logo"
                className="h-[36px] md:h-[52px] w-auto object-contain hidden dark:block"
              />
            </div>

            {/* Avive - Same for both modes */}
            <div className="flex items-center justify-center h-[36px] md:h-[52px]">
              <img
                src="/images/logos/avive-logo.png"
                alt="Avive logo"
                className="h-[36px] md:h-[52px] w-auto object-contain"
              />
            </div>

            {/* Fitbit - Same for both modes - REDUCED BY 15% */}
            <div className="flex items-center justify-center h-[36px] md:h-[52px]">
              <img
                src="/images/logos/fitbit-logo.png"
                alt="Fitbit logo"
                className="h-[31px] md:h-[44px] w-auto object-contain"
              />
            </div>

            {/* PLX Pharma */}
            <div className="flex items-center justify-center h-[36px] md:h-[52px] relative">
              {/* Light mode version - hidden in dark mode */}
              <img
                src="/images/logos/plx-logo-black.png"
                alt="PLX Pharma logo"
                className="h-[36px] md:h-[52px] w-auto object-contain block dark:hidden"
              />
              {/* Dark mode version - hidden in light mode */}
              <img
                src="/images/logos/plx-logo-white.png"
                alt="PLX Pharma logo"
                className="h-[36px] md:h-[52px] w-auto object-contain hidden dark:block"
              />
            </div>

            {/* Abbott - Using direct blob URLs - REDUCED BY 15% */}
            <div className="flex items-center justify-center h-[36px] md:h-[52px] relative">
              {/* Light mode version - hidden in dark mode */}
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Abbot-Black-E54sVJv1HMrlNR2QvhSg096vnQzq9r.png"
                alt="Abbott logo"
                className="h-[31px] md:h-[44px] w-auto object-contain block dark:hidden"
              />
              {/* Dark mode version - hidden in light mode */}
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Abbot-White-xBqEjedbxIb7j0hNA1F0gGRlqzi8qY.png"
                alt="Abbott logo"
                className="h-[31px] md:h-[44px] w-auto object-contain hidden dark:block"
              />
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}
