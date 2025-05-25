import { twMerge } from 'tailwind-merge'

export function DisplayTextClass(className) {
  return twMerge('text-8xl leading-none', className)
}
export function HugeTextClass(className) {
  return twMerge('text-5xl leading-none', className)
}
export function BigTextClass(className) {
  return twMerge('text-3xl leading-none', className)
}
export function SmallTextClass(className) {
  return twMerge('text-xl leading-none', className)
}
export function BaseTextClass(className) {
  return twMerge('text-base leading-5', className)
}
