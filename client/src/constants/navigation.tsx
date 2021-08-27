import {
  Bookmark,
  Compass,
  Document,
  Home,
  Mail,
  Notifications
} from 'react-ionicons'

interface INavLink {
  name: string
  path: string
  icon: any
  disabled?: boolean
}

const navigation: INavLink[] = [
  {
    name: 'Home',
    path: '/',
    icon: <Home />
  },
  {
    name: 'Explore',
    path: '/explore',
    icon: <Compass />,
    disabled: true
  },
  {
    name: 'Notifications',
    path: '/notifications',
    icon: <Notifications />,
    disabled: true
  },
  {
    name: 'Messages',
    path: '/messages',
    icon: <Mail />,
    disabled: true
  },
  {
    name: 'Bookmarks',
    path: '/bookmarks',
    icon: <Bookmark />,
    disabled: true
  },
  {
    name: 'Lists',
    path: '/lists',
    icon: <Document />,
    disabled: true
  }
]

export default navigation
