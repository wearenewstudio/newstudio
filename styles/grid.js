import { twMerge } from 'tailwind-merge'

export default function Grid(props) {
  return (
    <div
      className={twMerge(
        'grid h-full w-full grid-cols-12 gap-3 md:gap-5 2xl:gap-(--desktop-5)',
        props?.className,
      )}
    >
      {props.children}
    </div>
  )
}
