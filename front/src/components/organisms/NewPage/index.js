import React from 'react'
import { PropTypes } from 'prop-types'
import ToHome from '../../atoms/ToHome'
import ToMyPage from '../../atoms/ToMyPage'
import Logout from '../../../containers/Logout'
import Left_sidebar from '../../molecules/Left_sidebar'
import MeetingCreate from '../../../containers/MeetingCreate'
import Right_sidebar from '../../molecules/Right_sidebar'
import styled from 'styled-components'


export const NewPage = ({ token }) => {
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
        <Right_sidebar />
        <MeetingCreate />
      </div>
    )
  }
}

NewPage.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}
