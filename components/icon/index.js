import { forwardRef } from 'react'
import LogoIcon from './logo'
import IconArrowNortheast from './arrow-northeast'

const Icon = forwardRef((props, ref) => {
  switch (props.name) {
    case 'logo':
      return <LogoIcon ref={ref} {...props} />
    case 'arrow-northeast':
      return <IconArrowNortheast ref={ref} {...props} />
    default:
      return null
  }
})

export default Icon
