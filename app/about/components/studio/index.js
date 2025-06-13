import { HugeTextClass, RenderText } from 'styles'
import Wrapper from '../wrapper'

export default function Studio({ data }) {
  return (
    <Wrapper title={'Our Studio'}>
      <RenderText text={data} className={HugeTextClass()} />
    </Wrapper>
  )
}
