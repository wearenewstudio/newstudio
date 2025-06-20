import { BaseTextClass, HugeTextClass, SmallTextClass } from 'styles'
import Wrapper from '../wrapper'

const Card = ({ title, description }) => {
  return (
    <div className="2xl:p-(--desktop-5) 2xl:gap-(--desktop-5) flex flex-col gap-5 bg-neutral-100 p-5 dark:bg-neutral-900">
      <p className={SmallTextClass()}>{title}</p>
      <p className={BaseTextClass()}>{description}</p>
    </div>
  )
}

export default function Capabilities({ data }) {
  return (
    <Wrapper id={'capabilities'} title={'Capabilities'}>
      <p className={HugeTextClass()}>{data?.capabilities_text}</p>

      <div className="2xl:gap-(--desktop-5) 2xl:mt-(--desktop-10) xs:grid-cols-2 mt-10 grid grid-cols-1 gap-5">
        {data?.capability?.map((card, index) => (
          <Card key={index} title={card?.title} description={card?.text} />
        ))}
      </div>
    </Wrapper>
  )
}
