import { twMerge } from 'tailwind-merge'

export function DisplayTextClass(className) {
  return twMerge(
    '2xl:text-(length:--display-desktop) text-8xl leading-none',
    className,
  )
}
export function HugeTextClass(className) {
  return twMerge(
    '2xl:text-(length:--huge-desktop) text-5xl leading-none',
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
  return twMerge('text-base leading-4', className)
}
