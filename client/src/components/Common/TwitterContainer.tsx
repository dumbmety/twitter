import styled from 'styled-components'

interface ITwitterContainer {
  size: 'xs' | 'sm' | 'md' | 'lg'
  children: any
}

interface IContainer {
  widthContainer: number
}

export default function TwitterContainer(props: ITwitterContainer) {
  let widthContainer = 0
  if (props.size === 'lg') widthContainer = 1200
  else if (props.size === 'md') widthContainer = 960
  else if (props.size === 'sm') widthContainer = 768
  else if (props.size === 'xs') widthContainer = 540

  return <Container widthContainer={widthContainer}>{props.children}</Container>
}

const Container = styled.div<IContainer>`
  width: ${props => props.widthContainer}px;
  margin: 0 auto;
  max-width: 100%;
`
