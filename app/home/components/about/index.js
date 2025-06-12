import { CustomButton } from 'components'
import { Container, HugeTextClass } from 'styles'

export default function About() {
  return (
    <section className="relative py-[clamp(5rem,10vw,10rem)] 2xl:py-(--desktop-40)">
      <Container>
        <div className="2xl:max-w-3/5 max-w-4xl">
          <p className={HugeTextClass()}>
            We are a <u>business transformation studio</u> focused on redefining
            brand experiences and crafting strategies that drive meaninful
            change.
          </p>

          <div className="2xl:mt-(--desktop-10) 2xl:gap-(--desktop-3) mt-10 flex gap-3">
            <CustomButton primary href={'/about'}>
              See our capabilities
            </CustomButton>
            <CustomButton primary href={'/about'}>
              Explore Studio
            </CustomButton>
          </div>
        </div>
      </Container>
    </section>
  )
}
