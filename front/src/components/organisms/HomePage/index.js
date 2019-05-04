import React from 'react'
import { PropTypes } from 'prop-types'
import ToHome from '../../atoms/ToHome'
import ToMyPage from '../../atoms/ToMyPage'
import Button from '../../atoms/Button'
import Left_sidebar from '../../molecules/Left_sidebar'
import MyInfo from '../../../containers/MyInfo'
import Right_sidebar from '../../molecules/Right_sidebar'

const HomePage = ({ state, logoutReq }) => {
  if(state.mySNU_verification_token == null) {
    window.location.href = "/login"
    return <div></div>
  }
  else {
    return (
      <div>
        <ToHome type="submit" onClick={() => window.location.href = '/'}>To Home</ToHome>
        <ToMyPage type="submit" onClick={() => window.location.href = ('/user/' + state.user_id)}>My Page</ToMyPage>
        <Button type = "submit" onClick={()=> logoutReq()}> 로그아웃 </Button>
        <Left_sidebar />
        <MyInfo />
        <Right_sidebar />
      </div>
    )
  }
}

export default HomePage
