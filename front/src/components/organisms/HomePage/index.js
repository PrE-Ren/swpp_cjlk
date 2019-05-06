import React from 'react'
import { PropTypes } from 'prop-types'
import ToHome from '../../atoms/ToHome'
import ToMyPage from '../../atoms/ToMyPage'
import Button from '../../atoms/Button'
import Left_sidebar from '../../molecules/Left_sidebar'
import MyInfo from '../../../containers/MyInfo'
import Right_sidebar from '../../molecules/Right_sidebar'
import styled from 'styled-components'

const HomeCss = styled.div`
  position: relative;
  top: 5px;
  left: 20px;
`

const MyPageCss = styled.div`
  position: relative;
  float:right;
  right:110px;
  top:-43px;
`
const LogoutCss = styled.div`
  position: relative;
  float: right;
  right:-90px;
  top:-43px;
`
const Left_sidebarCss = styled.div`
  left: 5px;
`
const MyInfoCss = styled.div`
  position: relative;
  float: center;
  right: -200px;
  top: -250px;
`

const HomePage = ({ state, logoutReq }) => {
  if(state.mySNU_verification_token == null) {
    Object.defineProperty(window.location, 'href', {
      writable: true,
      value: '/login'
    });
    return <div></div>
  }
  else {
    return (
      <div>
        <HomeCss>
          <ToHome type="submit" onClick={() => window.location.href = '/'}>To Home</ToHome>
        </HomeCss>

        <Left_sidebar />

        <MyPageCss>
          <ToMyPage type="submit" onClick={() => window.location.href = ('/user/' + state.user_id)}>My Page</ToMyPage>
        </MyPageCss>

        <LogoutCss>
          <Button type = "submit" onClick={()=> logoutReq()}>로그아웃</Button>
        </LogoutCss>
        <MyInfoCss>
          <MyInfo />
        </MyInfoCss>
        
        <Right_sidebar />

      </div>
    )
  }
}

export default HomePage
