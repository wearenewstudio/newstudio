import { twMerge } from 'tailwind-merge'

export default function Grid(props) {
  return (
    <div
      className={twMerge(
        'w-full h-full grid grid-cols-12 gap-x-5',
        props?.className,
      )}
    >
      {props.children}
    </div>
  )
}
