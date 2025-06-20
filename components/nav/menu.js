'use client'

import { useEffect } from 'react'
import CustomLink from 'components/link'
import { usePathname } from 'next/navigation'
import { useLenis } from 'lenis/react'
import { HugeTextClass, Container, SmallTextClass, DisplayTextClass, BigTextClass } from 'styles'
import { twMerge } from 'tailwind-merge'

export default function Menu({ menuOpen }) {
  const lenis = useLenis()
  const pathname = usePathname()

  useEffect(() => {
    if (menuOpen) {
      lenis?.stop()
    } else {
      lenis?.start()
    }
  }, [lenis, menuOpen])

  return (
    <div
      className={twMerge(
        'h-(--full-height) left-0 top-0 z-40 w-screen bg-neutral-50 dark:bg-neutral-950',
        menuOpen ? 'fixed' : 'hidden',
      )}
    >
      <Container className="flex h-full w-full flex-col justify-between py-20">
        <nav className="flex flex-col gap-2">
          <CustomLink
            className={DisplayTextClass()}
            $underline={pathname === '/'}
            href={'/'}
          >
            Home
          </CustomLink>
          <CustomLink
            className={DisplayTextClass()}
            $underline={pathname === '/work'}
            href={'/work'}
          >
            Work
          </CustomLink>
          <CustomLink
            className={DisplayTextClass()}
            $underline={pathname === '/about'}
            href={'/about'}
          >
            About
          </CustomLink>
          <CustomLink
            className={DisplayTextClass()}
            $underline={pathname === '/contact'}
            href={'/contact'}
          >
            Contact
          </CustomLink>
        </nav>

        <div>
          <p className={BigTextClass('mb-2')}>Let's Work Together</p>
          <CustomLink className={SmallTextClass()} href={'mailto:hello@wearenew.studio'}>
            hello@wearenew.studio
          </CustomLink>
        </div>
      </Container>
    </div>
  )
}
