import { BaseTextClass, Container, Grid } from 'styles'

export default function Wrapper({ children, title }) {
  return (
    <section className="2xl:py-(--desktop-20) relative py-20">
      <Container>
        <Grid>
          <p className={BaseTextClass('col-start-1 col-end-3')}>{title}</p>
          <div className={'col-start-6 col-end-13'}>{children}</div>
        </Grid>
      </Container>
    </section>
  )
}
