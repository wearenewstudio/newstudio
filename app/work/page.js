import { CustomLink } from 'components'
import { fetchAPI } from 'lib'
import { Container, DisplayTextClass } from 'styles'
import { IndexSection, WorkSection } from './components'

export const metadata = {
  title: 'Work',
}

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

          <div className="2xl:gap-(--desktop-5) 2xl:pt-(--desktop-10) 2xl:pb-(--desktop-5) flex gap-5 pb-5 pt-10">
            <CustomLink
              $underline={search.index === undefined}
              href={'/work'}
              noTransition
            >
              Work
            </CustomLink>
            <CustomLink
              $underline={search.index !== undefined}
              href={'/work?index'}
              noTransition
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
