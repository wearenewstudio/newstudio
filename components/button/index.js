'use client'

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
  ...props
}) {
  const classes = twMerge(
    'relative flex w-fit transform items-center justify-center gap-3 px-5 py-2 text-base leading-none hover:cursor-pointer',
    primary && `bg-gray-800`,
    secondary && `hover:bg-neutral-200`,
    disabled && 'pointer-events-none opacity-50',
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

  return (
    <Link
      className={classes}
      ref={ref}
      onClick={(e) => {
        onClick?.(e)
      }}
      href={href}
      disabled={disabled}
      {...internalLinkProps}
    >
      {children}
    </Link>
  )
}
