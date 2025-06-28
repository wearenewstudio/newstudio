import { useEffect, useRef, useState, useCallback } from 'react'

export function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const elementRef = useRef(null)

  const {
    threshold = 0.1,
    rootMargin = '0px',
    root = null,
    triggerOnce = false
  } = options

  const handleIntersection = useCallback((entries) => {
    const [entry] = entries
    
    if (entry.isIntersecting) {
      setIsIntersecting(true)
      if (!hasIntersected) {
        setHasIntersected(true)
      }
    } else {
      setIsIntersecting(false)
    }
  }, [hasIntersected])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
      root
    })

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [handleIntersection, threshold, rootMargin, root])

  return {
    elementRef,
    isIntersecting,
    hasIntersected
  }
} 