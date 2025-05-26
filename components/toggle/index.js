'use client'

import { useEffect, useState } from 'react'

export default function Toggle() {
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
      className="mt-1 h-2 w-2 cursor-pointer rounded-full border-none bg-neutral-50 2xl:h-[calc((8/1536)*100vw)] 2xl:w-[calc((8/1536)*100vw)] dark:bg-neutral-50"
      onClick={() => setIsDark(!isDark)}
    />
  )
}
