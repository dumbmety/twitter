import styled from 'styled-components'
import Tweet from '../components/Common/Tweet'

import { home_tweets } from '../constants/tweets'
import TrendsForYou from '../components/Core/TrendsForYou'
import YouShouldFollow from '../components/Core/YouShouldFollow'
import TwitterContainer from '../components/Common/TwitterContainer'
import WhatsHappening from '../components/Home/WhatsHappening'

export default function Home() {
  return (
    <TwitterContainer size="md">
      <Wrapper>
        <Content>
          <WhatsHappening />
          <Tweets>
            {home_tweets
              .map(tweet => (
                <Tweet
                  key={tweet.id}
                  text={tweet.text}
                  image={tweet.user.image}
                  name={tweet.user.name}
                  username={tweet.user.username}
                  replies={tweet.replies}
                  retweet={tweet.retweet}
                  likes={tweet.likes}
                />
              ))
              .reverse()}
          </Tweets>
        </Content>
        <Aside>
          <TrendsForYou />
          <YouShouldFollow />
        </Aside>
      </Wrapper>
    </TwitterContainer>
  )
}

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
  padding: 2rem 0;
`

const Content = styled.div`
  flex: 1;
  display: grid;
  gap: 1rem;
`

const Tweets = styled.ul`
  display: grid;
  gap: 1rem;
`

const Aside = styled.aside`
  width: 20rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
`
