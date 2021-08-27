import styled from 'styled-components'
import { LocationOutline } from 'react-ionicons'

import theme from '../../styles/ThemeStyles'
import TwitterBox from '../Common/TwitterBox'

import { IUser } from '../../store/state'
import { useUsersTweets } from '../../hooks/tweets'
import useAuth from '../../hooks/useAuth'

type Props = {
  user?: IUser
  onOpen: () => void
}

export default function UserInfo(props: Props) {
  const { user } = useAuth()
  const { tweetsCount } = useUsersTweets()

  const handleClickAvatar = () => {
    if (!!props?.user?.image || !!user.image) props.onOpen()
  }

  return (
    <TwitterBox>
      <Center>
        <Avatar
          hasAvatar={!!props?.user?.image || !!user.image}
          onClick={handleClickAvatar}
        >
          <img
            src={`/img/users/${
              props?.user?.image || user.image || 'not_found.jpg'
            }`}
            alt={`${props?.user?.name || user.name} Cover`}
          />
        </Avatar>
        <Name>
          <h2>{props?.user?.name || user.name}</h2>
          <p>@{props?.user?.username || user.username}</p>
        </Name>
        {props?.user ? (
          props?.user?.location ? (
            <Location>
              <LocationOutline width="1.5rem" />
              <p>{props?.user?.location}</p>
            </Location>
          ) : null
        ) : (
          user.location && (
            <Location>
              <LocationOutline width="1.5rem" />
              <p>{user.location}</p>
            </Location>
          )
        )}
        <List>
          <Item>
            <Title>Tweets</Title>
            <Value>
              {props?.user ? props?.user?.tweets?.length : tweetsCount}
            </Value>
          </Item>
          <Item>
            <Title>Followers</Title>
            <Value>
              {props?.user
                ? props?.user?.followers?.length
                : user?.followers?.length}
            </Value>
          </Item>
          <Item>
            <Title>Following</Title>
            <Value>
              {props?.user
                ? props?.user?.following?.length
                : user?.following?.length}
            </Value>
          </Item>
        </List>
      </Center>
    </TwitterBox>
  )
}

interface IAvatar {
  hasAvatar?: boolean
}

const Center = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1rem 0;
  gap: 1rem;
`

const Avatar = styled.div<IAvatar>`
  width: 5rem;
  height: 5rem;
  overflow: hidden;
  border-radius: 50%;

  ${props => props.hasAvatar && `cursor: pointer;`}

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
