import { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import routes from '../utils/routes'

export default function App() {
  return (
    <Router>
      <Switch>
        <Suspense fallback="Loading...">
          {routes.map(route => (
            <Route exact path={route.path} component={route.component} />
          ))}
        </Suspense>
      </Switch>
    </Router>
  )
}
