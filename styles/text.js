import { twMerge } from 'tailwind-merge'

export function DisplayTextClass(className) {
  return twMerge(
    'text-[clamp(2.5rem,10vw,6rem)] leading-none 2xl:text-(length:--display-desktop)',
    className,
  )
}
export function HugeTextClass(className) {
  return twMerge(
    'text-[clamp(1.75rem,7vw,3rem)] leading-none 2xl:text-(length:--huge-desktop)',
    className,
  )
}
export function BigTextClass(className) {
  return twMerge(
    'text-[clamp(1.5rem,5vw,2.25rem)] leading-none 2xl:text-(length:--big-desktop)',
    className,
  )
}
export function SmallTextClass(className) {
  return twMerge(
    'text-[clamp(1rem,4vw,1.25rem)] leading-none 2xl:text-(length:--small-desktop)',
    className,
  )
}
export function BaseTextClass(className) {
  return twMerge('text-[clamp(0.875rem,3.5vw,1rem)] leading-4 2xl:text-(length:--base-desktop) 2xl:leading-(--base-leading-desktop)', className)
}
