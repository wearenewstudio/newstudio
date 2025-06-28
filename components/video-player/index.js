'use client'

import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

/**
 * Mobile-safe video:
 * – no src until the element is near the viewport
 * – src is removed + playback paused when it scrolls away
 */
export default function LazyVideo({
  src,
  poster,
  alt,
  className,
  autoPlay = false,
  muted = true,
  loop = false,
  playsInline = true,
  controls = false,
  ...rest
}) {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '200px', threshold: 0.1 },
    )

    if (containerRef.current) io.observe(containerRef.current)
    return () => io.disconnect()
  }, [])

  // Load or unload the video stream when visibility changes
  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    if (isVisible) {
      if (!el.src) {
        el.src = src
        el.load()
      }
      if (autoPlay) el.play().catch(() => {})
    } else {
      el.pause()
      el.removeAttribute('src') // drop the decoder buffer
      el.load() // force a full detach
    }
  }, [isVisible, src, autoPlay])

  return (
    <div
      ref={containerRef}
      className={twMerge('relative w-full overflow-hidden', className)}
      {...rest}
    >
      <video
        ref={videoRef}
        poster={poster}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        controls={controls}
        preload="none"
        className="h-full w-full object-cover"
      >
        <track kind="captions" />
        {alt ? <p>{alt}</p> : null}
      </video>
    </div>
  )
}
