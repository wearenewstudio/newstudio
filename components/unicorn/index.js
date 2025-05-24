'use client'

import { useEffect, useRef } from 'react'

export default function UnicornScene({
  projectId,
  jsonFilePath,
  style = {},
  scale = 1,
  dpi = 1.5,
  fps = 60,
  altText = 'Gradient Background Animation',
  ariaLabel = altText,
  className = '',
  lazyLoad = false,
}) {
  const elementRef = useRef(null)
  const sceneRef = useRef(null)
  const scriptId = useRef(`us-data-${Math.random().toString(36).slice(2)}`)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const initializeScript = (callback) => {
      const version = '1.4.21'

      const existingScript = document.querySelector(
        'script[src^="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js"]',
      )

      if (existingScript) {
        if (window.UnicornStudio) {
          callback()
        } else {
          existingScript.addEventListener('load', callback)
        }
        return
      }

      const script = document.createElement('script')
      script.src = `https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v${version}/dist/unicornStudio.umd.js`
      script.async = true

      script.onload = () => {
        callback()
      }

      document.body.appendChild(script)
    }

    const initializeScene = async () => {
      if (!elementRef.current) return

      if (jsonFilePath) {
        elementRef.current.setAttribute(
          'data-us-project-src',
          `${jsonFilePath}`,
        )
      } else if (projectId) {
        const [cleanProjectId, query] = projectId.split('?')
        const production = query?.includes('production')

        elementRef.current.setAttribute('data-us-project', cleanProjectId)

        if (production) {
          elementRef.current.setAttribute('data-us-production', '1')
        }
      } else {
        throw new Error('No project ID or JSON file path provided')
      }

      const UnicornStudio = window.UnicornStudio

      if (!UnicornStudio) {
        throw new Error('UnicornStudio not found')
      }

      if (sceneRef.current) {
        sceneRef.current.destroy()
      }

      UnicornStudio.init({
        scale,
        dpi,
      }).then((scenes) => {
        const ourScene = scenes.find(
          (scene) =>
            scene.element === elementRef.current ||
            scene.element.contains(elementRef.current),
        )
        if (ourScene) {
          sceneRef.current = ourScene
        }
      })
    }

    initializeScript(initializeScene)

    return () => {
      if (sceneRef.current) {
        sceneRef.current.destroy()
        sceneRef.current = null
      }
      if (jsonFilePath) {
        const script = document.getElementById(scriptId.current)
        script?.remove()
      }
    }
  }, [projectId, jsonFilePath, scale, dpi])

  return (
    <div
      ref={elementRef}
      style={style}
      className={`relative ${className}`}
      role="img"
      aria-label={ariaLabel}
      data-us-dpi={dpi}
      data-us-scale={scale}
      data-us-fps={fps}
      data-us-alttext={altText}
      data-us-arialabel={ariaLabel}
      data-us-lazyload={lazyLoad ? 'true' : ''}
    />
  )
}
