import { UnicornScene } from 'components'
import { BaseTextClass, Container, DisplayTextClass } from 'styles'

export default function Hero({ data }) {
  return (
    <section id="hero" className="relative h-screen w-screen text-white">
      <Container className="relative flex h-full w-full items-center">
        <div className="relative flex h-full w-full flex-col justify-end gap-[5vh]">
          <h1 className={DisplayTextClass()}>
            {data.split('\n').map((line, index) => (
              <span key={index} className="block">
                {line}
              </span>
            ))}
          </h1>

          <div className="2xl:py-(--desktop-5) flex w-full items-center justify-between py-5">
            <p className={BaseTextClass()}>Scroll</p>
            <p className={BaseTextClass()}>2025</p>
          </div>
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
