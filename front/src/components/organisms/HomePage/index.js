import React from 'react'
import { PropTypes } from 'prop-types'
import ToHome from '../../atoms/ToHome'
import ToMyPage from '../../atoms/ToMyPage'
import Logout from '../../atoms/Logout'
import Left_sidebar from '../../molecules/Left_sidebar'
import ImpendingList from '../../../containers/ImpendingList'
import RecentList from '../../../containers/RecentList'
import Right_sidebar from '../../molecules/Right_sidebar'
import styled from 'styled-components'

const ListCss = styled.div`
  position: absolute;
  float: center;
  right: 500px;
  top: 150px;
  border: 2px solid black;
  display: inline-block;
`

const HomePage = ({ state, logoutReq }) => {
  if (state.mySNU_verification_token == null) {
    Object.defineProperty(window.location, 'href', {
      writable: true,
      value: '/login'
    });
    return (<div></div>)
  }
  else {
    return (
      <div>
        <ToHome type="submit" onClick={() => window.location.href = '/'}>To Home</ToHome>
        <Left_sidebar />
        <ToMyPage type="submit" onClick={() => window.location.href = '/mypage'}>My Page</ToMyPage>
        <Logout type = "submit" onClick={() => logoutReq()}>로그아웃</Logout>
        <ListCss>
          <ImpendingList state={state} />
          <RecentList state={state} />
        </ListCss>
        <Right_sidebar />
      </div>
    )
  }
}

export default HomePage
