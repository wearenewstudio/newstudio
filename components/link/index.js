// index.js
'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { Icon, slideInOut } from 'components'
import { useTransitionRouter } from 'next-view-transitions'

export default function CustomLink({
  href,
  fallback = 'div',
  onClick,
  children,
  noTransition = false,
  $underline = false,
  disabled = false,
  className,
  ...props
}) {
  const linkRef = useRef(null)
  const router = useTransitionRouter()

  /*─────────────── 1 ▸ non-link fallback ───────────────*/
  if (!href || typeof href !== 'string') {
    const Tag = fallback
    return (
      <Tag
        ref={linkRef}
        onClick={onClick}
        className={twMerge('inline-block', className)}
        {...props}
      >
        {children}
      </Tag>
    )
  }

  const isExternal =
    href.startsWith('http') ||
    href.startsWith('mailto') ||
    href.startsWith('tel')

  const linkProps = isExternal
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

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

  /*─────────────── 2 ▸ class helpers ───────────────*/
  const withUnderline = $underline || isExternal

  const root = twMerge(
    'group relative inline-flex w-fit cursor-pointer select-none items-center overflow-hidden',
    'text-base leading-5 2xl:text-[length:var(--base-desktop)] 2xl:leading-[var(--base-leading-desktop)]',
    disabled && 'pointer-events-none cursor-default text-neutral-500',
    className,
  )

  const lineBase =
    'absolute left-0 bottom-0 h-px w-full bg-current ' +
    'transition-transform duration-600 ease-[cubic-bezier(0.25,0.1,0.25,1)]'

  const lineA = twMerge(
    lineBase,
    withUnderline
      ? 'origin-right scale-x-100 delay-150 group-hover:scale-x-0 group-hover:delay-0'
      : 'origin-right scale-x-0',
  )

  const lineB = twMerge(
    lineBase,
    withUnderline
      ? 'origin-left scale-x-0 group-hover:scale-x-100 group-hover:delay-150'
      : 'origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100 group-hover:delay-150',
  )

  /*─────────────── 3 ▸ icons & text ───────────────*/
  const iconBase =
    'pointer-events-none transition-all duration-700 ' + // ← guarantees transform **and** opacity animate
    'ease-[cubic-bezier(0.25,0.1,0.25,1)] translate-x-0 translate-y-0 ' +
    'w-[var(--icon-size)] h-[var(--icon-size)] shrink-0'

  /* default arrow – sits at the right of the label */
  const iconA = twMerge(
    iconBase,
    'relative ml-[var(--spacing)]', // centred by flex + this margin
    isExternal &&
      'group-hover:-translate-y-1/2 group-hover:translate-x-[125%] group-hover:opacity-0',
  )

  /* sweeping-in arrow – starts hidden at left */
  const iconB = twMerge(
    iconBase,
    'absolute left-0 top-full -translate-x-[125%] translate-y-0 opacity-0',
    isExternal &&
      'group-hover:top-1/2 group-hover:-translate-y-1/2 ' +
        'group-hover:translate-x-0 group-hover:opacity-100',
  )

  const content =
    'transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ' +
    (isExternal
      ? 'group-hover:translate-x-[calc(var(--icon-size)+var(--spacing))]'
      : '')

  /*─────────────── 4 ▸ render ───────────────*/
  return (
    <Link
      ref={linkRef}
      href={href}
      onClick={!noTransition && handleClick}
      style={{
        '--spacing': '4px',
        '--icon-size': '11px',
      }}
      className={root}
      disabled={disabled}
      {...linkProps}
      {...props}
    >
      {/* underlines */}
      <span aria-hidden className={lineA} />
      <span aria-hidden className={lineB} />

      {/* icon that sweeps in */}
      {isExternal && (
        <span aria-hidden className={iconB}>
          <Icon name="arrow-northeast" />
        </span>
      )}

      {/* label */}
      <span className={content}>{children}</span>

      {/* default icon */}
      {isExternal && (
        <span aria-hidden className={iconA}>
          <Icon name="arrow-northeast" />
        </span>
      )}
    </Link>
  )
}
