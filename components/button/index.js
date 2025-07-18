'use client'

import { slideInOut } from 'components/transition'
import { useTransitionRouter } from 'next-view-transitions'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

export default function CustomButton({
  primary = false,
  secondary = primary === false ? true : false,
  disabled = false,
  href,
  ref,
  onClick,
  children,
  className,
  move = false,
  noTransition,
  ...props
}) {
  const router = useTransitionRouter()

  const classes = twMerge(
    'relative flex w-fit transform items-center justify-center gap-3 px-4 py-2 text-base leading-none backdrop-blur-sm transition-all duration-200 ease-in-out hover:cursor-pointer',
    '2xl:gap-(--desktop-3) 2xl:px-(--desktop-4) 2xl:py-(--desktop-2)',
    '2xl:text-(length:--base-desktop) 2xl:leading-(--base-leading-desktop) text-base leading-5',
    primary &&
      `bg-neutral-200/80 hover:bg-neutral-100 hover:text-neutral-950 dark:bg-neutral-800/80 dark:hover:bg-neutral-900 dark:hover:text-neutral-50`,
    secondary && `hover:bg-neutral-300 hover:text-neutral-950`,
    disabled && 'pointer-events-none opacity-50',
    move && 'hover:-translate-y-1',
    className,
  )

  if (!href || typeof href !== 'string') {
    return (
      <button className={classes} {...props}>
        {children}
      </button>
    )
  }

  const isExternal =
    href.startsWith('http') ||
    href.startsWith('mailto') ||
    href.startsWith('tel')

  const internalLinkProps = {
    ...props,
    target: isExternal ? '_blank' : undefined,
    rel: isExternal ? 'noopener noreferrer' : undefined,
  }

  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault()
      return
    }
    if (onClick) onClick(e)
    if (!isExternal) {
      e.preventDefault()
      router.push(href, { onTransitionReady: slideInOut })
    }
  }

  return (
    <Link
      className={classes}
      ref={ref}
      onClick={!noTransition && handleClick}
      href={href}
      disabled={disabled}
      {...internalLinkProps}
    >
      {children}
    </Link>
  )
}
