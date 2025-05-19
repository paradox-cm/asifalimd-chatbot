import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function AboutPreview() {
  return (
    <section className="w-full py-12 md:py-16 px-2 md:px-4 bg-background" aria-label="About Dr. Ali">
      <div className="container mx-auto px-2 md:px-4" style={{ maxWidth: "1160px" }}>
        <Card>
          <CardContent className="space-y-3 md:space-y-4 text-foreground/80 pt-6">
            <p className="text-base md:text-lg">
              Dr. Asif Ali is a cardiologist, clinical investigator, and health-tech strategist based in Houston. He
              leads care at Houston Cardiology Consultants, drives inclusive clinical trials through Cena Research
              Institute, and advises digital health startups via Cena Ventures.
            </p>
            <p className="text-base md:text-lg">
              A member of the American Heart Association's Health Tech Advisory Group, Dr. Ali works across the
              spectrum—from underserved patients to AI-enabled platforms—to advance cardiovascular innovation with
              equity and evidence at its core.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/about">
              <Button size="sm" className="md:size-default">
                Read Full Bio
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}
