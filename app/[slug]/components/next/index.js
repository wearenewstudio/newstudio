'use client'

import { slideInOut } from 'components'
import { useTransitionRouter } from 'next-view-transitions'
import Link from 'next/link'
import { BaseTextClass, BigTextClass, Container, RenderMedia } from 'styles'

export default function Next({ data }) {
  const router = useTransitionRouter()

  const handleLinkClick = (e, slug) => {
    e.preventDefault(e)
    router.push(`/${slug}`, { onTransitionReady: slideInOut })
  }

  return (
    <section className="2xl:pt-(--desktop-40) relative pt-40">
      <Link
        href={`/${data?.slug}`}
        onClick={(e) => handleLinkClick(e, data?.slug)}
      >
        <Container>
          <div className="2xl-mb-(--desktop-5) pointer-events-none mb-5 h-[1px] w-full bg-neutral-300 dark:bg-neutral-800" />

          <p className={BaseTextClass('text-neutral-500')}>Next Project</p>

          <div className="2xl:py-(--desktop-10) 2xl:gap-(--desktop-1) flex flex-col gap-1 py-10">
            <h3 className={BigTextClass()}>{data?.title}</h3>
            <p className={BaseTextClass('max-w-100 2xl:max-w-[20vw]')}>
              {data?.subtitle}
            </p>
          </div>

          <RenderMedia
            data={data?.thumbnail?.data?.attributes}
            className={'h-60'}
            sizes="97.67vw"
            fill
          />
        </Container>
      </Link>
    </section>
  )
}
