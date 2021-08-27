import { ComponentType, lazy, LazyExoticComponent } from 'react'

interface IRoute {
  path: string
  component: LazyExoticComponent<ComponentType<any>>
}

const routes: IRoute[] = [
  { path: '/', component: lazy(() => import('../containers/Home')) },
  {
    path: '/:username',
    component: lazy(() => import('../containers/Profile'))
  },
  {
    path: '/user/:username',
    component: lazy(() => import('../containers/User'))
  }
]

export default routes
