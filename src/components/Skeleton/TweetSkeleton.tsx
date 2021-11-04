import styled from 'styled-components'
import Skeleton from 'react-loading-skeleton'
import TwitterBox from '../Common/TwitterBox'

export default function TweetSkeleton() {
  return (
    <Wrapper>
      <TwitterBox>
        <Profile>
          <Skeleton />
        </Profile>
        <Content>
          <Skeleton />
        </Content>
      </TwitterBox>
    </Wrapper>
  )
}

const Wrapper = styled.li`
  & > div {
    display: flex;
    padding: 1rem;
    gap: 1rem;

    & > span {
      flex: 1;
    }
  }
`

const Profile = styled.div`
  width: 3rem;
  height: 3rem;
  overflow: hidden;
  border-radius: 50%;

  & > span {
    display: block;
    height: 100%;

    .react-loading-skeleton {
      height: 100%;
      transform: translateY(-2px);
    }
  }
`

const Content = styled.span`
  min-height: 7rem;

  & > span {
    display: block;
    height: 100%;

    .react-loading-skeleton {
      height: 100%;
    }
  }
`
