'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { usePathname } from 'next/navigation'

gsap.registerPlugin(useGSAP)

export default function ResetGSAP() {
  const pathname = usePathname()

  useGSAP(
    () => {
      gsap.set('#main', { autoAlpha: 1 })
    },
    { dependencies: [pathname] },
  )
}
