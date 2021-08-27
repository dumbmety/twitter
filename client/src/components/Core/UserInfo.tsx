import styled from 'styled-components'
import { LocationOutline } from 'react-ionicons'

import theme from '../../styles/ThemeStyles'
import TwitterBox from '../Common/TwitterBox'

import useAuth from '../../hooks/useAuth'
import { useUsersTweets } from '../../hooks/tweets'

export default function UserInfo() {
  const { user } = useAuth()
  const { tweetsCount } = useUsersTweets()

  return (
    <TwitterBox>
      <Center>
        <Avatar>
          <img
            src={`/img/users/${user.image || 'not_found.jpg'}`}
            alt={`${user.name} Cover`}
          />
        </Avatar>
        <Name>
          <h2>{user.name}</h2>
          <p>@{user.username}</p>
        </Name>
        {user.location && (
          <Location>
            <LocationOutline width="1.5rem" />
            <p>{user.location}</p>
          </Location>
        )}
        <List>
          <Item>
            <Title>Tweets</Title>
            <Value>{tweetsCount}</Value>
          </Item>
          <Item>
            <Title>Followers</Title>
            <Value>{user?.followers?.length}</Value>
          </Item>
          <Item>
            <Title>Following</Title>
            <Value>{user?.following?.length}</Value>
          </Item>
        </List>
      </Center>
    </TwitterBox>
  )
}

const Center = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1rem 0;
  gap: 1rem;
`

const Avatar = styled.div`
  width: 5rem;
  height: 5rem;
  overflow: hidden;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Name = styled.div`
  gap: 0.2rem;
  display: grid;
  text-align: center;

  h2 {
    color: ${theme.dark.text1};
    font-size: 1.2rem;
  }

  p {
    color: ${theme.dark.text2};
    font-size: 0.8rem;
  }
`

const Location = styled.div`
  gap: 0.2rem;
  display: flex;
  align-items: center;
  color: ${theme.dark.text1};

  span {
    display: grid;
    place-items: center;
  }

  svg {
    fill: ${theme.dark.text2};
    color: ${theme.dark.text2};
  }

  p {
    font-size: 0.8rem;
  }
`

const List = styled.ul`
  gap: 1rem;
  width: 100%;
  display: flex;
  padding: 0 0.5rem;
`

const Item = styled.li`
  flex: 1;
  display: grid;
  gap: 0.3rem;
  text-align: center;

  &:not(:last-child) {
    padding-right: 1rem;
    border-right: 1px solid ${theme.dark.backgroundPrimary};
  }
`
const Title = styled.span`
  font-weight: 300;
  font-size: 0.8rem;
  color: ${theme.dark.text2};
`

const Value = styled.span`
  font-weight: 500;
`
