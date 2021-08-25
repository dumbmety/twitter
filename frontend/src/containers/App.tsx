import { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Layout from '../components/Core/Layout'
import routes from '../utils/routes'

export default function App() {
  return (
    <Router>
      <Switch>
        <Layout>
          <Suspense fallback="Loading...">
            {routes.map((route, index) => (
              <Route
                exact
                key={index}
                path={route.path}
                component={route.component}
              />
            ))}
          </Suspense>
        </Layout>
      </Switch>
    </Router>
  )
}
