'use client'

import { BaseTextClass, Grid, RenderMedia } from 'styles'
import Link from 'next/link'
import { Col } from 'app/[slug]/components/about'
import { useTransitionRouter } from 'next-view-transitions'
import { slideInOut } from 'components'

export default function IndexSection({ data }) {
  const router = useTransitionRouter()

  const sortedData = (data || []).slice().sort((a, b) => {
    const aYear = parseInt(a.attributes.info.year || '0', 10)
    const bYear = parseInt(b.attributes.info.year || '0', 10)
    return bYear - aYear
  })

  return (
    <div className="flex flex-col">
      {sortedData?.map((item, index) => (
        <Link
          className="border-t-1 2xl:py-(--desktop-20) w-full border-t-neutral-300 py-10 no-underline sm:py-20 dark:border-t-neutral-800"
          href={item?.attributes?.slug}
          onClick={(e) => {
            e.preventDefault()
            router.push(`/${item?.attributes?.slug}`, {
              onTransitionReady: slideInOut,
            })
          }}
          key={index}
        >
          <Grid className="grid">
            <div className="2xl:gap-(--desktop-1) col-start-1 col-end-13 flex flex-col gap-1 sm:col-end-3">
              <p className={BaseTextClass()}>{item?.attributes?.title}</p>
              <p className={BaseTextClass('text-neutral-500')}>
                {item?.attributes?.subtitle}
              </p>
            </div>

            <Col
              className={'mt-5 sm:mt-0 col-start-1 col-end-6 sm:col-start-4 sm:col-end-6'}
              title={'Scope'}
              data={item?.attributes?.info?.scope}
            />

            <Col
              className={'mt-5 sm:mt-0 col-start-6 col-end-10 sm:col-start-6 sm:col-end-8'}
              title={'Sector'}
              data={item?.attributes?.info?.industry}
            />

            <Col
              className={'mt-5 sm:mt-0 col-start-11 col-end-13 sm:col-start-8 sm:col-end-9'}
              title={'Year'}
              data={[{ text: item?.attributes?.info?.year || '—' }]}
            />

            <div className="col-start-1 col-end-13 h-60 sm:col-start-9 sm:h-[20svw]">
              <RenderMedia
                priority={index === 0 ? true : false}
                data={item?.attributes?.thumbnail?.data?.attributes}
                sizes="33.33vw"
                fill
              />
            </div>
          </Grid>
        </Link>
      ))}
    </div>
  )
}
