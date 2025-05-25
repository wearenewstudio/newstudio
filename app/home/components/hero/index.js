import { UnicornScene } from 'components'
import { Container, DisplayTextClass } from 'styles'

export default function Hero() {
  return (
    <section className="relative h-screen w-screen text-white">
      <Container className="relative flex h-full w-full items-center">
        <h1 className={DisplayTextClass()}>
          Transforming Brands
          <br />
          Building Futures
        </h1>

        <div className="absolute bottom-0 left-0 flex w-full items-center justify-between px-5 py-4">
          <p className="text-base">Scroll</p>
          <p className="text-base">2025</p>
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
