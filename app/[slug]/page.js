import { fetchAPI } from 'lib'
import { About, Hero, Case } from './components'

export async function generateMetadata(props) {
  const params = await props.params
  const { slug } = params

  const projectsData = await fetchAPI('/projects', {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      fields: ['title', 'description'],
      info: {
        populate: '*',
      },
    },
  })
  const projectsDoc = projectsData?.data[0]

  return {
    title: projectsDoc?.title,
    description: projectsDoc?.info?.overview,
    alternates: {
      canonical: `https://www.wearenew.studio/${projectsDoc?.slug}`,
    },
    openGraph: {
      title: projectsDoc?.title,
      description: projectsDoc?.info?.overview,
      url: `https://www.wearenew.studio/${projectsDoc?.slug}`,
      type: 'article',
    },
  }
}

export default async function Project(props) {
  const params = await props.params
  const { slug } = params

  const projectsData = await fetchAPI('/projects', {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      fields: ['title', 'description'],
      thumbnail: { populate: '*' },
      info: { populate: '*' },
      // Adjusted population for the dynamic zone: case_study
      case_study: {
        populate: {
          media: {
            populate: '*',
          },
          top: {
            populate: '*',
          },
          bottom: {
            populate: '*',
          },
        },
      },
    },
  })
  const projectsDoc = projectsData?.data[0]?.attributes

  return (
    <>
      <Hero data={projectsDoc?.thumbnail?.data?.attributes} />
      <About data={projectsDoc} />
      <Case data={projectsDoc?.case_study} />
    </>
  )
}
