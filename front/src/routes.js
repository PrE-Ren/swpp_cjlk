import React from 'react'
import { Route, IndexRoute } from 'react-router'
import * as kind from './literal'

import App from 'components/App'
<<<<<<< HEAD
import { Home, Login, Signup, LoginAuth, New, MyPage, List, ReportAdmin } from 'components'
=======
import { Home, Login, Signup, LoginAuth, New, MyPage, List, All } from 'components'
>>>>>>> caa7988ff37fdd00441b24598d4760e0578a9cde

const routes = (
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/auth" component={LoginAuth} />
    <Route path="/new" component={New} />
    <Route path="/mypage" component={MyPage} />
    <Route path={"/list/"+kind.DELIVER} component={List} />
    <Route path={"/list/"+kind.TAXI} component={List} />
    <Route path={"/list/"+kind.BUY} component={List} />
    <Route path={"/list/"+kind.STUDY} component={List} />
    <Route path={"/list/"+kind.EXERCISE} component={List} />
    <Route path={"/list/"+kind.MEETING} component={List} />
<<<<<<< HEAD
    <Route path="/admin" component={ReportAdmin} />
=======

    <Route path={"/list/"+kind.DELIVER+"/:keyword"} component={List} />
    <Route path={"/list/"+kind.TAXI+"/:keyword"} component={List} />
    <Route path={"/list/"+kind.BUY+"/:keyword"} component={List} />
    <Route path={"/list/"+kind.STUDY+"/:keyword"} component={List} />
    <Route path={"/list/"+kind.EXERCISE+"/:keyword"} component={List} />
    <Route path={"/list/"+kind.MEETING+"/:keyword"} component={List} />
    <Route path="/all/:keyword" component={All} />
>>>>>>> caa7988ff37fdd00441b24598d4760e0578a9cde
  </div>
)

export default routes
