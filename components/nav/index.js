'use client'

import { useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { CustomLink, Icon, slideInOut, Toggle } from 'components'
import { BigTextClass, Container, SmallTextClass } from 'styles'
import { useLenis } from 'lenis/react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { useTransitionRouter } from 'next-view-transitions'
import Menu from './menu'

gsap.registerPlugin(ScrollTrigger)

export default function Nav() {
  const navEl = useRef(null)
  const pathname = usePathname()
  const router = useTransitionRouter()
  const lenis = useLenis()
  const [scrolledPast, setScrolledPast] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useGSAP(
    () => {
      if (pathname === '/about') setScrolledPast(false)
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
          trigger: footerSection,
          start: `top-=10% top+=${(navEl.current?.offsetHeight + navEl.current?.offsetTop) / 2}`,
          onEnter: () => gsap.to(navEl.current, { yPercent: -100 }),
          onLeaveBack: () => gsap.to(navEl.current, { yPercent: 0 }),
        })
      }
    },
    { dependencies: [navEl, pathname], scope: navEl },
  )

  useGSAP(
    () => {
      gsap.from(navEl.current, {
        opacity: 0,
        duration: 0.5,
        delay: 0.25,
        ease: 'power3.out',
      })
    },
    { dependencies: [navEl], scope: navEl },
  )

  return (
    <>
      <header
        ref={navEl}
        className={twMerge(
          '2xl:py-(--desktop-5) fixed left-0 top-0 z-50 w-full py-5 text-neutral-50',
          scrolledPast ? 'mix-blend-difference' : 'mix-blend-normal',
        )}
      >
        <Container>
          <div className="flex w-full items-center justify-between">
            <Link
              className="2xl:w-(--desktop-24) w-24 text-neutral-50"
              href={'/'}
              onClick={(e) => {
                e.preventDefault()

                if (pathname === '/') {
                  lenis.scrollTo(0)
                } else {
                  router.push('/', {
                    onTransitionReady: slideInOut,
                  })
                }
              }}
            >
              <Icon name="logo" />
            </Link>

            <nav className="2xl:gap-(--desktop-8) hidden items-center gap-8 md:flex">
              <CustomLink $underline={pathname === '/work'} href={'/work'}>
                Work
              </CustomLink>
              <CustomLink $underline={pathname === '/about'} href={'/about'}>
                About
              </CustomLink>
              <CustomLink
                $underline={pathname === '/insights'}
                href={'/insights'}
                disabled
              >
                Insights
              </CustomLink>
              <CustomLink
                $underline={pathname === '/contact'}
                href={'/contact'}
              >
                Contact
              </CustomLink>
              <Toggle />
            </nav>

            <Toggle className="-translate-1/2 absolute left-1/2 top-1/2 md:hidden" />

            <button
              aria-label="Toggle Menu"
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative cursor-pointer border-0 outline-0 md:hidden"
            >
              <p className={SmallTextClass()}>Menu</p>
            </button>
          </div>
        </Container>
      </header>
      <Menu menuOpen={menuOpen} />
    </>
  )
}
