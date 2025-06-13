import { fetchAPI } from 'lib'
import dynamic from 'next/dynamic'
import { About, Althero, Work } from './components'

// Load Reel component asynchronously
const Reel = dynamic(() => import('./components/reel'), {
  loading: () => <p>Loading...</p>,
})

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
