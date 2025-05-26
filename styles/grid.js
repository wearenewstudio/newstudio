import { twMerge } from 'tailwind-merge'

export default function Grid(props) {
  return (
    <div
      className={twMerge(
        'grid h-full w-full grid-cols-12 gap-5 2xl:gap-[calc((20/1536)*100vw)]',
        props?.className,
      )}
    >
      {props.children}
    </div>
  )
}
