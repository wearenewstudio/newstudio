import { CustomButton } from 'components'
import { Container, HugeTextClass } from 'styles'

export default function About() {
  return (
    <section className="2xl:py-(--desktop-40) relative py-10 md:py-40">
      <Container>
        <div className="2xl:max-w-3/5 max-w-4xl">
          <p className={HugeTextClass()}>
            We are a{' '}
            <span className="after:border-b-1">
              business transformation studio
            </span>{' '}
            focused on redefining brand experiences and crafting strategies that
            drive meaninful change.
          </p>

          <div className="2xl:mt-(--desktop-10) 2xl:gap-(--desktop-3) mt-10 flex gap-3">
            <CustomButton move primary href={'/about'}>
              See our capabilities
            </CustomButton>
            <CustomButton move primary href={'/about'}>
              Explore studio
            </CustomButton>
          </div>
        </div>
      </Container>
    </section>
  )
}
