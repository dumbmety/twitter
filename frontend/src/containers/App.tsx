import { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import routes from '../utils/routes'
import Layout from '../components/Core/Layout'
import Login from './Login'
import Signup from './Signup'

export default function App() {
  return (
    <Router>
      <Switch>
        <Suspense fallback="Loading...">
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
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
        </Suspense>
      </Switch>
    </Router>
  )
}
