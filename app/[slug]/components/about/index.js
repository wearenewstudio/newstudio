import { BaseTextClass, BigTextClass, Container, Grid } from 'styles'

function Col({ title, data }) {
  return (
    <div className="2xl:gap-[var(--vw-unit) * 4] flex flex-col gap-1">
      <p className={BaseTextClass('text-neutral-500')}>{title}</p>
      <div className="flex flex-col">
        {data?.map((item, index) => (
          <p className={BaseTextClass()} key={index}>
            {item?.text}
          </p>
        ))}
      </div>
    </div>
  )
}

export default function About({ data }) {
  return (
    <section className="relative pb-40 2xl:pb-[calc(var(--vw-unit)*160)]">
      <Container>
        <Grid>
          <h3 className={BigTextClass('col-start-1 col-end-5')}>
            {data?.title}
          </h3>

          <div className="col-start-5 col-end-7 flex flex-col gap-5 2xl:gap-[calc(var(--vw-unit)*20)]">
            <Col title={'Sector'} data={data?.info?.industry} />
            <Col title={'Scope'} data={data?.info?.scope} />
          </div>

          <div className="col-start-7 col-end-9 flex flex-col gap-5 2xl:gap-[calc(var(--vw-unit)*20)]">
            {data?.info?.partner?.length !== 0 && (
              <Col title={'Partner'} data={data?.info?.partner} />
            )}

            {data?.info?.team?.length !== 0 && (
              <Col title={'Team'} data={data?.info?.team} />
            )}
            {data?.info?.collaborator?.length !== 0 && (
              <Col title={'Collaborators'} data={data?.info?.collaborator} />
            )}
          </div>

          <div className="col-start-9 col-end-13 flex flex-col gap-1 2xl:gap-[calc(var(--vw-unit)*4)]">
            <p className={BaseTextClass('text-neutral-500')}>Overview</p>

            <p className={BaseTextClass()}>{data?.info?.overview}</p>
          </div>
        </Grid>
      </Container>
    </section>
  )
}
