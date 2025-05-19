import type React from "react"
import type { Metadata, Viewport } from "next"
import { Manrope } from "next/font/google"
import "./globals.css"
import { ThemeScript } from "./theme-script"
import ClientRootLayout from "./client-layout"

// Add TypeScript interface for the window object to recognize our global functions
declare global {
  interface Window {
    setManualTheme?: (theme: "light" | "dark") => void
    resetToSystemTheme?: () => "light" | "dark"
  }
}

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap", // Optimize font loading
})

export const metadata: Metadata = {
  title: {
    template: "%s | Asif Ali, MD",
    default: "Asif Ali, MD | Cardiologist & Med-Tech Advisor",
  },
  description: "Cardiologist, Clinical Strategist, and Med-Tech Advisor bridging science and care.",
  keywords: ["cardiologist", "med-tech", "healthcare", "innovation", "research", "POTS", "dysautonomia"],
  authors: [{ name: "Dr. Asif Ali" }],
  creator: "Dr. Asif Ali",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.drasifali.com/",
    title: "Asif Ali, MD | Cardiologist & Med-Tech Advisor",
    description: "Cardiologist, Clinical Strategist, and Med-Tech Advisor bridging science and care.",
    siteName: "Asif Ali, MD",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asif Ali, MD | Cardiologist & Med-Tech Advisor",
    description: "Cardiologist, Clinical Strategist, and Med-Tech Advisor bridging science and care.",
  },
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1B2550" }, // Updated to new dark blue
    { media: "(prefers-color-scheme: dark)", color: "#0B1428" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* 
          ThemeScript runs on initial load and sets up listeners for system theme changes.
          It handles theme switching without requiring page reloads.
        */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="preload" href="/images/dr-ali-portrait.png" as="image" />
        <ThemeScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            // Fix for broken images in production
            window.addEventListener('error', function(e) {
              if (e.target.tagName === 'IMG') {
                // Try to reload the image with a cache-busting parameter
                const originalSrc = e.target.src;
                if (!originalSrc.includes('?v=')) {
                  e.target.src = originalSrc + '?v=' + new Date().getTime();
                }
              }
            }, true);
          `,
          }}
        />
      </head>
      <body className={`${manrope.variable} font-sans bg-background text-foreground min-h-screen flex flex-col`}>
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  )
}
