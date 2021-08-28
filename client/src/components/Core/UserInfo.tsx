import styled from 'styled-components'
import ReactLoading from 'react-loading'
import Skeleton from 'react-loading-skeleton'
import { LocationOutline } from 'react-ionicons'

import theme from '../../styles/ThemeStyles'
import TwitterBox from '../Common/TwitterBox'

import { IUser } from '../../store/state'
import { useUsersTweets } from '../../hooks/tweets'

type Props = {
  user: IUser
  loading: boolean
  onOpen: () => void
}

export default function UserInfo(props: Props) {
  const { tweetsCount } = useUsersTweets()

  const handleClickAvatar = () => {
    if (!!props?.user?.image) props.onOpen()
  }

  return (
    <TwitterBox>
      {/* {props?.loading && (
        <Loading>
          <ReactLoading type="spin" />
        </Loading>
      )} */}
      {props?.loading && (
        <SkeletonWrapper>
          <Skeleton />
        </SkeletonWrapper>
      )}
      <Center>
        <Avatar hasAvatar={!!props?.user?.image} onClick={handleClickAvatar}>
          {props?.user ? (
            <img
              src={`/img/users/${props?.user?.image || 'not_found.jpg'}`}
              alt={`${props?.user?.name} Cover`}
            />
          ) : (
            <Skeleton />
          )}
        </Avatar>
        <Name>
          <h2>{props?.user?.name}</h2>
          <p>@{props?.user?.username}</p>
        </Name>
        {props?.user?.location && (
          <Location>
            <LocationOutline width="1.5rem" />
            <p>{props?.user?.location}</p>
          </Location>
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
            <Value>{props?.user && props?.user?.followers?.length}</Value>
          </Item>
          <Item>
            <Title>Following</Title>
            <Value>{props?.user && props?.user?.following?.length}</Value>
          </Item>
        </List>
      </Center>
    </TwitterBox>
  )
}

interface IAvatar {
  hasAvatar?: boolean
}

const Loading = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 0.5rem;
  background: ${theme.dark.backgroundBox};
  display: grid;
  place-items: center;
`

const SkeletonWrapper = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 0.5rem;
  background: ${theme.dark.backgroundBox};

  & > span {
    height: 100%;
    display: block;

    .react-loading-skeleton {
      height: 100%;
      transform: translateY(-2px);
    }
  }
`

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

  & > span {
    height: 100%;
    display: block;

    .react-loading-skeleton {
      height: 100%;
      transform: translateY(-2px);
    }
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
