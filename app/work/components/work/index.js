'use client'

import { BaseTextClass, Grid, RenderMedia, SmallTextClass } from 'styles'
import Link from 'next/link'

export default function WorkSection({ data }) {
  return (
    <Grid>
      {data.map((project, index) => (
        <Link
          className="2xl:pb-[var(--vw-unit) * 20] col-span-12 flex flex-col pb-5 md:col-span-6"
          key={index}
          href={`/${project.attributes.slug}`}
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
              '2xl:mb-[var(--vw-unit) * 4] 2xl:mt-[var(--vw-unit) * 12] mb-1 mt-3',
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
