'use client'

import { useState, useRef, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

export default function VideoPlayer({
  src,
  poster,
  alt,
  className,
  autoPlay = false,
  muted = false,
  loop = false,
  playsInline = false,
  controls = false,
  ...props
}) {
  const [isInViewport, setIsInViewport] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const videoRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase())
      setIsMobile(isMobileDevice)
    }

    checkMobile()

    // Only set up intersection observer for mobile devices
    if (isMobile) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInViewport(true)
            observer.disconnect() // Stop observing once video is loaded
          }
        },
        {
          rootMargin: '50px', // Start loading 50px before entering viewport
          threshold: 0.1
        }
      )

      if (containerRef.current) {
        observer.observe(containerRef.current)
      }

      return () => {
        if (containerRef.current) {
          observer.unobserve(containerRef.current)
        }
        observer.disconnect()
      }
    } else {
      // On desktop, always load the video
      setIsInViewport(true)
    }
  }, [isMobile])

  // Show poster image on mobile until video is in viewport
  if (isMobile && !isInViewport) {
    return (
      <div
        ref={containerRef}
        className={twMerge('relative h-full w-full overflow-hidden', className)}
        {...props}
      >
        {poster && (
          <img
            src={poster}
            alt={alt}
            className="h-full w-full object-cover"
          />
        )}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={twMerge('relative h-full w-full overflow-hidden', className)}
      {...props}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        controls={controls}
        className="h-full w-full object-cover"
        preload={isMobile ? 'metadata' : 'auto'}
      >
        <track kind="captions" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
} 