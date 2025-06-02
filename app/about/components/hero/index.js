'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { UnicornScene } from 'components'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import SplitText from 'gsap/dist/SplitText'
import { Container, DisplayTextClass } from 'styles'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

export default function Hero() {
  const sectionEl = useRef(null)

  useGSAP(
    () => {
      const split = new SplitText('.anim-text', {
        charsClass: 'block',
        linesClass: 'overflow-hidden -mt-2 2xl:-mt-(--desktop-2)',
      })

      gsap.fromTo(
        split.words,
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 2,
          ease: 'power3.out',
          stagger: 0.05,
        },
      )
    },
    { dependencies: [sectionEl], scope: sectionEl },
  )

  return (
    <section
      ref={sectionEl}
      id="hero"
      className="relative h-screen w-screen text-neutral-50"
    >
      <Container className="h-full">
        <h1
          className={DisplayTextClass(
            'anim-text absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center',
          )}
        >
          We defy convention
          <br />
          to accelerate business.
        </h1>
      </Container>
      <UnicornScene
        id="bg-scene"
        projectId={'FVq5PLXHCkcO64upxnI7?production=true'}
        fps={24}
        dpi={1}
        lazyLoad={true}
        className="-z-1 absolute inset-0 h-full w-full"
      />
    </section>
  )
}
