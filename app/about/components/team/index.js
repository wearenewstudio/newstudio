import Image from 'next/image'
import Wrapper from '../wrapper'
import { BaseTextClass, SmallTextClass } from 'styles'

const PARTNERS = [
  {
    name: 'Jonathan Lin',
    image: '/jonathan.webp',
    position: 'Partner, Brands',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    name: 'Kyrylo Orlov',
    image: '/kyrylo.webp',
    position: 'Partner, Digital',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
]

const Partner = ({ name, image, position, description }) => {
  return (
    <div className="flex flex-col">
      <div className="relative aspect-square w-full">
        <Image src={image} alt={name} className="object-cover" fill />
      </div>

      <div className="2xl:mt-(--desktop-3) 2xl:mb-(--desktop-4) mb-4 mt-3 flex flex-col">
        <p className={SmallTextClass()}>{name}</p>
        <p className={BaseTextClass('text-neutral-500')}>{position}</p>
      </div>

      <p className={BaseTextClass()}>{description}</p>
    </div>
  )
}

export default function Team() {
  return (
    <Wrapper title={'Partners'}>
      <div className="2xl:gap-(--desktop-5) xs:grid-cols-2 grid grid-cols-1 gap-10 xs:gap-5">
        {PARTNERS.map((partner) => (
          <Partner
            key={partner.name}
            name={partner.name}
            image={partner.image}
            position={partner.position}
            description={partner.description}
          />
        ))}
      </div>
    </Wrapper>
  )
}
