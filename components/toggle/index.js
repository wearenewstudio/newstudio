'use client'

import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export default function Toggle({ className }) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme === 'dark') {
      setIsDark(true)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <button
      aria-label="Toggle dark mode"
      className={twMerge(
        '2xl:h-(--desktop-2) 2xl:w-(--desktop-2) xs:h-2 xs:w-2 h-3 w-3 cursor-pointer rounded-full border-none bg-neutral-50 sm:mt-1 dark:bg-neutral-50',
        className,
      )}
      onClick={() => setIsDark(!isDark)}
    />
  )
}
