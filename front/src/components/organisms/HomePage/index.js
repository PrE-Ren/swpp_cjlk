import React from 'react'
import { PropTypes } from 'prop-types'
import ToHome from '../../atoms/ToHome'
import ToMyPage from '../../atoms/ToMyPage'
import Logout from '../../atoms/Logout'
import Left_sidebar from '../../molecules/Left_sidebar'
import MyInfo from '../../../containers/MyInfo'
import Right_sidebar from '../../molecules/Right_sidebar'
import styled from 'styled-components'

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
        <Logout type = "submit" onClick={()=> logoutReq()}>로그아웃</Logout>
        <MyInfo />
        <Right_sidebar />
      </div>
    )
  }
}

export default HomePage
