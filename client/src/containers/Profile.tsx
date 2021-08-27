import styled, { css } from 'styled-components'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import TwitterContainer from '../components/Common/TwitterContainer'
import UserInfo from '../components/Core/UserInfo'
import UserActions from '../components/Core/UserActions'

import * as profileAction from '../store/actions/profile'
import * as tweetsAction from '../store/actions/tweets'

import theme from '../styles/ThemeStyles'
import useAuth from '../hooks/useAuth'
import TwitterBox from '../components/Common/TwitterBox'
import Tweet from '../components/Common/Tweet'
import { useUsersTweets } from '../hooks/tweets'
import TwitterFullscreen from '../components/Common/TwitterFullscreen'

type Params = { username: string }

export default function Profile() {
  const [openCover, setOpenCover] = useState<boolean>(false)
  const [openPicture, setOpenPicture] = useState<boolean>(false)
  const [tab, setTab] = useState<string>('tweets')

  const dispatch = useDispatch()
  const params: Params = useParams()

  const { user } = useAuth()
  const { tweets } = useUsersTweets()

  useEffect(() => {
    dispatch(profileAction.getUserProfile(params.username))
    dispatch(tweetsAction.getUserTweets())
  }, [dispatch, params.username])

  return (
    <Wrapper>
      <Cover onClick={() => setOpenCover(true)}>
        {user.cover && (
          <img src={`/img/covers/${user.cover}`} alt={`${user.name} Cover`} />
        )}
      </Cover>
      <TwitterFullscreen
        type="cover"
        isOpen={openCover}
        srcImg={`/img/covers/${user.cover}`}
        altImg={`${user.name} Cover`}
        onClose={() => setOpenCover(false)}
      />
      <TwitterFullscreen
        type="profile"
        isOpen={openPicture}
        srcImg={`/img/users/${user.image || 'not_found.jpg'}`}
        altImg={`${user.name} Cover`}
        onClose={() => setOpenPicture(false)}
      />
      <TwitterContainer size="md">
        <Content>
          <Group style={{ width: 320 }}>
            <UserInfo onOpen={() => setOpenPicture(true)} />
            <UserActions />
          </Group>
          <Main>
            <TwitterBox>
              <Header>
                <Tabs>
                  <Tab
                    isActive={tab === 'tweets'}
                    onClick={() => setTab('tweets')}
                  >
                    Tweets
                  </Tab>
                  <Tab
                    isDisabled
                    isActive={tab === 'media'}
                    onClick={() => setTab('media')}
                  >
                    Media
                  </Tab>
                  <Tab
                    isDisabled
                    isActive={tab === 'likes'}
                    onClick={() => setTab('likes')}
                  >
                    Likes
                  </Tab>
                </Tabs>
              </Header>
              <ul>
                {tweets?.map(tweet => (
                  <Tweet
                    key={tweet.id}
                    username={user.username || ''}
                    image={user.image || ''}
                    name={user.name}
                    text={tweet.text}
                    likes={tweet.likes || 0}
                    replies={tweet.replies || 0}
                    retweet={tweet.retweet || 0}
                  />
                ))}
              </ul>
            </TwitterBox>
          </Main>
        </Content>
      </TwitterContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const Cover = styled.div`
  width: 100%;
  height: 17rem;
  overflow: hidden;
  cursor: pointer;
  background: ${theme.colors.blue};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Content = styled.div`
  display: flex;
  gap: 1rem;
  transform: translateY(-3rem);
`

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Main = styled.div`
  flex: 1;

  & > div {
    padding: 0;
    overflow: hidden;
  }
`

const Header = styled.header`
  border-bottom: 1px solid ${theme.dark.backgroundPrimary};
`

const Tabs = styled.ul`
  display: flex;
  user-select: none;
`

type TabProps = {
  isActive?: boolean
  isDisabled?: boolean
}

const Tab = styled.li<TabProps>`
  cursor: pointer;
  padding: 1rem;
  color: ${theme.dark.text2};
  border-bottom: 1px solid transparent;
  transition: ${theme.transition.ease};

  ${props =>
    props.isActive &&
    css`
      color: ${theme.colors.blue};
      border-bottom-color: ${theme.colors.blue};
    `};

  ${props =>
    props.isDisabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}
`
