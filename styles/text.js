import { twMerge } from 'tailwind-merge'

export function DisplayTextClass(className) {
  return twMerge('text-8xl leading-none', className)
}
