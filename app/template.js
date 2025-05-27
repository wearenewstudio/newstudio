import { Nav, ScrollBar } from 'components'
import { Lenis } from 'components'

export default function Template({ children }) {
  return (
    <>
      <Nav />
      <main id="main">{children}</main>
      <ScrollBar />
      <Lenis root />
    </>
  )
}
