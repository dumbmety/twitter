import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SimpleBar from 'simplebar-react'
import { useEffect, Suspense } from 'react'
import { useDispatch } from 'react-redux'
import { SkeletonTheme } from 'react-loading-skeleton'

import * as authAction from '../store/actions/auth'
import Layout from '../components/Common/Layout'
import routes from '../utils/routes'
import theme from '../styles/ThemeStyles'
import useAuth from '../hooks/useAuth'

import Login from './Login'
import Register from './Register'

export default function App() {
  const dispatch = useDispatch()
  const { loading, isLogin } = useAuth()

  useEffect(() => {
    dispatch(authAction.getUser())
    // eslint-disable-next-line
  }, [])

  return (
    <SimpleBar style={{ height: '100vh' }}>
      <SkeletonTheme
        color={theme.dark.backgroundBox}
        highlightColor={theme.dark.backgroundCard}
      >
        <Router>
          <Switch>
            <Suspense fallback="Loading...">
              {loading ? (
                'Loading...'
              ) : isLogin ? (
                <Layout>
                  {routes.map((route, index) => (
                    <Route
                      exact
                      key={index}
                      path={route.path}
                      component={route.component}
                    />
                  ))}
                </Layout>
              ) : (
                <>
                  <Route path="/register" component={Register} />
                  <Route path="/" exact component={Login} />
                </>
              )}
            </Suspense>
          </Switch>
        </Router>
      </SkeletonTheme>
    </SimpleBar>
  )
}
