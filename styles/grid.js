import { twMerge } from 'tailwind-merge'

export default function Grid(props) {
  return (
    <div
      className={twMerge(
        'grid h-full w-full grid-cols-12 gap-5',
        props?.className,
      )}
    >
      {props.children}
    </div>
  )
}
