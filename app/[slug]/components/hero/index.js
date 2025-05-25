import { Container, RenderMedia } from 'styles'

export default function Hero({ data }) {
  return (
    <section className="relative h-full w-full pb-5 pt-20">
      <Container>
        <RenderMedia className={'h-[90svh]'} data={data} sizes="97.67vw" fill />
      </Container>
    </section>
  )
}
