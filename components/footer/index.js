import { CustomLink, Icon, UnicornScene } from 'components'
import { BaseTextClass, Container, Grid, HugeTextClass } from 'styles'
import { twMerge } from 'tailwind-merge'

function ContactCol({ className, title, children }) {
  return (
    <div
      className={twMerge(
        '2xl:gap-(--desktop-4) flex flex-col gap-4',
        className,
      )}
    >
      <p className={BaseTextClass('text-neutral-300')}>{title}</p>
      <div className="2xl:gap-(--desktop-1) flex flex-col gap-1">
        {children}
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <footer
      id="footer"
      className="2xl:py-(--desktop-5) h-(--full-height) relative w-screen py-5 text-neutral-50"
    >
      <Container className="flex h-full w-full flex-col justify-between">
        <Grid className="h-fit gap-y-10">
          <div className="col-start-1 col-end-13 md:col-end-6">
            <p className={HugeTextClass()}>
              Build Your New
              <br />
              Future With Us.
            </p>
          </div>

          <ContactCol
            className={
              'xs:col-end-5 col-start-1 col-end-8 md:col-start-6 md:col-end-9'
            }
            title={'Contact'}
          >
            <CustomLink href={'mailto:hello@wearenew.studio'}>
              hello@wearenew.studio
            </CustomLink>
          </ContactCol>

          <ContactCol
            className={
              'xs:col-start-7 xs:col-end-10 col-start-9 col-end-13 md:col-start-9 md:col-end-11'
            }
            title={'Socials'}
          >
            <CustomLink href={'https://www.instagram.com/wearenewstudio'}>
              Instagram
            </CustomLink>
            <CustomLink href={'https://www.github.com/wearenewstudio'}>GitHub</CustomLink>
          </ContactCol>

          <ContactCol
            className={
              'xs:col-start-11 xs:col-end-13 col-start-1 col-end-5 md:col-start-11 md:col-end-13'
            }
            title={'Sitemap'}
          >
            <CustomLink $underline href={'/'}>
              Home
            </CustomLink>
            <CustomLink $underline href={'/work'}>
              Work
            </CustomLink>
            <CustomLink $underline href={'/about'}>
              About
            </CustomLink>
            <CustomLink $underline href={'/about#capabilities'}>
              Capabilities
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
    </footer>
  )
}
