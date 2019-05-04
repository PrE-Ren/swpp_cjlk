import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from 'components/App'
import { Home, Login, Signup } from 'components'

const routes = (
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
  </div>
)

export default routes
