"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string
}

export default function ImageWithFallback({ src, fallbackSrc, alt, ...rest }: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [useImgTag, setUseImgTag] = useState(false)

  const handleError = () => {
    if (fallbackSrc) {
      setImgSrc(fallbackSrc)
    } else {
      // If no fallback provided or fallback also fails, use standard img tag
      setUseImgTag(true)
    }
  }

  if (useImgTag) {
    return (
      <img
        src={typeof src === "string" ? src : ""}
        alt={alt}
        className={rest.className}
        style={{ width: rest.width, height: rest.height }}
      />
    )
  }

  return <Image {...rest} src={imgSrc || "/placeholder.svg"} alt={alt} onError={handleError} unoptimized />
}
