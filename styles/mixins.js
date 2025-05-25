import { twMerge } from 'tailwind-merge'
import Image from 'next/image'

export function RenderMedia({
  fill = false,
  priority = false,
  sizes,
  data,
  className,
  ...props
}) {
  if (data?.mime?.startsWith('image/')) {
    return (
      <div
        className={twMerge('relative h-full w-full overflow-hidden', className)}
        {...props}
      >
        <Image
          src={
            process.env.NEXT_PUBLIC_STRAPI_API_URL + data?.url + '?format=webp'
          }
          alt={data?.alternativeText || 'New Studio Case Study Image'}
          priority={priority}
          fill={fill ? true : data?.width || data?.height ? false : true}
          sizes={sizes}
          className={'h-full w-full object-cover'}
          placeholder={data?.placeholder ? 'blur' : 'empty'}
          blurDataURL={data?.placeholder && data?.placeholder}
          {...(!fill && { width: data?.width, height: data?.height })}
        />
      </div>
    )
  } else if (data?.mime?.startsWith('video/')) {
    return (
      <div
        playsInline
        autoPlay
        muted
        loop
        aria-label={data?.alternativeText || 'New Studio Case Study Video'}
        className={twMerge('h-full w-full object-cover', className)}
        {...props}
      >
        <source src={process.env.NEXT_PUBLIC_STRAPI_API_URL + data?.url} />
      </div>
    )
  }

  return null
}
