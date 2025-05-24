import { forwardRef } from 'react'
import LogoIcon from './logo'

const Icon = forwardRef((props, ref) => {
  switch (props.name) {
    case 'logo':
      return <LogoIcon ref={ref} {...props} />
    default:
      return null
  }
})

export default Icon
