import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Eye, Flash, People, Settings } from 'react-ionicons'

import theme from '../../styles/ThemeStyles'
import TwitterBox from '../Common/TwitterBox'
import useAuth from '../../hooks/useAuth'

export default function UserActions() {
  const { user } = useAuth()

  return (
    <Grid>
      <Link to={`/${user.username}/activity`}>
        <TwitterBox variant="outline">
          <Eye width="1.6rem" height="1.6rem" />
          <Title>Activity</Title>
        </TwitterBox>
      </Link>
      <Link to={`/${user.username}/moments`}>
        <TwitterBox variant="outline">
          <Flash width="1.6rem" height="1.6rem" />
          <Title>Moments</Title>
        </TwitterBox>
      </Link>
      <Link to={`/${user.username}/friends`}>
        <TwitterBox variant="outline">
          <People width="1.6rem" height="1.6rem" />
          <Title>Friends</Title>
        </TwitterBox>
      </Link>
      <Link to={`/${user.username}/edit`}>
        <TwitterBox variant="outline">
          <Settings width="1.6rem" height="1.6rem" />
          <Title>Edit Profile</Title>
        </TwitterBox>
      </Link>
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
