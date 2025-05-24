import Link from 'next/link'
import { CustomButton, Icon } from 'components'
import { Container, Grid } from 'styles'

export default function Nav() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full py-2 text-neutral-50">
      <Container>
        <Grid className="items-center">
          <Link className="col-span-6 w-24" href={'/'}>
            <Icon name="logo" />
          </Link>

          <CustomButton className={'col-start-10 ml-auto'} href={'/work'}>
            Work
          </CustomButton>
          <CustomButton className={'col-start-11 ml-auto'} href={'/about'}>
            About
          </CustomButton>
          <CustomButton className={'col-start-12 ml-auto'} href={'/insights'}>
            Insights
          </CustomButton>
          <CustomButton className={'col-start-13 ml-auto'} href={'/contact'}>
            Contact
          </CustomButton>
        </Grid>
      </Container>
    </header>
  )
}
