import {
  Bookmark,
  Compass,
  Document,
  Home,
  Mail,
  Notifications,
  Person,
} from "react-ionicons"

interface INavLink {
  name: string
  path: string
  icon: any
  haveBadge?: boolean
  disabled?: boolean
}

const navigation: INavLink[] = [
  {
    name: "Home",
    path: "/",
    icon: <Home />,
  },
  {
    name: "Explore",
    path: "/explore",
    icon: <Compass />,
    disabled: true,
  },
  {
    name: "Notifications",
    path: "/notifications",
    icon: <Notifications />,
    haveBadge: true,
    disabled: false,
  },
  {
    name: "Messages",
    path: "/messages",
    icon: <Mail />,
    disabled: true,
  },
  {
    name: "Bookmarks",
    path: "/bookmarks",
    icon: <Bookmark />,
    disabled: true,
  },
  {
    name: "Lists",
    path: "/lists",
    icon: <Document />,
    disabled: true,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <Person />,
    disabled: false,
  },
]

export default navigation
