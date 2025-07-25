'use client'

import { BaseTextClass, Grid, RenderMedia, SmallTextClass } from 'styles'
import { useTransitionRouter } from 'next-view-transitions'
import Link from 'next/link'
import { slideInOut } from 'components'

export default function WorkSection({ data }) {
  const router = useTransitionRouter()

  return (
    <Grid>
      {data.map((project, index) => (
        <Link
          className="2xl:pb-(--desktop-5) col-span-12 flex flex-col pb-5 md:col-span-6"
          key={index}
          href={`/${project?.attributes?.slug}`}
          onClick={(e) => {
            e.preventDefault()
            router.push(`/${project?.attributes?.slug}`, {
              onTransitionReady: slideInOut,
            })
          }}
        >
          <div className={'aspect-[3/2] w-full overflow-hidden'}>
            <RenderMedia
              fill
              data={project?.attributes?.thumbnail?.data?.attributes}
              sizes="54.63vw"
              priority={index < 1}
            />
          </div>

          <p
            className={SmallTextClass(
              '2xl:mb-(--desktop-1) 2xl:mt-(--desktop-3) mb-1 mt-3',
            )}
          >
            {project.attributes.title}
          </p>
          <p className={BaseTextClass('text-neutral-500')}>
            {project.attributes.subtitle}
          </p>
        </Link>
      ))}
    </Grid>
  )
}
