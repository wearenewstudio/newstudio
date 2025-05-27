import { fetchAPI } from 'lib'
import { About, Althero, Hero, Reel, Work } from './components'

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
      <Althero data={doc?.hero_title} />
      <Reel />
      <About />
      <Work data={doc?.work?.selected?.data} />
    </>
  )
}
