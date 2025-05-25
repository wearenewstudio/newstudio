import { CustomButton } from 'components'
import { Container, HugeTextClass } from 'styles'

export default function About() {
  return (
    <section className="pb-20 pt-40">
      <Container>
        <div className="max-w-4xl">
          <p className={HugeTextClass()}>
            We are a business transformation studio focused on redefining brand
            experiences and crafting strategies that drive meaninful change.
          </p>

          <div className="mt-10 flex gap-3">
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
