'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { twMerge } from 'tailwind-merge'
import { useIntersectionObserver } from 'hooks'

export default function VideoPlayer({
  src,
  poster,
  alt,
  className,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  controls = false,
  preload = 'metadata',
  onLoad,
  onError,
  onPlay,
  onPause,
  onEnded,
  ...props
}) {
  const videoRef = useRef(null)
  const [error, setError] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showPlayButton, setShowPlayButton] = useState(false)

  // Use intersection observer to detect when video is in view
  const { elementRef, isIntersecting, hasIntersected } =
    useIntersectionObserver({
      threshold: 0.3, // Start playing when 30% of video is visible
      rootMargin: '50px', // Start loading 50px before video comes into view
    })

  // Detect mobile devices and browser capabilities
  useEffect(() => {
    const checkDeviceAndBrowser = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera
      const mobileRegex =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
      const isMobileDevice = mobileRegex.test(userAgent)

      // Check for in-app browsers (social media apps)
      const isInAppBrowser =
        /FBAN|FBAV|Instagram|Line|WhatsApp|Telegram|Twitter|LinkedIn/i.test(
          userAgent,
        )

      setIsMobile(isMobileDevice || isInAppBrowser)

      // Show controls on mobile and in-app browsers for better UX
      if (isMobileDevice || isInAppBrowser) {
        setShowControls(true)
        setShowPlayButton(true)
      }
    }

    checkDeviceAndBrowser()
  }, [])

  // Handle video events
  const handleLoadedData = useCallback(() => {
    setError(false)
    setIsLoading(false)
    onLoad?.()
  }, [onLoad])

  const handleError = useCallback(
    (e) => {
      console.error('Video error:', e)
      setError(true)
      setIsLoading(false)
      onError?.(e)
    },
    [onError],
  )

  const handleCanPlay = useCallback(() => {}, [])

  const handlePlay = useCallback(() => {
    setIsPlaying(true)
    setShowPlayButton(false)
    onPlay?.()
  }, [onPlay])

  const handlePause = useCallback(() => {
    setIsPlaying(false)
    if (isMobile && autoPlay) {
      setShowPlayButton(true)
    }
    onPause?.()
  }, [onPause, isMobile, autoPlay])

  const handleEnded = useCallback(() => {
    setIsPlaying(false)
    if (isMobile && autoPlay) {
      setShowPlayButton(true)
    }
    onEnded?.()
  }, [onEnded, isMobile, autoPlay])

  // Enhanced user interaction handler for mobile autoplay
  const handleUserInteraction = useCallback(() => {
    if (!hasUserInteracted && videoRef.current) {
      setHasUserInteracted(true)
      setShowPlayButton(false)
      
      // Try to play the video
      videoRef.current.play().catch((err) => {
        console.warn('Autoplay failed:', err)
        // If autoplay fails, ensure controls are shown
        setShowControls(true)
        setShowPlayButton(true)
      })
    }
  }, [hasUserInteracted])

  // Force play function for mobile
  const forcePlay = useCallback(() => {
    if (videoRef.current) {
      setHasUserInteracted(true)
      setShowPlayButton(false)
      
      videoRef.current.play().catch((err) => {
        console.warn('Force play failed:', err)
        setShowControls(true)
        setShowPlayButton(true)
      })
    }
  }, [])

  // Control video playback based on intersection
  useEffect(() => {
    const video = videoRef.current
    if (!video || !hasIntersected) return

    if (isIntersecting && autoPlay && !isPlaying) {
      // Video is in view and should autoplay
      if (isMobile && !hasUserInteracted) {
        // On mobile, show play button instead of auto-playing
        setShowPlayButton(true)
        return
      }
      
      video.play().catch((err) => {
        console.warn('Autoplay failed:', err)
        setShowControls(true)
        setShowPlayButton(true)
      })
    } else if (!isIntersecting && isPlaying) {
      // Video is out of view, pause it
      video.pause()
    }
  }, [
    isIntersecting,
    hasIntersected,
    autoPlay,
    isPlaying,
    isMobile,
    hasUserInteracted,
  ])

  // Set up video event listeners
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('error', handleError)
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('ended', handleEnded)

    // For mobile devices, set up more aggressive interaction listeners
    if (isMobile && autoPlay) {
      // Listen for any touch or click on the document
      const handleGlobalInteraction = () => {
        if (!hasUserInteracted) {
          handleUserInteraction()
        }
      }
      
      document.addEventListener('touchstart', handleGlobalInteraction, { once: true })
      document.addEventListener('click', handleGlobalInteraction, { once: true })
      document.addEventListener('scroll', handleGlobalInteraction, { once: true })
      
      return () => {
        document.removeEventListener('touchstart', handleGlobalInteraction)
        document.removeEventListener('click', handleGlobalInteraction)
        document.removeEventListener('scroll', handleGlobalInteraction)
      }
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('error', handleError)
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('ended', handleEnded)
    }
  }, [
    handleLoadedData,
    handleError,
    handleCanPlay,
    handlePlay,
    handlePause,
    handleEnded,
    handleUserInteraction,
    isMobile,
    autoPlay,
    hasUserInteracted,
  ])

  // Generate multiple source formats for better compatibility
  const generateSources = (videoSrc) => {
    const sources = []

    // Add original source
    if (videoSrc) {
      const extension = videoSrc.split('.').pop()?.toLowerCase()
      const baseUrl = videoSrc.replace(/\.[^/.]+$/, '')

      // Add original format
      sources.push({
        src: videoSrc,
        type: `video/${extension === 'mp4' ? 'mp4' : extension === 'webm' ? 'webm' : extension === 'ogg' ? 'ogg' : 'mp4'}`,
      })

      // Add alternative formats for better compatibility
      if (extension !== 'webm') {
        sources.push({ src: `${baseUrl}.webm`, type: 'video/webm' })
      }
      if (extension !== 'mp4') {
        sources.push({ src: `${baseUrl}.mp4`, type: 'video/mp4' })
      }
      if (extension !== 'ogg') {
        sources.push({ src: `${baseUrl}.ogg`, type: 'video/ogg' })
      }
    }

    return sources
  }

  // Error fallback
  if (error) {
    return (
      <div
        className={twMerge(
          'flex min-h-[200px] items-center justify-center bg-gray-100 text-gray-500',
          className,
        )}
      >
        <div className="p-4 text-center">
          <div className="mb-2">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-sm font-medium">Video not supported</p>
          <p className="mt-1 text-xs text-gray-400">
            This video format is not supported by your browser
          </p>
          {poster && (
            <img
              src={poster}
              alt={alt || 'Video poster'}
              className="mt-3 h-auto max-w-full rounded"
            />
          )}
        </div>
      </div>
    )
  }

  const sources = generateSources(src)

  return (
    <div
      ref={elementRef}
      className={twMerge('relative h-full w-full overflow-hidden', className)}
      {...props}
    >
      {/* Loading spinner instead of black background */}
      {isLoading && !error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-white rounded-lg animate-spin"></div>
          </div>
        </div>
      )}
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        poster={poster}
        autoPlay={false} // Disable default autoplay, we control it manually
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        controls={!isMobile && (controls || showControls)}
        preload={preload}
        aria-label={alt || 'Video content'}
      >
        {sources.map((source, index) => (
          <source key={index} src={source.src} type={source.type} />
        ))}

        {/* Fallback text */}
        <p className="p-4 text-sm text-gray-500">
          Your browser does not support the video tag.
          {poster && (
            <img
              src={poster}
              alt={alt || 'Video poster'}
              className="mt-2 h-auto max-w-full"
            />
          )}
        </p>
      </video>

      {/* Enhanced mobile play button - more prominent and always visible when needed */}
      {isMobile &&
        autoPlay &&
        !hasUserInteracted &&
        !isPlaying &&
        isIntersecting &&
        showPlayButton && (
          <button
            className="absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center bg-black bg-opacity-60 focus:outline-none"
            onClick={forcePlay}
            onTouchStart={forcePlay}
            aria-label="Tap to play video"
            tabIndex={0}
          >
            <div className="p-4 text-center text-white">
              <div className="mb-3">
                <svg
                  className="mx-auto h-16 w-16 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-base font-semibold">Tap to play video</p>
              <p className="mt-1 text-sm text-gray-300">
                Video will autoplay after interaction
              </p>
            </div>
          </button>
        )}

      {/* Fallback play button for when video is paused on mobile */}
      {isMobile &&
        autoPlay &&
        hasUserInteracted &&
        !isPlaying &&
        showPlayButton && (
          <button
            className="absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center bg-black bg-opacity-40 focus:outline-none"
            onClick={forcePlay}
            onTouchStart={forcePlay}
            aria-label="Tap to resume video"
            tabIndex={0}
          >
            <div className="p-4 text-center text-white">
              <div className="mb-2">
                <svg
                  className="mx-auto h-12 w-12 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-sm font-medium">Tap to resume</p>
            </div>
          </button>
        )}
    </div>
  )
}
