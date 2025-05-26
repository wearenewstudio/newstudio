import { Container, RenderMedia } from 'styles'

export default function Hero({ data }) {
  return (
    <section className="relative h-full w-full pb-5 pt-20 2xl:pb-[calc(var(--vw-unit)*20)] 2xl:pt-[calc(var(--vw-unit)*80)]">
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
