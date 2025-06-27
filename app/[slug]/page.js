import { fetchAPI } from 'lib'
import { About, Hero, Case, Next } from './components'

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
      thumbnail: { populate: '*' },
    },
  })
  const projectsDoc = projectsData?.data[0]?.attributes

  return {
    title: projectsDoc?.title,
    description: projectsDoc?.subtitle,
    alternates: {
      canonical: `https://www.wearenew.studio/${projectsDoc?.slug}`,
    },
    openGraph: {
      title: `${projectsDoc?.title} | New Studio`,
      description: projectsDoc?.subtitle,
      url: `https://www.wearenew.studio/${projectsDoc?.slug}`,
      type: 'article',
      siteName: 'Case Study by New Studio',
      images: {
        url: projectsDoc?.thumbnail?.data?.attributes?.mime?.startsWith(
          'image/',
        )
          ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL + projectsDoc?.thumbnail?.data?.attributes?.url + `?width=1200&height=630&fit=crop`}`
          : undefined,
        width: 1200,
        height: 630,
      },
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
  // Fetch the next project after the current slug (ordered by id)
  let nextProjectsData = await fetchAPI('/projects', {
    filters: {
      id: {
        $gt: projectsData?.data[0]?.id,
      },
    },
    sort: ['id:asc'],
    pagination: {
      limit: 1,
    },
    populate: {
      fields: ['title', 'description', 'slug'],
      thumbnail: { populate: '*' },
      info: { populate: '*' },
      case_study: {
        populate: {
          media: { populate: '*' },
          top: { populate: '*' },
          bottom: { populate: '*' },
        },
      },
    },
  })

  // If there is no next project, fetch the first one (loop back)
  if (!nextProjectsData?.data?.length) {
    nextProjectsData = await fetchAPI('/projects', {
      sort: ['id:asc'],
      pagination: {
        limit: 1,
      },
      populate: {
        fields: ['title', 'description', 'slug'],
        thumbnail: { populate: '*' },
        info: { populate: '*' },
        case_study: {
          populate: {
            media: { populate: '*' },
            top: { populate: '*' },
            bottom: { populate: '*' },
          },
        },
      },
    })
  }
  const projectsDoc = projectsData?.data[0]?.attributes
  const nextProjectDoc = nextProjectsData?.data[0]?.attributes

  return (
    <>
      <Hero data={projectsDoc?.thumbnail?.data?.attributes} />
      <About data={projectsDoc} />
      <Case data={projectsDoc?.case_study} />
      <Next data={nextProjectDoc} />
    </>
  )
}
