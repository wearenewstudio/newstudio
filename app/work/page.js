import { CustomLink } from 'components'
import { fetchAPI } from 'lib'
import { Container, DisplayTextClass } from 'styles'
import { IndexSection, WorkSection } from './components'

export default async function Work({ searchParams }) {
  const data = await fetchAPI('/projects', {
    populate: {
      fields: ['title', 'subtitle', 'slug'],
      thumbnail: { populate: '*' },
      info: { populate: '*' },
    },
  })

  const doc = data.data

  const search = await searchParams

  return (
    <>
      <section className="relative py-[20vh]">
        <Container>
          <h1 className={DisplayTextClass()}>
            {search.index === undefined ? 'Work' : 'Index'}
          </h1>

          <div className="2xl:gap-[calc(var(--vw-unit) * 16)] 2xl:pb-[calc(var(--vw-unit) * 20)] 2xl:pt-[calc(var(--vw-unit) * 40)] flex gap-4 pt-10 pb-5">
            <CustomLink $underline={search.index === undefined} href={'/work'}>
              Work
            </CustomLink>
            <CustomLink
              $underline={search.index !== undefined}
              href={'/work?index'}
            >
              Index
            </CustomLink>
          </div>

          {search.index === undefined ? (
            <WorkSection data={doc} />
          ) : (
            <IndexSection data={doc} />
          )}
        </Container>
      </section>
    </>
  )
}
