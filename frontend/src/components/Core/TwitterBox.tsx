import styled from 'styled-components'
import theme from '../../styles/ThemeStyles'

interface ITwitterBox {
  children: any
}

export default function TwitterBox(props: ITwitterBox) {
  return <Box>{props.children}</Box>
}

const Box = styled.div`
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 6px 12px rgba(38, 46, 54, 0.2);
  background: ${theme.dark.backgroundBox};
`
