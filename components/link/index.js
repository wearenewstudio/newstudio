// index.js
'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { Icon } from 'components'

export default function CustomLink({
  href,
  fallback = 'div',
  onClick,
  children,
  $underline = false,
  className,
  ...props
}) {
  const linkRef = useRef(null)

  /*──────────────────────────────────
   * 1 ▸ handle non-link fallback
   *─────────────────────────────────*/
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

  /*──────────────────────────────────
   * 2 ▸ external / internal
   *─────────────────────────────────*/
  const isExternal =
    href.startsWith('http') ||
    href.startsWith('mailto') ||
    href.startsWith('tel')

  const linkProps = isExternal
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  const handleClick = (e) => {
    if (onClick) onClick(e)
    if (!isExternal) {
      e.preventDefault()
    }
  }

  /*──────────────────────────────────
   * 3 ▸ underline logic
   *─────────────────────────────────*/
  const withUnderline = $underline || isExternal

  /*──────────────────────────────────
   * 4 ▸ classes
   *─────────────────────────────────*/
  const fontSize = `2xl:text-(length:--base-desktop) 2xl:leading-(--base-leading-desktop) text-base leading-5`

  const root = twMerge(
    'group relative inline-flex items-center whitespace-nowrap ' +
      'w-fit cursor-pointer select-none',
    fontSize,
    className,
  )

  const lineBase =
    'absolute left-0 bottom-0 h-px w-full bg-current ' +
    'transition-transform duration-600 ease-[cubic-bezier(0.25,0.1,0.25,1)]'

  /*  line-A  (the one that disappears on hover)  */
  const lineA = twMerge(
    lineBase,
    withUnderline
      ? 'origin-right scale-x-100 delay-150 group-hover:scale-x-0 group-hover:delay-0'
      : 'origin-right scale-x-0',
  )

  /*  line-B  (the one that sweeps in)  */
  const lineB = twMerge(
    lineBase,
    withUnderline
      ? 'origin-left scale-x-0 group-hover:scale-x-100 group-hover:delay-150'
      : 'origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100 group-hover:delay-150',
  )

  /*  icon + content motion (external links only)  */
  const iconA =
    'icon-a relative w-[--icon-size] pointer-events-none ' +
    'transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ' +
    (isExternal
      ? 'group-hover:translate-x-[125%] group-hover:-translate-y-1/2 group-hover:opacity-0'
      : '')

  const iconB =
    'icon-b absolute left-0 top-1/2 w-[--icon-size] -translate-x-[125%] -translate-y-1/2 opacity-0 ' +
    'pointer-events-none transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ' +
    (isExternal
      ? 'group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100'
      : '')

  const content =
    'content transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ' +
    (isExternal ? 'group-hover:translate-x-[var(--shift)]' : '')

  /*──────────────────────────────────
   * 5 ▸ render
   *─────────────────────────────────*/
  return (
    <Link
      ref={linkRef}
      href={href}
      onClick={handleClick}
      style={{
        /* tweak these two numbers to change spacing + icon size */
        '--spacing': '4px',
        '--icon-size': '11px',
        '--shift': 'calc(var(--icon-size) + var(--spacing))',
      }}
      className={root}
      {...linkProps}
      {...props}
    >
      {/* underline spans (replace pseudo-elements) */}
      <span aria-hidden className={lineA} />
      <span aria-hidden className={lineB} />

      {/*  icons + label  */}
      {isExternal && (
        <span aria-hidden className={iconB}>
          <Icon name="arrow-northeast" />
        </span>
      )}

      <span className={content}>{children}</span>

      {isExternal && (
        <span aria-hidden className={iconA}>
          <Icon name="arrow-northeast" />
        </span>
      )}
    </Link>
  )
}
