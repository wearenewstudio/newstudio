'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import Vimeo from '@u-wave/react-vimeo'
import { RenderMedia } from 'styles'

gsap.registerPlugin(useGSAP)

export default function Reel({ data }) {
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
    <div ref={sectionEl} className="aspect-video h-auto w-full">
      <RenderMedia data={data} />
    </div>
  )
}
