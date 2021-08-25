import styled from 'styled-components'
import Tweet from '../components/Core/Tweet'

import { home_tweets } from '../constants/tweets'
import TrendsForYou from '../components/Home/TrendsForYou'
import WhatsHappening from '../components/Home/WhatsHappening'
import YouShouldFollow from '../components/Home/YouShouldFollow'

export default function Home() {
  return (
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
  )
}

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
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
