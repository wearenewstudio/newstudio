import { BaseTextClass, BigTextClass, Container, Grid } from 'styles'
import { twMerge } from 'tailwind-merge'

export function Col({ title, data, className }) {
  return (
    <div
      className={twMerge(
        '2xl:gap-(--desktop-1) flex flex-col gap-1',
        className,
      )}
    >
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
    <section className="2xl:pb-(--desktop-40) relative pb-40">
      <Container>
        <Grid>
          <h3 className={BigTextClass('xs:col-end-5 col-start-1 col-end-13')}>
            {data?.title}
          </h3>

          <div className="2xl:gap-(--desktop-5) xs:col-start-6 xs:col-end-8 col-start-1 col-end-5 flex flex-col gap-5 sm:col-start-5 sm:col-end-7">
            <Col title={'Sector'} data={data?.info?.industry} />
            <Col title={'Scope'} data={data?.info?.scope} />
          </div>

          <div className="2xl:gap-(--desktop-5) xs:col-start-9 col-start-6 col-end-13 flex flex-col gap-5 sm:col-start-7 sm:col-end-9">
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

          <div className="2xl:gap-(--desktop-1) xs:col-start-6 col-start-1 col-end-13 flex flex-col gap-1 sm:col-start-9">
            <p className={BaseTextClass('text-neutral-500')}>Overview</p>

            <p className={BaseTextClass()}>{data?.info?.overview}</p>
          </div>
        </Grid>
      </Container>
    </section>
  )
}
