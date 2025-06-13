import { fetchAPI } from 'lib'
import { Capabilities, Hero, Studio, Team } from './components'

export const metadata = {
  title: 'About Us',
}

export default async function About() {
  const data = await fetchAPI('/about', {
    populate: {
      fields: ['description', 'capabilities_text'],
      capability: {
        populate: '*',
      },
      Partners: {
        fields: ['name', 'position', 'description'],
        populate: {
          media: {
            populate: '*',
          },
        },
      },
    },
  })
  const doc = data?.data?.attributes

  console.log(doc)

  return (
    <>
      <Hero />
      <Studio data={doc?.description} />
      <Capabilities data={doc} />
      <Team data={doc?.Partners} />
    </>
  )
}
