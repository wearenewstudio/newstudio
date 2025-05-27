'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { Container } from 'styles'

gsap.registerPlugin(useGSAP)

export default function Reel() {
  const sectionEl = useRef(null)

  useGSAP(
    () => {
      gsap.from(sectionEl.current, {
        opacity: 0,
        duration: 1,
        y: 100,
        delay: 0.5,
        ease: 'power3.out',
      })
    },
    { dependencies: [sectionEl], scope: sectionEl },
  )

  return (
    <video
      className="aspect-video h-auto w-full overflow-hidden"
      autoPlay
      loop
      muted
      playsInline
      ref={sectionEl}
    >
      <source src="/vid.webm" type="video/webm" />
      Your browser does not support the video tag.
    </video>
  )
}
