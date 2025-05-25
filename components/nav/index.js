import Link from 'next/link'
import { CustomButton, Icon } from 'components'
import { Container, Grid } from 'styles'

export default function Nav() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full py-2">
      <Container>
        <div className="flex w-full items-center justify-between">
          <Link className="w-24 text-neutral-50" href={'/'}>
            <Icon name="logo" />
          </Link>

          <nav className="flex items-center gap-1">
            <CustomButton primary move href={'/work'}>
              Work
            </CustomButton>
            <CustomButton primary move href={'/about'}>
              About
            </CustomButton>
            <CustomButton primary move href={'/insights'}>
              Insights
            </CustomButton>
            <CustomButton primary move href={'/contact'}>
              Contact
            </CustomButton>
          </nav>
        </div>
      </Container>
    </header>
  )
}
