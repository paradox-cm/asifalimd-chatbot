"use client"

export default function ContactCallout() {
  // Component now returns null in all cases, effectively removing the section from all pages
  return null

  // Original code is commented out below for reference
  /*
  const [isHovered, setIsHovered] = useState(false)
  const pathname = usePathname()

  if (pathname === "/media" || pathname === "/privacy") return null

  return (
    <section className="w-full py-12 px-2 md:px-4 bg-background" aria-label="Contact Dr. Ali">
      <div className="container mx-auto px-2 md:px-4" style={{ maxWidth: "1160px" }}>
        <FadeInSection>
          <Card
            className={cn("border transition-all duration-300", isHovered ? "border-clinical-400" : "border-border")}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-2 text-foreground">
                    Interested in collaborating with Dr. Ali?
                  </h2>
                  <p className="text-foreground/70">
                    For speaking engagements, research collaborations, or med-tech advisory inquiries.
                  </p>
                </div>
                <Link href="/contact">
                  <Button className="bg-clinical-600 hover:bg-clinical-700 text-white transition-all duration-300 flex items-center gap-2">
                    Get in Touch
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </FadeInSection>
      </div>
    </section>
  )
  */
}

// Helper function to conditionally join class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
