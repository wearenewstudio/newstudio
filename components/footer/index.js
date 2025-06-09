import { CustomLink, Icon, UnicornScene } from 'components'
import { BaseTextClass, BigTextClass, Container, Grid } from 'styles'
import { twMerge } from 'tailwind-merge'

function ContactCol({ className, title, children }) {
  return (
    <div
      className={twMerge(
        '2xl:gap-(--desktop-1) flex flex-col gap-1',
        className,
      )}
    >
      <p className={BaseTextClass('text-neutral-300')}>{title}</p>
      <div className="flex flex-col">{children}</div>
    </div>
  )
}

export default function Footer({ data }) {
  return (
    <section
      id="footer"
      className="2xl:py-(--desktop-5) relative h-screen w-screen py-5 text-neutral-50"
    >
      <Container className="flex h-full w-full flex-col justify-between">
        <Grid>
          <div className="col-start-1 col-end-6">
            <p className={BigTextClass()}>
              Build Your New
              <br />
              Future With Us.
            </p>
          </div>

          <ContactCol className={'col-start-6 col-end-9'} title={'Contact'}>
            <CustomLink href={'mailto:hello@wearenew.studio'}>
              hello@wearenew.studio
            </CustomLink>
          </ContactCol>

          <ContactCol className={'col-start-9 col-end-11'} title={'Socials'}>
            <CustomLink href={'https://www.instagram.com/wearenewstudio'}>
              Instagram
            </CustomLink>
            <CustomLink href={'https://www.linkedin.com/company/newstudio'}>
              LinkedIn
            </CustomLink>
            <CustomLink href={'https://www.dribbble.com'}>Dribbble</CustomLink>
          </ContactCol>

          <ContactCol className={'col-start-11 col-end-13'} title={'Sitemap'}>
            <CustomLink $underline href={'/'}>
              Home
            </CustomLink>
            <CustomLink $underline href={'/work'}>
              Work
            </CustomLink>
            <CustomLink $underline href={'/about'}>
              About
            </CustomLink>
            <CustomLink $underline href={'/services'}>
              Services
            </CustomLink>
            <CustomLink $underline href={'/contact'}>
              Contact
            </CustomLink>
          </ContactCol>
        </Grid>

        <div className="w-full">
          <Icon name="logo" />
        </div>
      </Container>

      <UnicornScene
        projectId={'FVq5PLXHCkcO64upxnI7?production=true'}
        fps={24}
        dpi={1}
        lazyLoad={true}
        className="absolute left-0 top-0 -z-10 h-full w-full"
      />
    </section>
  )
}
