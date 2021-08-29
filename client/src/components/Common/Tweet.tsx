import styled, { css } from 'styled-components'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChatboxOutline,
  Heart,
  HeartOutline,
  RepeatOutline,
  ShareSocialOutline
} from 'react-ionicons'

import * as tweetService from '../../services/tweet'
import useAuth from '../../hooks/useAuth'
import theme from '../../styles/ThemeStyles'
import TwitterBox from './TwitterBox'
import TwitterCard from './TwitterCard'

interface ITweet {
  id: string
  username: string
  text: string
  image: string
  name: string

  likes: string[]
  replies: number
  retweet: number
}

type ActionProps = {
  isActive?: boolean
  actionColor: 'red' | 'green' | 'blue'
}

export default function Tweet(props: ITweet) {
  const { user } = useAuth()

  const [type, setType] = useState<'add' | 'sub' | ''>('')
  const [liked, setLiked] = useState<boolean>(props.likes?.includes(user._id))

  const url =
    user.username === props.username
      ? `/${props.username}`
      : `/user/${props.username}`

  const likeStatusTweet = async () => {
    await tweetService.updateLikeStatusTweet(props.id, liked)

    liked
      ? props.likes.splice(props.likes.indexOf(user._id), 1)
      : props.likes.push(user._id)

    setLiked(!liked)
  }

  return (
    <Wrapper>
      <TwitterBox>
        <Link to={url}>
          <Profile src={`/img/users/${props.image}`} alt="Mehdi Neysi" />
        </Link>
        <TwitterCard>
          <Header>
            <Link to={url}>
              <User>
                <Name>{props.name}</Name>
                <UserName>@{props.username}</UserName>
              </User>
            </Link>
          </Header>
          <Content>{props.text}</Content>
          <Footer>
            <Action actionColor="blue">
              <ChatboxOutline />
              {props.replies}
            </Action>
            <Action actionColor="green">
              <RepeatOutline />
              {props.retweet}
            </Action>
            <Action
              isActive={liked}
              actionColor="red"
              onClick={likeStatusTweet}
            >
              {liked ? <Heart /> : <HeartOutline />}
              <span>{props.likes?.length || 0}</span>
            </Action>
            <Action actionColor="blue">
              <ShareSocialOutline />
            </Action>
          </Footer>
        </TwitterCard>
      </TwitterBox>
    </Wrapper>
  )
}

const Wrapper = styled.li`
  & > div {
    display: flex;
    padding: 1rem;
    gap: 1rem;

    & > div {
      flex: 1;
    }
  }
`

const Profile = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
  transition: ${theme.transition.ease};

  &:hover {
    opacity: 0.75;
  }
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const Name = styled.span`
  color: ${theme.dark.text1};
  font-size: 1rem;
`

const UserName = styled.span`
  color: ${theme.dark.text2};
  font-size: 0.8rem;
  transform: translateY(0.5px);
`

const Content = styled.p`
  padding: 1rem 0;
  font-weight: 300;
  line-height: 1.5;
`

const Footer = styled.footer`
  display: flex;
  padding-bottom: 1rem;
  align-items: center;
`

const Action = styled.div<ActionProps>`
  flex: 1;
  gap: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  transition: ${theme.transition.ease};

  &:not(:last-child) {
    border-right: 1px solid ${theme.dark.backgroundPrimary};
  }

  span {
    display: grid;
    place-items: center;
    text-align: center;

    &:last-child {
      min-width: 20px;
    }
  }

  svg {
    fill: ${theme.dark.text2};
    color: ${theme.dark.text2};
    transition: ${theme.transition.ease};
  }

  &:hover {
    ${props =>
      props.actionColor &&
      props.actionColor === 'red' &&
      css`
        color: ${theme.colors.red};

        svg {
          fill: ${theme.colors.red};
          color: ${theme.colors.red};
        }
      `}

    ${props =>
      props.actionColor &&
      props.actionColor === 'blue' &&
      css`
        color: ${theme.colors.blue};

        svg {
          fill: ${theme.colors.blue};
          color: ${theme.colors.blue};
        }
      `}

    ${props =>
      props.actionColor &&
      props.actionColor === 'green' &&
      css`
        color: ${theme.colors.green};

        svg {
          fill: ${theme.colors.green};
          color: ${theme.colors.green};
        }
      `}
  }

  ${props =>
    props.isActive &&
    props.actionColor === 'red' &&
    css`
      color: ${theme.colors.red};

      svg {
        fill: ${theme.colors.red};
        color: ${theme.colors.red};
      }
    `}
`
