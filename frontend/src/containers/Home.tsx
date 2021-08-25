import styled from 'styled-components'
import Tweet from '../components/Core/Tweet'

import WhatsHappening from '../components/Home/WhatsHappening'
import { home_tweets } from '../constants/tweets'

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
  display: grid;
  gap: 1rem;
`

const Tweets = styled.ul`
  display: grid;
  gap: 1rem;
`

const Aside = styled.aside`
  width: 12rem;
`
