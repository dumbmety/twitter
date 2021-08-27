import SimpleBar from 'simplebar-react'
import { useEffect, Suspense } from 'react'
import { useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'

import * as authAction from '../store/actions/auth'
import routes from '../utils/routes'

import Layout from '../components/Common/Layout'
import Login from './Login'
import Register from './Register'
import useAuth from '../hooks/useAuth'

export default function App() {
  const dispatch = useDispatch()
  const { isLogin } = useAuth()

  useEffect(() => {
    dispatch(authAction.getUser())
    // eslint-disable-next-line
  }, [])

  return (
    <SimpleBar style={{ height: '100vh' }}>
      <Router>
        <Switch>
          <Suspense fallback="Loading...">
            {isLogin ? (
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
                <Redirect to="/" />
              </>
            )}
          </Suspense>
        </Switch>
      </Router>
    </SimpleBar>
  )
}
