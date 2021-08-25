import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Search } from 'react-ionicons'

import theme from '../../styles/ThemeStyles'
import profile from '../../assets/images/profile.jpg'
import TwitterContainer from './TwitterContainer'

export default function Header() {
  return (
    <Wrapper>
      <TwitterContainer size="md">
        <Links>
          <Link to="/about">About</Link>
          <Link to="/help">Help</Link>
        </Links>
        <SearchBox onSubmit={e => e.preventDefault()}>
          <Search />
          <input type="text" placeholder="Search on Twitter" />
        </SearchBox>
        <Profile>
          <Link to="/profile">
            <span>Mehdi Neysi</span>
            <img src={profile} alt="Mehdi Neysi" />
          </Link>
        </Profile>
      </TwitterContainer>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  padding: 1rem;
  user-select: none;
  background: ${theme.dark.backgroundBox};
  position: fixed;
  top: 0;
  left: 15rem;
  right: 0;
  z-index: 99;
  box-shadow: 0 0.5rem 0.8rem rgba(38, 46, 54, 0.5);

  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

const Links = styled.div`
  width: 320px;
  display: flex;
  gap: 1.5rem;
  font-size: 0.8rem;

  a {
    font-weight: 300;
    transition: ${theme.transition.ease};

    &:hover {
      opacity: 0.75;
    }
  }
`

const SearchBox = styled.form`
  width: 100%;
  padding: 0.75rem 1rem;
  overflow: hidden;
  border-radius: 0.5rem;
  background: ${theme.dark.backgroundPrimary};
  display: flex;
  align-items: center;
  gap: 1rem;

  svg {
    fill: ${theme.dark.text1};
    color: ${theme.dark.text1};
  }

  input {
    flex: 1;
    color: ${theme.dark.text1};
    background: transparent;
    font-size: 0.8rem;

    &::placeholder {
      color: ${theme.dark.text2};
    }
  }
`

const Profile = styled.div`
  width: 320px;
  display: flex;
  justify-content: flex-end;
  transition: ${theme.transition.ease};

  &:hover {
    opacity: 0.75;
  }

  a {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  span {
    font-size: 0.8rem;
    font-weight: 300;
  }

  img {
    width: 2rem;
    border-radius: 50%;
  }
`
