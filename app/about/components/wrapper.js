import { BaseTextClass, Container, Grid } from 'styles'

export default function Wrapper({ children, title, id }) {
  return (
    <section id={id} className="2xl:py-(--desktop-20) relative py-10 sm:py-20">
      <Container>
        <Grid>
          <p className={BaseTextClass('col-start-1 col-end-13 md:col-end-3')}>
            {title}
          </p>
          <div
            className={'col-start-1 col-end-13 md:col-start-4 lg:col-start-4'}
          >
            {children}
          </div>
        </Grid>
      </Container>
    </section>
  )
}
