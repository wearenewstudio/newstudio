'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import Vimeo from '@u-wave/react-vimeo'

gsap.registerPlugin(useGSAP)

export default function Reel({ data }) {
  const sectionEl = useRef(null)
  console.log(data)

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
      <Vimeo
        video={'https://vimeo.com/1093177478/ab319dec9f'}
        autoplay={true}
        paused={false}
        showByline={false}
        controls={false}
        loop={true}
        showTitle={false}
        responsive={true}
        muted={true}
        autopause={false}
        dnt={true}
        keyboard={false}
        background={true}
      />
    </div>
  )
}
