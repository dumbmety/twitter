import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

import theme from '../../styles/ThemeStyles'
import TwitterBox from './TwitterBox'
import TwitterCard from './TwitterCard'
import {
  ChatboxOutline,
  HeartOutline,
  RepeatOutline,
  ShareSocialOutline
} from 'react-ionicons'

interface ITweet {
  username: string
  text: string
  image: string
  name: string

  likes: number
  replies: number
  retweet: number
}

type ActionProps = {
  actionColor: 'red' | 'green' | 'blue'
}

export default function Tweet(props: ITweet) {
  const url = `/user/${props.username}`

  return (
    <Wrapper>
      <TwitterBox>
        <Link to={url}>
          <Profile src={`/img/${props.image}`} alt="Mehdi Neysi" />
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
            <Action actionColor="red">
              <HeartOutline />
              {props.likes}
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
  gap: 1rem;
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
`
