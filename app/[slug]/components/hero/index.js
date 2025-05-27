import { Container, RenderMedia } from 'styles'

export default function Hero({ data }) {
  return (
    <section className="2xl:pb-(--desktop-5) 2xl:pt-(--desktop-20) relative h-full w-full pb-5 pt-20">
      <Container>
        <RenderMedia
          className={'h-[90svh] portrait:h-[60svw]'}
          data={data}
          sizes="97.67vw"
          fill
        />
      </Container>
    </section>
  )
}
