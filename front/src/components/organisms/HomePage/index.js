import React from 'react'
import { PropTypes } from 'prop-types'
import Button from '../../atoms/Button'
import Left_sidebar from '../../molecules/Left_sidebar'
import Right_sidebar from '../../molecules/Right_sidebar'

const HomePage = ({state, logoutReq}) => {
  if(state.mySNU_verification_token == null)
  {
    window.location.href = "/login"  
    return null
  }
  else
  {
    return (
      <div>
        <Button type = "submit" onClick={()=> logoutReq()}> 로그아웃 </Button>
        <Left_sidebar />
        <Right_sidebar />
      </div>
    )
  }
}

export default HomePage
