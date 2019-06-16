import React from 'react'
import { Route, IndexRoute } from 'react-router'
import * as kind from './literal'

import App from 'components/App'
import { Home, Login, Signup, LoginAuth, New, Tutorial, MyPage, List, All, ReportAdmin } from 'components'


const routes = (
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/auth" component={LoginAuth} />
    <Route path="/new" component={New} />
    <Route path="/tutorial" component={Tutorial} />
    <Route path="/mypage" component={MyPage} />
    <Route path={"/list/"+kind.DELIVER} component={List} />
    <Route path={"/list/"+kind.TAXI} component={List} />
    <Route path={"/list/"+kind.BUY} component={List} />
    <Route path={"/list/"+kind.STUDY} component={List} />
    <Route path={"/list/"+kind.EXERCISE} component={List} />
    <Route path={"/list/"+kind.MEETING} component={List} />
    <Route path={"/list/"+kind.DELIVER+"/:keyword"} component={List} />
    <Route path={"/list/"+kind.TAXI+"/:keyword"} component={List} />
    <Route path={"/list/"+kind.BUY+"/:keyword"} component={List} />
    <Route path={"/list/"+kind.STUDY+"/:keyword"} component={List} />
    <Route path={"/list/"+kind.EXERCISE+"/:keyword"} component={List} />
    <Route path={"/list/"+kind.MEETING+"/:keyword"} component={List} />
    <Route path="/all/:keyword" component={All} />
    <Route path="/admin" component={ReportAdmin} />
  </div>
)

export default routes
