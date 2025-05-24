import { UnicornScene } from 'components'
import { Container, DisplayTextClass } from 'styles'

export default function Hero() {
  return (
    <section className="relative">
      <UnicornScene
        projectId={'FVq5PLXHCkcO64upxnI7?production=true'}
        fps={24}
        dpi={1}
        lazyLoad={true}
        style={{
          position: 'relative',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
        }}
      />
    </section>
  )
}
