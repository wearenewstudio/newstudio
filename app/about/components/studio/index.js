import { HugeTextClass } from 'styles'
import Wrapper from '../wrapper'

export default function Studio({ data }) {
  return (
    <Wrapper title={'Our Studio'}>
      <p className={HugeTextClass()}>{data}</p>
    </Wrapper>
  )
}
