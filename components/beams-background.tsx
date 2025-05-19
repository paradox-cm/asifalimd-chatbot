"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Mobile detection hook
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window || navigator.maxTouchPoints > 0)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}

interface AnimatedGradientBackgroundProps {
  className?: string
  children?: React.ReactNode
  intensity?: "subtle" | "medium" | "strong"
  mode?: "dark" | "light"
}

interface Beam {
  x: number
  y: number
  width: number
  length: number
  angle: number
  speed: number
  opacity: number
  hue: number
  pulse: number
  pulseSpeed: number
}

// Memoize beam creation for performance
function createBeam(width: number, height: number, mode: "dark" | "light"): Beam {
  const angle = -35 + Math.random() * 10
  const isLightMode = mode === "light"
  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 30 + Math.random() * 60,
    length: height * 2.5,
    angle: angle,
    speed: 0.6 + Math.random() * 1.2,
    opacity: 0.12 + Math.random() * 0.16,
    hue: isLightMode ? 210 + Math.random() * 40 : 210 + Math.random() * 50,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.03,
  }
}

export default function BeamsBackground({
  className,
  intensity = "strong",
  mode = "dark",
  children,
}: AnimatedGradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const beamsRef = useRef<Beam[]>([])
  const animationFrameRef = useRef<number>(0)
  const MINIMUM_BEAMS = 20
  const [isVisible, setIsVisible] = useState(false)
  const isMobile = useIsMobile()
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })

  const opacityMap = {
    subtle: 0.7,
    medium: 0.85,
    strong: 1,
  }

  useEffect(() => {
    // Use IntersectionObserver to only animate when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          } else {
            setIsVisible(false)
          }
        })
      },
      { threshold: 0.1 },
    )

    const canvas = canvasRef.current
    if (canvas) {
      observer.observe(canvas)
    }

    return () => {
      if (canvas) {
        observer.unobserve(canvas)
      }
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !isVisible) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1

      // Store the current size to avoid unnecessary redraws
      const newWidth = window.innerWidth * dpr
      const newHeight = window.innerHeight * dpr

      // Only update if size has changed
      if (canvasSize.width !== newWidth || canvasSize.height !== newHeight) {
        canvas.width = newWidth
        canvas.height = newHeight
        canvas.style.width = `${window.innerWidth}px`
        canvas.style.height = `${window.innerHeight}px`
        ctx.scale(dpr, dpr)

        setCanvasSize({ width: newWidth, height: newHeight })

        // Reduce number of beams on mobile
        const totalBeams = isMobile
          ? Math.min(MINIMUM_BEAMS * 0.5, 10) // Fewer beams on mobile
          : Math.min(MINIMUM_BEAMS * 1.5, 30) // Cap at 30 beams for desktop

        beamsRef.current = Array.from({ length: totalBeams }, () => createBeam(canvas.width, canvas.height, mode))
      }
    }

    updateCanvasSize()

    // Throttle resize event for performance
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(updateCanvasSize, 200)
    }

    window.addEventListener("resize", handleResize)

    function resetBeam(beam: Beam, index: number, totalBeams: number) {
      if (!canvas) return beam

      const column = index % 3
      const spacing = canvas.width / 3
      const isLightMode = mode === "light"

      beam.y = canvas.height + 100
      beam.x = column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5
      beam.width = 100 + Math.random() * 100
      beam.speed = 0.5 + Math.random() * 0.4
      beam.hue = isLightMode ? 210 + (index * 40) / totalBeams : 190 + (index * 70) / totalBeams
      beam.opacity = isLightMode ? 0.15 + Math.random() * 0.1 : 0.2 + Math.random() * 0.1
      return beam
    }

    function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
      ctx.save()
      ctx.translate(beam.x, beam.y)
      ctx.rotate((beam.angle * Math.PI) / 180)

      // Calculate pulsing opacity
      const pulsingOpacity = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2) * opacityMap[intensity]
      const isLightMode = mode === "light"
      const saturation = isLightMode ? "95%" : "85%"
      const lightness = isLightMode ? "45%" : "65%"

      const gradient = ctx.createLinearGradient(0, 0, 0, beam.length)

      // Enhanced gradient with multiple color stops
      gradient.addColorStop(0, `hsla(${beam.hue}, ${saturation}, ${lightness}, 0)`)
      gradient.addColorStop(0.1, `hsla(${beam.hue}, ${saturation}, ${lightness}, ${pulsingOpacity * 0.5})`)
      gradient.addColorStop(0.4, `hsla(${beam.hue}, ${saturation}, ${lightness}, ${pulsingOpacity})`)
      gradient.addColorStop(0.6, `hsla(${beam.hue}, ${saturation}, ${lightness}, ${pulsingOpacity})`)
      gradient.addColorStop(0.9, `hsla(${beam.hue}, ${saturation}, ${lightness}, ${pulsingOpacity * 0.5})`)
      gradient.addColorStop(1, `hsla(${beam.hue}, ${saturation}, ${lightness}, 0)`)

      ctx.fillStyle = gradient
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length)
      ctx.restore()
    }

    function animate() {
      if (!canvas || !ctx || !isVisible) return

      // Use requestAnimationFrame for smoother animation
      animationFrameRef.current = requestAnimationFrame(animate)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Reduce blur on mobile for better performance
      ctx.filter = isMobile ? "blur(25px)" : "blur(35px)"

      const totalBeams = beamsRef.current.length
      beamsRef.current.forEach((beam, index) => {
        // Slow down animation on mobile
        const speedFactor = isMobile ? 0.5 : 1
        beam.y -= beam.speed * speedFactor
        beam.pulse += beam.pulseSpeed * speedFactor

        // Reset beam when it goes off screen
        if (beam.y + beam.length < -100) {
          resetBeam(beam, index, totalBeams)
        }

        drawBeam(ctx, beam)
      })
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [intensity, mode, isVisible, isMobile, canvasSize])

  return (
    <div className={cn("relative overflow-hidden", mode === "light" ? "bg-neutral-50" : "bg-[#0B1428]", className)}>
      <div
        className={cn(
          "absolute inset-0 overflow-hidden",
          isMobile && "fixed", // Fix position on mobile to prevent scroll issues
        )}
        style={{
          willChange: "transform", // Optimize for animations
          transform: "translateZ(0)", // Force GPU acceleration
          backfaceVisibility: "hidden", // Prevent flickering
          perspective: "1000px", // Improve 3D rendering
        }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{
            filter: isMobile ? "blur(10px)" : "blur(15px)",
            pointerEvents: "none", // Ensure canvas doesn't interfere with interactions
            willChange: "transform", // Optimize for animations
            transform: "translateZ(0)", // Force GPU acceleration
          }}
          aria-hidden="true"
        />

        <motion.div
          className={cn("absolute inset-0", mode === "light" ? "bg-neutral-50/5" : "bg-[#0B1428]/5")}
          animate={{
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 10,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
          style={{
            backdropFilter: "blur(50px)",
            pointerEvents: "none", // Ensure it doesn't interfere with interactions
            willChange: "opacity", // Optimize for animations
          }}
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 w-full">{children}</div>
    </div>
  )
}
