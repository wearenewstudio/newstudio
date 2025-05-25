import { fetchAPI } from 'lib'
import { About, Hero, Reel, Work } from './components'

export default async function Home() {
  const data = await fetchAPI('/homepage', {
    populate: {
      fields: ['hero_title'],
      work: {
        fields: ['text'],
        populate: {
          selected: {
            fields: ['title', 'subtitle', 'slug'],
            populate: {
              thumbnail: {
                populate: '*',
              },
            },
          },
        },
      },
      reel: {
        populate: '*',
      },
    },
  })
  const doc = data?.data?.attributes

  return (
    <>
      <Hero data={doc?.hero_title} />
      <About />
      <Reel />
      <Work data={doc?.work?.selected?.data} />
    </>
  )
}
