import { twMerge } from 'tailwind-merge'

export default function Container(props) {
  return (
    <div
      className={twMerge(
        'relative mx-auto px-4 sm:px-5 2xl:px-(--desktop-5)',
        props.className,
      )}
    >
      {props.children}
    </div>
  )
}
