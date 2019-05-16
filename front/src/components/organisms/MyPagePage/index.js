import React from 'react'
import { PropTypes } from 'prop-types'
import ToHome from '../../atoms/ToHome'
import ToMyPage from '../../atoms/ToMyPage'
import Logout from '../../../containers/Logout'
import Left_sidebar from '../../molecules/Left_sidebar'
import MyInfo from '../../../containers/MyInfo'
import Right_sidebar from '../../molecules/Right_sidebar'

export const MyPagePage = ({ token }) => {
  if (token == null) {
    Object.defineProperty(window.location, 'href', {
      writable: true,
      value: '/login'
    });
    return (<div></div>)
  }
  else {
    return (
      <div>
        <ToHome />
        <Left_sidebar />
        <ToMyPage />
        <Logout />
        <MyInfo />
      </div>
    )
  }
}
