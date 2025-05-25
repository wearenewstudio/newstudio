import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

export default function CustomLink({
  children,
  className,
  underline,
  href,
  ...props
}) {
  const isExternal =
    href.startsWith('http') ||
    href.startsWith('mailto') ||
    href.startsWith('tel')

  const styles = twMerge(
    'relative inline-flex h-fit w-fit cursor-pointer items-baseline gap-2 overflow-hidden whitespace-nowrap text-inherit no-underline',
    "before:[content: ''] before:ease-default after:[content: ''] after:ease-default before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:bg-current before:transition-transform before:duration-500 before:will-change-[transform] after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-current after:transition-transform after:duration-500 after:will-change-[transform]",
    'before:origin-[100%_50%]',
    underline || isExternal ? "" : "",
    className,
  )

  const internalLinkProps = {
    ...props,
    target: isExternal ? '_blank' : undefined,
    rel: isExternal ? 'noopener noreferrer' : undefined,
    className: styles,
  }

  return (
    <Link href={href} {...internalLinkProps}>
      {isExternal && (
        <span className="icon icon-b">
          <Icon name="arrow-northeast" />
        </span>
      )}

      <span className="content">{children}</span>

      {isExternal && (
        <span className="icon icon-a">
          <Icon name="arrow-northeast" />
        </span>
      )}
    </Link>
  )
}
