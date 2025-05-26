'use client'

import { useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { CustomLink, Icon, Toggle } from 'components'
import { Container } from 'styles'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Nav() {
  const navEl = useRef(null)
  const pathname = usePathname()
  const [scrolledPast, setScrolledPast] = useState(false)

  useGSAP(
    () => {
      if (pathname === '/') setScrolledPast(false)
      else setScrolledPast(true)

      const heroSection = document.getElementById('hero')
      const footerSection = document.getElementById('footer')

      if (heroSection) {
        ScrollTrigger.create({
          trigger: heroSection,
          start: `bottom-=${
            (navEl.current?.offsetHeight + navEl.current?.offsetTop) / 2
          } top`,
          onEnter: () => setScrolledPast(true),
          onLeaveBack: () => setScrolledPast(false),
        })
      }

      if (footerSection) {
        ScrollTrigger.create({
          trigger: document.body,
          start: `bottom-=${
            footerSection.offsetHeight
          } top+=${(navEl.current?.offsetHeight + navEl.current?.offsetTop) / 2}`,
          onEnter: () => gsap.to(navEl.current, { yPercent: -100 }),
          onLeaveBack: () => gsap.to(navEl.current, { yPercent: 0 }),
        })
      }
    },
    { dependencies: [navEl, pathname], scope: navEl },
  )

  return (
    <header
      ref={navEl}
      className={twMerge(
        '2xl:py-[var(--vw-unit) * 20] fixed left-0 top-0 z-50 w-full py-5 text-neutral-50',
        scrolledPast ? 'mix-blend-difference' : 'mix-blend-normal',
      )}
    >
      <Container>
        <div className="flex w-full items-center justify-between">
          <Link
            className="2xl:w-[var(--vw-unit) * 96] w-24 text-neutral-50"
            href={'/'}
          >
            <Icon name="logo" />
          </Link>

          <nav className="2xl:gap-[var(--vw-unit) * 32] flex items-center gap-8">
            <CustomLink href={'/work'}>Work</CustomLink>
            <CustomLink href={'/about'}>About</CustomLink>
            <CustomLink href={'/insights'}>Insights</CustomLink>
            <CustomLink href={'/contact'}>Contact</CustomLink>
            <Toggle />
          </nav>
        </div>
      </Container>
    </header>
  )
}
