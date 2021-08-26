import { ComponentType, lazy, LazyExoticComponent } from 'react'

interface IRoute {
  path: string
  component: LazyExoticComponent<ComponentType<any>>
}

const routes: IRoute[] = [
  { path: '/', component: lazy(() => import('../containers/Home')) }
]

export default routes
