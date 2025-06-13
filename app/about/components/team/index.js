import Wrapper from '../wrapper'
import { BaseTextClass, RenderMedia, SmallTextClass } from 'styles'

const Partner = ({ name, image, position, description }) => {
  return (
    <div className="flex flex-col">
      <div className="relative aspect-square w-full overflow-hidden">
        <RenderMedia data={image} />
      </div>

      <div className="2xl:mt-(--desktop-3) 2xl:mb-(--desktop-4) mb-4 mt-3 flex flex-col">
        <p className={SmallTextClass()}>{name}</p>
        <p className={BaseTextClass('text-neutral-500')}>{position}</p>
      </div>

      <p className={BaseTextClass()}>{description}</p>
    </div>
  )
}

export default function Team({ data }) {
  return (
    <Wrapper title={'Partners'}>
      <div className="2xl:gap-(--desktop-5) xs:grid-cols-2 xs:gap-5 grid grid-cols-1 gap-10">
        {data?.map((partner) => (
          <Partner
            key={partner?.id}
            name={partner?.name}
            image={partner?.media?.data?.attributes}
            position={partner?.position}
            description={partner?.description}
          />
        ))}
      </div>
    </Wrapper>
  )
}
