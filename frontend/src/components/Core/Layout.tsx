import React from 'react'
import styled from 'styled-components'

import Header from './Header'
import Navigation from './Navigation'
import TwitterContainer from './TwitterContainer'

type Props = {
  children: React.ReactNode
}

export default function Layout(props: Props) {
  return (
    <Wrapper>
      <Navigation />
      <Content>
        <Header />
        <TwitterContainer size="md">
          <Main>{props.children}</Main>
        </TwitterContainer>
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  max-width: 100%;
  min-height: 100vh;
`

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 15rem;
`

const Main = styled.main`
  flex: 1;
  padding: 2rem 0;
`
