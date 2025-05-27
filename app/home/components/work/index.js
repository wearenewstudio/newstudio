import Link from 'next/link'
import {
  BaseTextClass,
  BigTextClass,
  Container,
  Grid,
  RenderMedia,
  SmallTextClass,
} from 'styles'

export default function Work({ data }) {
  return (
    <section className="2xl:mt-(--desktop-40) relative mt-40">
      <Container>
        <div className="pointer-events-none h-[1px] w-full bg-neutral-500" />
        <h2
          className={BigTextClass(
            '2xl:pb-(--desktop-10) 2xl:pt-(--desktop-4) pb-10 pt-4',
          )}
        >
          Selected Work
        </h2>

        <Grid className="2xl:gap-y-(--desktop-20) gap-y-20">
          {data?.map((_, index) => {
            let colClasses
            switch (index) {
              case 0:
                colClasses = 'col-start-1 col-end-13 md:col-end-5'
                break
              case 1:
                colClasses = 'col-start-1 col-end-13 md:col-start-6'
                break
              case 2:
                colClasses = 'col-start-1 col-end-13 md:col-end-8'
                break
              case 3:
                colClasses = 'col-start-1 col-end-13 md:col-start-9'
                break
              default:
                colClasses = ''
            }
            return (
              <Link
                className={`flex h-fit w-full flex-col ${colClasses}`}
                href={`/${_?.attributes?.slug}`}
                key={index}
              >
                <RenderMedia
                  data={_?.attributes?.thumbnail?.data?.attributes}
                  fill
                  className={'aspect-[3/2]'}
                  sizes={
                    index === 0
                      ? 'calc(34.52vw - 18px)'
                      : index === 1
                        ? `calc(59.19vw - 17px)`
                        : index === 2
                          ? 'calc(61.07vw - 17px)'
                          : 'calc(41.52vw - 22px)'
                  }
                />
                <p
                  className={SmallTextClass(
                    '2xl:mb-(--desktop-1) 2xl:mt-(--desktop-3) mb-1 mt-3',
                  )}
                >
                  {_?.attributes?.title}
                </p>
                <p className={BaseTextClass('text-neutral-500')}>
                  {_?.attributes?.subtitle}
                </p>
              </Link>
            )
          })}
        </Grid>
      </Container>
    </section>
  )
}
