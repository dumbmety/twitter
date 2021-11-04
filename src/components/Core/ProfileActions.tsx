import styled from "styled-components"
import { Link } from "react-router-dom"
import { Eye, LogOut, People, Settings } from "react-ionicons"

import theme from "../../styles/ThemeStyles"
import TwitterBox from "../Common/TwitterBox"

type Props = {
  activeLink?: "activity" | "moments" | "friends" | "edit"
}

const user_actions = [
  {
    url: "",
    name: "activity",
    title: "Activity",
    icon: <Eye width="1.6rem" height="1.6rem" />,
  },
  {
    url: "/friends",
    name: "friends",
    title: "Friends",
    icon: <People width="1.6rem" height="1.6rem" />,
  },
  {
    url: "/logout",
    name: "logout",
    title: "Logout",
    icon: <LogOut width="1.6rem" height="1.6rem" />,
  },
  {
    url: "/edit",
    name: "edit",
    title: "Edit Profile",
    icon: <Settings width="1.6rem" height="1.6rem" />,
  },
]

export default function ProfileActions(props: Props) {
  return (
    <Grid>
      {user_actions.map(action => (
        <Link key={action.name} to={`/profile${action.url}`}>
          <TwitterBox
            isActive={props.activeLink === action.name}
            variant={props.activeLink === action.name ? "solid" : "outline"}
          >
            {action.icon}
            <Title>{action.title}</Title>
          </TwitterBox>
        </Link>
      ))}
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
