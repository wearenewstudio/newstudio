import { Container } from 'styles'

export default function Reel() {
  return (
    <Container>
      <video
        className="aspect-video h-auto w-full overflow-hidden"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/vid.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </Container>
  )
}
