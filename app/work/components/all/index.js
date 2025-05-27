'use client'

import { BaseTextClass, Grid, Normal, RenderMedia } from 'styles'
import Link from 'next/link'
import { Col } from 'app/[slug]/components/about'

export default function IndexSection({ data }) {
  const sortedData = (data || []).slice().sort((a, b) => {
    const aYear = parseInt(a.attributes.info.year || '0', 10)
    const bYear = parseInt(b.attributes.info.year || '0', 10)
    return bYear - aYear
  })

  return (
    <div className="flex flex-col">
      {sortedData?.map((item, index) => (
        <Link
          className="border-t-1 2xl:py-(--desktop-20) w-full border-t-neutral-300 py-20 no-underline dark:border-t-neutral-800"
          href={item?.attributes?.slug}
          key={index}
        >
          <Grid className="grid">
            <div className="2xl:gap-(--desktop-1) col-start-1 col-end-3 flex flex-col gap-1">
              <p className={BaseTextClass()}>{item?.attributes?.title}</p>
              <p className={BaseTextClass('text-neutral-500')}>
                {item?.attributes?.subtitle}
              </p>
            </div>

            <Col
              className={'col-start-4 col-end-6'}
              title={'Scope'}
              data={item?.attributes?.info?.scope}
            />

            <Col
              className={'col-start-6 col-end-8'}
              title={'Sector'}
              data={item?.attributes?.info?.industry}
            />

            <Col
              className={'col-start-8 col-end-9'}
              title={'Year'}
              data={[{ text: item?.attributes?.info?.year || '—' }]}
            />

            <div className="col-start-9 col-end-13 h-[20svw]">
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
