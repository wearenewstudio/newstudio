import { twMerge } from 'tailwind-merge'

export default function Container(props) {
  return (
    <div
      className={twMerge(
        '2xl:px-(--margin-desktop) relative mx-auto px-5',
        props.className,
      )}
    >
      {props.children}
    </div>
  )
}
