import styled from "styled-components"
import { Link, NavLink } from "react-router-dom"

import logo from "../../assets/images/logo.svg"
import theme from "../../styles/ThemeStyles"
import navigation from "../../constants/navigation"
import useAuth from "../../hooks/useAuth"

import TwitterButton from "./TwitterButton"

export default function Navigation() {
  const { unreadNotification } = useAuth()

  return (
    <Wrapper>
      <Logo>
        <Link to="/">
          <img src={logo} alt="Twitter Logo" />
        </Link>
      </Logo>
      <List>
        {navigation.map(link => (
          <Item key={link.path} isDisabled={link?.disabled}>
            <NavLink
              exact
              to={link.path}
              activeClassName="active"
              onClick={event => {
                if (link.disabled) event.preventDefault()
              }}
            >
              {link.haveBadge &&
                link.path === "/notifications" &&
                unreadNotification?.length && (
                  <Badge>{unreadNotification.length}</Badge>
                )}
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          </Item>
        ))}
      </List>
      <ButtonWrapper>
        <TwitterButton fluid disabled variant="solid">
          Tweet
        </TwitterButton>
      </ButtonWrapper>
    </Wrapper>
  )
}

type LinkProps = {
  isDisabled?: boolean
}

const Wrapper = styled.nav`
  width: 15rem;
  display: flex;
  flex-direction: column;
  background: ${theme.dark.backgroundBox};
  box-shadow: 0 0 0.8rem rgba(38, 46, 54, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  user-select: none;
`

const Logo = styled.div`
  padding: 1.5rem;

  img {
    width: 2rem;
  }
`

const List = styled.ul`
  flex: 1;
  margin-top: 4rem;
`

const Item = styled.li<LinkProps>`
  position: relative;

  a {
    width: 100%;
    color: ${theme.dark.text2};
    padding: 0.75rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-weight: 500;
    transition: ${theme.transition.ease};
    border-right: 1px solid transparent;

    &.active {
      color: ${theme.dark.primary};
      border-right-color: ${theme.dark.primary};

      svg {
        color: ${theme.dark.primary};
        fill: ${theme.dark.primary};
      }
    }

    ${props =>
      !props.isDisabled
        ? `&:hover {opacity: 0.75;}`
        : `opacity: 0.5; pointer-events: none;`}
  }

  span {
    display: grid;
    place-items: center;
  }

  svg {
    color: ${theme.dark.text2};
    fill: ${theme.dark.text2};
  }
`

const ButtonWrapper = styled.div`
  padding: 1.5rem;
`

const Badge = styled.span`
  position: absolute;
  top: 9px;
  left: 35px;
  z-index: 99;
  width: 15px;
  height: 15px;
  font-size: 12px;
  border-radius: 50%;
  color: ${theme.dark.text1};
  background: ${theme.colors.blue};
`
