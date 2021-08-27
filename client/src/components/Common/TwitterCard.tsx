import styled from 'styled-components'
import theme from '../../styles/ThemeStyles'

interface ITwitterCard {
  children: any
}

export default function TwitterCard(props: ITwitterCard) {
  return <Card>{props.children}</Card>
}

const Card = styled.div`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border-top-left-radius: 0;
  box-shadow: 0 6px 12px rgba(38, 46, 54, 0.2);
  background: ${theme.dark.backgroundCard};
`
