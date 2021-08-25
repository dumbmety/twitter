import styled from 'styled-components'

import WhatsHappening from '../components/Home/WhatsHappening'

export default function Home() {
  return (
    <Wrapper>
      <Content>
        <WhatsHappening />
      </Content>
      <Aside>Aside</Aside>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  gap: 3rem;
`

const Content = styled.div`
  flex: 1;
`

const Aside = styled.aside`
  width: 12rem;
`
