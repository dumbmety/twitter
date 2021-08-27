import styled, { css } from 'styled-components'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import TwitterContainer from '../components/Common/TwitterContainer'
import UserInfo from '../components/Core/UserInfo'

import * as userService from '../services/user'

import { IUser } from '../store/state'
import theme from '../styles/ThemeStyles'
import useAuth from '../hooks/useAuth'
import TwitterBox from '../components/Common/TwitterBox'
import Tweet from '../components/Common/Tweet'
import { useUsersTweets } from '../hooks/tweets'
import TwitterFullscreen from '../components/Common/TwitterFullscreen'

type Params = { username: string }

export default function User() {
  const [user, setUser] = useState<IUser>({} as IUser)

  const [openCover, setOpenCover] = useState<boolean>(false)
  const [openPicture, setOpenPicture] = useState<boolean>(false)
  const [tab, setTab] = useState<string>('tweets')

  const params: Params = useParams()

  useEffect(() => {
    getUserProfile()
  }, [params.username])

  const getUserProfile = async () => {
    const res = await userService.getUser(params.username)
    if (res.success) setUser({ ...res.user, tweets: res.tweets })
  }

  const handleCoverClick = () => {
    if (!!user.cover) setOpenCover(true)
  }

  return (
    <Wrapper>
      <Cover hasCover={!!user.cover} onClick={handleCoverClick}>
        {user?.cover && (
          <img src={`/img/covers/${user?.cover}`} alt={`${user?.name} Cover`} />
        )}
      </Cover>
      {user?.cover && (
        <TwitterFullscreen
          type="cover"
          isOpen={openCover}
          srcImg={`/img/covers/${user?.cover}`}
          altImg={`${user?.name} Cover`}
          onClose={() => setOpenCover(false)}
        />
      )}
      {user?.image && (
        <TwitterFullscreen
          type="profile"
          isOpen={openPicture}
          srcImg={`/img/users/${user?.image || 'not_found.jpg'}`}
          altImg={`${user?.name} Cover`}
          onClose={() => setOpenPicture(false)}
        />
      )}
      <TwitterContainer size="md">
        <Content>
          <Group style={{ width: 320 }}>
            <UserInfo user={user} onOpen={() => setOpenPicture(true)} />
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
                    isActive={tab === 'media'}
                    onClick={() => setTab('media')}
                  >
                    Media
                  </Tab>
                  <Tab
                    isActive={tab === 'likes'}
                    onClick={() => setTab('likes')}
                  >
                    Likes
                  </Tab>
                </Tabs>
              </Header>
              <ul>
                {user?.tweets?.length !== 0 ? (
                  user?.tweets?.map(tweet => (
                    <Tweet
                      key={tweet.id}
                      username={user?.username || ''}
                      image={user?.image || ''}
                      name={user?.name}
                      text={tweet.text}
                      likes={tweet.likes || 0}
                      replies={tweet.replies || 0}
                      retweet={tweet.retweet || 0}
                    />
                  ))
                ) : (
                  <NotTwitted>{user?.name} has not tweeted yet</NotTwitted>
                )}
              </ul>
            </TwitterBox>
          </Main>
        </Content>
      </TwitterContainer>
    </Wrapper>
  )
}

interface ICover {
  hasCover?: boolean
}

const Wrapper = styled.div``

const Cover = styled.div<ICover>`
  width: 100%;
  height: 17rem;
  overflow: hidden;
  background: ${theme.colors.blue};

  ${props => props.hasCover && `cursor: pointer;`}

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

const NotTwitted = styled.li`
  height: 15rem;
  display: grid;
  place-items: center;
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
