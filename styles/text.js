import { twMerge } from 'tailwind-merge'

export function DisplayTextClass(className) {
  return twMerge(
    '2xl:text-(length:--display-desktop) text-4xl leading-none sm:text-6xl md:text-8xl',
    className,
  )
}
export function HugeTextClass(className) {
  return twMerge(
    '2xl:text-(length:--huge-desktop) text-2xl leading-none sm:text-3xl md:text-5xl',
    className,
  )
}
export function BigTextClass(className) {
  return twMerge(
    '2xl:text-(length:--big-desktop) text-3xl leading-none',
    className,
  )
}
export function SmallTextClass(className) {
  return twMerge(
    '2xl:text-(length:--small-desktop) text-xl leading-none',
    className,
  )
}
export function BaseTextClass(className) {
  return twMerge(
    '2xl:text-(length:--base-desktop) 2xl:leading-(--base-leading-desktop) text-base leading-4',
    className,
  )
}
