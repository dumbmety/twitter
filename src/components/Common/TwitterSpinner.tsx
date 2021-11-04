import styled from 'styled-components'
import ReactLoading from 'react-loading'
import theme from '../../styles/ThemeStyles'

type Props = {
  size?: number
}

export default function TwitterSpinner(props: Props) {
  return (
    <Loading>
      <ReactLoading type="spin" width={props.size} height={props.size} />
    </Loading>
  )
}

const Loading = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 0.5rem;
  background: ${theme.dark.backgroundBox};
  display: grid;
  place-items: center;
`
