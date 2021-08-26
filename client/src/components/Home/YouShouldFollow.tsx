import styled from 'styled-components'
import { Reload } from 'react-ionicons'

import theme from '../../styles/ThemeStyles'
import TwitterBox from '../Core/TwitterBox'
import { users_suggested } from '../../constants/users'
import TwitterButton from '../Core/TwitterButton'
import { Link } from 'react-router-dom'

export default function YouShouldFollow() {
  return (
    <Wrapper>
      <TwitterBox>
        <Header>
          <h2>You should follow</h2>
          <Reload />
        </Header>
        <Users>
          {users_suggested.map(user => (
            <User key={user.username}>
              <Link to={`/user/${user.username}`}>
                <UserInfo>
                  <img src={`/img/${user.image}`} alt={user.name} />
                  <div>
                    <span>{user.name}</span>
                    <span>@{user.username}</span>
                  </div>
                </UserInfo>
              </Link>
              <div>
                <TwitterButton variant="outline" children="Follow" />
              </div>
            </User>
          ))}
        </Users>
        <Action>
          <Link to="/connect-people">See all</Link>
        </Action>
      </TwitterBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  & > div {
    padding: 1rem 0;
  }
`

const Header = styled.header`
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${theme.dark.backgroundPrimary};
  padding-bottom: 1rem;

  span {
    display: grid;
    place-items: center;
  }

  svg {
    fill: ${theme.dark.text2};
    color: ${theme.dark.text2};
  }
`

const Users = styled.ul`
  margin-top: 0.5rem;
  user-select: none;
`

const User = styled.li`
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    padding: 0.5rem 1rem;
  }
`

const UserInfo = styled.div`
  display: flex;
  gap: 0.5rem;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  span:last-child {
    font-size: 0.8rem;
    color: ${theme.dark.text2};
  }

  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
  }
`

const Action = styled.div`
  padding: 1rem 1rem 0 1rem;
  text-align: center;
  text-transform: uppercase;
  font-size: 0.8rem;

  a {
    color: ${theme.dark.text2};
    transition: ${theme.transition.ease};

    &:hover {
      color: ${theme.dark.text1};
    }
  }
`
