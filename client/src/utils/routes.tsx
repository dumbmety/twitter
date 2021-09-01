import { ComponentType, lazy, LazyExoticComponent } from "react"

interface IRoute {
  path: string
  component: LazyExoticComponent<ComponentType<any>>
}

const routes: IRoute[] = [
  { path: "/", component: lazy(() => import("../containers/Home")) },
  {
    path: "/notifications",
    component: lazy(() => import("../containers/Notifications")),
  },
  {
    path: "/profile",
    component: lazy(() => import("../containers/Profile")),
  },
  {
    path: "/profile/edit",
    component: lazy(() => import("../containers/EditProfile")),
  },
  {
    path: "/profile/logout",
    component: lazy(() => import("../containers/Logout")),
  },
  {
    path: "/user/:username",
    component: lazy(() => import("../containers/User")),
  },
]

export default routes
