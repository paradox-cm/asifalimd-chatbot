import Link from "next/link"
import { Button } from "@/components/ui/button"
import ImageWithFallback from "@/components/image-with-fallback"

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background" aria-label="Hero Section">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_650px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Dr. Asif Ali, MD
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Cardiologist, Clinical Investigator, and Digital Health Strategist
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/contact">
                <Button className="px-8">Contact</Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="px-8">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="mx-auto lg:mx-0 relative">
            <ImageWithFallback
              src="/images/dr-ali-updated.png"
              alt="Dr. Asif Ali"
              width={650}
              height={650}
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              priority
              unoptimized
              fallbackSrc="/images/dr-ali-new-headshot.png"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
