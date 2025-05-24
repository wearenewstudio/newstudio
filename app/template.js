'use client'

import { Nav } from 'components'

export default function Template({ children }) {
  return (
    <>
      <Nav />
      <main id="main">{children}</main>
    </>
  )
}
