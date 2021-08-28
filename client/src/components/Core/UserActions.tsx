import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Chatbubble, Notifications, Person, Share } from 'react-ionicons'

import { IUser } from '../../store/state'
import theme from '../../styles/ThemeStyles'
import TwitterBox from '../Common/TwitterBox'

type Props = {
  user: IUser
  follow: boolean

  followUser: () => void
  unfollowUser: () => void
}

export default function UserActions(props: Props) {
  const toggleFollow = async () => {
    props.follow ? props.unfollowUser() : props.followUser()
  }

  const shareProfile = () => {
    window.navigator.share({
      text: props.user.name,
      title: 'Share Profile',
      url: window.location.href
    })
  }

  // TODO: ADD SPINNER WHEN LOADING FOLLOW IS TRUE

  return (
    <Grid>
      <TwitterBox
        variant="outline"
        color={props.follow ? 'red' : 'blue'}
        onClick={toggleFollow}
      >
        <Person />
        <Title>{props.follow ? 'Unfollow' : 'Follow'}</Title>
      </TwitterBox>
      <Link to={`/messages/${props.user.username}`}>
        <TwitterBox variant="outline">
          <Chatbubble />
          <Title>Message</Title>
        </TwitterBox>
      </Link>
      <TwitterBox variant="outline">
        <Notifications />
        <Title>Notifications</Title>
      </TwitterBox>
      <TwitterBox variant="outline" onClick={shareProfile}>
        <Share />
        <Title>Share</Title>
      </TwitterBox>
    </Grid>
  )
}

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  user-select: none;
  grid-template-columns: repeat(2, 1fr);

  div {
    gap: 0.5rem;
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: ${theme.dark.text1};
    cursor: pointer;

    span {
      display: grid;
      place-items: center;

      svg {
        transition: ${theme.transition.ease};
        fill: ${theme.dark.text2};
        color: ${theme.dark.text2};
      }
    }

    &:hover {
      color: ${theme.colors.blue};

      svg {
        fill: ${theme.colors.blue};
        color: ${theme.colors.blue};
      }
    }
  }
`

const Title = styled.h3`
  font-size: 0.8rem;
  font-weight: 300;
`
