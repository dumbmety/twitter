import styled from "styled-components"
import { useEffect } from "react"
import { People } from "react-ionicons"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import * as authAction from "../store/actions/auth"
import { useHomeTweets } from "../hooks/useTweets"
import TrendsForYou from "../components/Core/TrendsForYou"
import Tweet from "../components/Common/Tweet"
import TweetSkeleton from "../components/Skeleton/TweetSkeleton"
import TwitterContainer from "../components/Common/TwitterContainer"
import WhatsHappening from "../components/Home/WhatsHappening"
import YouShouldFollow from "../components/Core/YouShouldFollow"
import TwitterBox from "../components/Common/TwitterBox"
import TwitterButton from "../components/Common/TwitterButton"

export default function Home() {
  const dispatch = useDispatch()
  const { loading, tweets } = useHomeTweets()

  useEffect(() => {
    dispatch(authAction.getHomeTweets())
  }, [dispatch])

  let $tweets_content = null
  if (loading) {
    $tweets_content = <TweetSkeleton />
  } else {
    if (tweets.length === 0) {
      $tweets_content = (
        <TweetsEmpty>
          <TwitterBox>
            <People width="4rem" height="4rem" color="#ffffff" />
            <h2>Do you like to follow your friends?</h2>
            <Link to="/connect-people">
              <TwitterButton variant="solid">Connect people</TwitterButton>
            </Link>
          </TwitterBox>
        </TweetsEmpty>
      )
    } else {
      $tweets_content = tweets
        .map(({ tweet, user }: any) => (
          <Tweet
            key={tweet._id}
            id={tweet._id}
            text={tweet.text}
            image={user.image || ""}
            name={user.name}
            username={user.username || ""}
            replies={tweet.replies || 0}
            retweet={tweet.retweet || 0}
            likes={tweet.likes}
          />
        ))
        .reverse()
    }
  }

  return (
    <TwitterContainer size="md">
      <Wrapper>
        <Content>
          <WhatsHappening />
          <Tweets>{$tweets_content}</Tweets>
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
  display: flex;
  flex-direction: column;
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
  position: sticky;
`

const TweetsEmpty = styled.li`
  text-align: center;

  & > div {
    padding: 3rem;

    h2 {
      margin-bottom: 0.75rem;
    }

    button {
      padding: 0.5rem 1rem;
    }
  }
`
