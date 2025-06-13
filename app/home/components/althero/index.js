'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import SplitText from 'gsap/dist/SplitText'
import { Container, DisplayTextClass } from 'styles'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

export default function Althero({ data }) {
  const sectionEl = useRef(null)

  useGSAP(
    () => {
      const split = new SplitText('.anim-text', {
        charsClass: 'block',
        linesClass: 'overflow-hidden -mt-3 sm:-mt-5 md:-mt-8 2xl:-mt-(--desktop-8)',
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
      className="pt-35 pb-15 relative md:pb-[10vh] md:pt-[25vh]"
    >
      <Container>
        <h1 className={DisplayTextClass('anim-text leading-tight')}>
          {data.split('\n').map((line, index) => (
            <span key={index} className="block">
              {line}
            </span>
          ))}
        </h1>
      </Container>
    </section>
  )
}
