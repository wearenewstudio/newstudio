'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { twMerge } from 'tailwind-merge'

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

  // Detect mobile devices and browser capabilities
  useEffect(() => {
    const checkDeviceAndBrowser = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
      const isMobileDevice = mobileRegex.test(userAgent)
      
      // Check for in-app browsers (social media apps)
      const isInAppBrowser = /FBAN|FBAV|Instagram|Line|WhatsApp|Telegram|Twitter|LinkedIn/i.test(userAgent)
      
      setIsMobile(isMobileDevice || isInAppBrowser)
      
      // Show controls on mobile and in-app browsers for better UX
      if (isMobileDevice || isInAppBrowser) {
        setShowControls(true)
      }
    }
    
    checkDeviceAndBrowser()
  }, [])

  // Handle video events
  const handleLoadedData = useCallback(() => {
    setError(false)
    onLoad?.()
  }, [onLoad])

  const handleError = useCallback((e) => {
    console.error('Video error:', e)
    setError(true)
    onError?.(e)
  }, [onError])

  const handleCanPlay = useCallback(() => {}, [])

  const handlePlay = useCallback(() => {
    setIsPlaying(true)
    onPlay?.()
  }, [onPlay])

  const handlePause = useCallback(() => {
    setIsPlaying(false)
    onPause?.()
  }, [onPause])

  const handleEnded = useCallback(() => {
    setIsPlaying(false)
    onEnded?.()
  }, [onEnded])

  // Handle user interaction for mobile autoplay
  const handleUserInteraction = useCallback(() => {
    if (!hasUserInteracted && videoRef.current) {
      setHasUserInteracted(true)
      
      // Try to play the video
      videoRef.current.play().catch((err) => {
        console.warn('Autoplay failed:', err)
        // If autoplay fails, ensure controls are shown
        setShowControls(true)
      })
    }
  }, [hasUserInteracted])

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

    // For mobile devices, set up interaction listeners
    if (isMobile && autoPlay) {
      document.addEventListener('touchstart', handleUserInteraction, { once: true })
      document.addEventListener('click', handleUserInteraction, { once: true })
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('error', handleError)
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('ended', handleEnded)
      
      document.removeEventListener('touchstart', handleUserInteraction)
      document.removeEventListener('click', handleUserInteraction)
    }
  }, [handleLoadedData, handleError, handleCanPlay, handlePlay, handlePause, handleEnded, handleUserInteraction, isMobile, autoPlay])

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
        type: `video/${extension === 'mp4' ? 'mp4' : extension === 'webm' ? 'webm' : extension === 'ogg' ? 'ogg' : 'mp4'}`
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
      <div className={twMerge('flex items-center justify-center bg-gray-100 text-gray-500 min-h-[200px]', className)}>
        <div className="text-center p-4">
          <div className="mb-2">
            <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-sm font-medium">Video not supported</p>
          <p className="text-xs text-gray-400 mt-1">This video format is not supported by your browser</p>
          {poster && (
            <img 
              src={poster} 
              alt={alt || 'Video poster'} 
              className="mt-3 max-w-full h-auto rounded"
            />
          )}
        </div>
      </div>
    )
  }

  const sources = generateSources(src)

  return (
    <div className={twMerge('relative h-full w-full overflow-hidden', className)} {...props}>
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        poster={poster}
        autoPlay={autoPlay && !isMobile}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        controls={controls || showControls}
        preload={preload}
        aria-label={alt || 'Video content'}
      >
        {sources.map((source, index) => (
          <source key={index} src={source.src} type={source.type} />
        ))}
        
        {/* Fallback text */}
        <p className="text-sm text-gray-500 p-4">
          Your browser does not support the video tag.
          {poster && (
            <img 
              src={poster} 
              alt={alt || 'Video poster'} 
              className="mt-2 max-w-full h-auto"
            />
          )}
        </p>
      </video>
      
      {/* Mobile autoplay prompt */}
      {isMobile && autoPlay && !hasUserInteracted && !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-center text-white p-4">
            <div className="mb-2">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm font-medium">Tap to play video</p>
            <p className="text-xs opacity-75 mt-1">Autoplay is disabled on mobile</p>
          </div>
        </div>
      )}
    </div>
  )
} 