import React from 'react'
import SimpleBar from 'simplebar-react'
import styled from 'styled-components'

import Header from './Header'
import Navigation from './Navigation'

type Props = {
  children: React.ReactNode
}

export default function Layout(props: Props) {
  return (
    <SimpleBar style={{ height: '100vh' }}>
      <Wrapper>
        <Navigation />
        <Content>
          <Header />
          <Main>{props.children}</Main>
        </Content>
      </Wrapper>
    </SimpleBar>
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
  margin-top: 80px;
`

const Main = styled.main`
  flex: 1;
`
