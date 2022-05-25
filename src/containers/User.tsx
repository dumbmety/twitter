import styled, { css } from "styled-components"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Skeleton from "react-loading-skeleton"

import TwitterContainer from "../components/Common/TwitterContainer"
import UserInfo from "../components/Core/UserInfo"

import * as userService from "../services/user"
import * as authAction from "../store/actions/auth"
import useAuth from "../hooks/useAuth"

import theme from "../styles/ThemeStyles"
import TwitterBox from "../components/Common/TwitterBox"
import Tweet from "../components/Common/Tweet"
import TwitterFullscreen from "../components/Common/TwitterFullscreen"
import TweetSkeleton from "../components/Skeleton/TweetSkeleton"
import UserActions from "../components/Core/UserActions"
import { IUser } from "../types/schemas"

export default function User() {
  const auth: any = useAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [user, setUser] = useState<IUser>({} as IUser)
  const [follow, setFollow] = useState(false)
  const [loading, setLoading] = useState(true)

  const [openCover, setOpenCover] = useState<boolean>(false)
  const [openPicture, setOpenPicture] = useState<boolean>(false)
  const [tab, setTab] = useState<string>("tweets")

  const params: any = useParams()

  useEffect(() => {
    return () => {
      dispatch(authAction.getUser())
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (params.username === auth.user.username) {
      navigate("/profile")
    } else {
      getUserProfile()
    }
    // eslint-disable-next-line
  }, [params.username])

  useEffect(() => {
    setFollow(auth.user?.following?.includes(user._id) || false)
    // eslint-disable-next-line
  }, [user])

  const getUserProfile = async () => {
    setLoading(true)
    const res = await userService.getUser(params.username)
    if (res.success) setUser({ ...res.user, tweets: res.tweets })
    setLoading(false)
  }

  const followUser = async () => {
    if (user?._id && user?.followers) {
      const res = await userService.followUser(auth.user._id, user._id)

      if (res.success) {
        user.followers.push(auth.user._id)
        setFollow(true)
      }
    }
  }

  const unfollowUser = async () => {
    if (user?._id && user?.followers) {
      const res = await userService.unfollowUser(auth.user._id, user._id)

      if (res.success) {
        user.followers.splice(user.followers.indexOf(auth.user._id), 1)
        setFollow(false)
      }
    }
  }

  const handleCoverClick = () => {
    if (!!user.cover) setOpenCover(true)
  }

  let $cover_content = null
  if (loading) {
    $cover_content = <Skeleton />
  } else {
    if (user?.cover) {
      $cover_content = (
        <img src={`/img/covers/${user?.cover}`} alt={`${user?.name} Cover`} />
      )
    }
  }

  let $tweets_content = null
  if (loading) {
    $tweets_content = (
      <>
        <TweetSkeleton />
        <TweetSkeleton />
      </>
    )
  } else {
    if (user?.tweets?.length !== 0) {
      $tweets_content = user?.tweets?.map(tweet => (
        <Tweet
          key={tweet._id}
          id={tweet._id}
          username={user?.username || ""}
          image={user?.image || ""}
          name={user?.name}
          text={tweet.text}
          likes={tweet.likes}
          replies={tweet.replies || 0}
          retweet={tweet.retweet || 0}
        />
      ))
    } else {
      $tweets_content = (
        <NotTwitted>{user?.name} has not tweeted yet</NotTwitted>
      )
    }
  }

  return (
    <Wrapper>
      <Cover hasCover={!!user.cover} onClick={handleCoverClick}>
        {$cover_content}
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
          srcImg={`/img/users/${user?.image || "not_found.jpg"}`}
          altImg={`${user?.name} Cover`}
          onClose={() => setOpenPicture(false)}
        />
      )}
      <TwitterContainer size="md">
        <Content>
          <Group style={{ width: 320 }}>
            <UserInfo
              user={user}
              loading={loading}
              onOpen={() => setOpenPicture(true)}
            />
            <UserActions
              user={user}
              follow={follow}
              followUser={followUser}
              unfollowUser={unfollowUser}
            />
          </Group>
          <Main>
            <TwitterBox>
              <Header>
                <Tabs>
                  <Tab
                    isActive={tab === "tweets"}
                    onClick={() => setTab("tweets")}
                  >
                    Tweets
                  </Tab>
                  <Tab
                    isActive={tab === "media"}
                    onClick={() => setTab("media")}
                  >
                    Media
                  </Tab>
                  <Tab
                    isActive={tab === "likes"}
                    onClick={() => setTab("likes")}
                  >
                    Likes
                  </Tab>
                </Tabs>
              </Header>
              <Tweets>{$tweets_content}</Tweets>
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

  & > span {
    display: block;
    height: 100%;

    .react-loading-skeleton {
      height: 100%;
      border-radius: 0;
    }
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

const Tweets = styled.ul`
  div {
    box-shadow: none;
  }
`
