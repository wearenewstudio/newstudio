import { BaseTextClass, HugeTextClass, SmallTextClass } from 'styles'
import Wrapper from '../wrapper'

const CARDS = [
  {
    title: 'New Revenue Model',
    description:
      'When your business model evolves, opening profitable new channels.',
  },
  {
    title: 'Innovation Launch',
    description:
      'When new products or services must achieve immediate market traction.',
  },
  {
    title: 'Strategic Pivot',
    description:
      'When you reposition your brand to capture unmet market demand.',
  },
  {
    title: 'Market Opportunity',
    description:
      'When you enter or create markets with powerful new revenue potential.',
  },
  {
    title: 'Growth Surge',
    description:
      'When rapid growth requires strategic brand evolution to sustain momentum.',
  },
  {
    title: 'Organizational Shift',
    description:
      'When internal changes must quickly translate into commercial success.',
  },
  {
    title: 'Competitive Disruption',
    description:
      'When market threats become opportunities to accelerate brand.',
  },
  {
    title: 'Leadership Inflection',
    description:
      'When new leadership must rapidly deliver clear growth results.',
  },
]

const Card = ({ title, description }) => {
  return (
    <div className="2xl:p-(--desktop-5) 2xl:gap-(--desktop-5) flex flex-col gap-5 bg-neutral-100 p-5 dark:bg-neutral-900">
      <p className={SmallTextClass()}>{title}</p>
      <p className={BaseTextClass()}>{description}</p>
    </div>
  )
}

export default function Capabilities() {
  return (
    <Wrapper title={'Capabilities'}>
      <p className={HugeTextClass()}>
        We offer eight programs tailored to each type of transformation.
      </p>

      <div className="2xl:gap-(--desktop-5) 2xl:mt-(--desktop-10) mt-10 grid grid-cols-1 xs:grid-cols-2 gap-5">
        {CARDS.map((card, index) => (
          <Card key={index} title={card.title} description={card.description} />
        ))}
      </div>
    </Wrapper>
  )
}
