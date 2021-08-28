import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Reload } from 'react-ionicons'
import { useEffect, useState } from 'react'

import * as userService from '../../services/user'
import { IUser } from '../../store/state'
import theme from '../../styles/ThemeStyles'
import TwitterBox from '../Common/TwitterBox'
import TwitterSpinner from '../Common/TwitterSpinner'

export default function YouShouldFollow() {
  const randomUsersNumber = 3

  const [users, setUsers] = useState<IUser[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    getRandomUsers()
  }, [])

  const getRandomUsers = async () => {
    setLoading(true)
    setUsers([])

    const res = await userService.randomUsers(randomUsersNumber)

    if (res.success) setUsers(res.users)
    setLoading(false)
  }

  let $users_content = null
  if (users) {
    $users_content = users.map(user => (
      <User key={user._id}>
        <Link to={`/user/${user.username}`}>
          <UserInfo>
            <img src={`/img/users/${user.image}`} alt={user.name} />
            <div>
              <span>{user.name}</span>
              <span>@{user.username}</span>
            </div>
          </UserInfo>
        </Link>
      </User>
    ))
  }

  return (
    <Wrapper>
      <TwitterBox>
        {loading && <TwitterSpinner />}
        <Header>
          <h2>You should follow</h2>
          <Reload onClick={getRandomUsers} />
        </Header>
        <Users>{$users_content}</Users>
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

    & > div:first-child {
      height: 280.75px;
    }
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
    cursor: pointer;
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
    width: 6rem;
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
  user-select: none;

  a {
    color: ${theme.dark.text2};
    transition: ${theme.transition.ease};

    &:hover {
      color: ${theme.dark.text1};
    }
  }
`
