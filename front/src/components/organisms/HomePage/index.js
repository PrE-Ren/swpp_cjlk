import React from 'react'
import { PropTypes } from 'prop-types'
import ToHome from '../../atoms/ToHome'
import ToMyPage from '../../atoms/ToMyPage'
import Logout from '../../../containers/Logout'
import Left_sidebar from '../../molecules/Left_sidebar'
import ImpendingList from '../../../containers/ImpendingList'
import RecentList from '../../../containers/RecentList'
import Right_sidebar from '../../molecules/Right_sidebar'
import styled from 'styled-components'

const ListCss = styled.div`
  position: relative;
  float: center;
  right: -200px;
  top: 120px;
  border: 2px solid black;
  display: inline-block;
`

export const HomePage = ({ token }) => {
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
        <ListCss>
          <ImpendingList />
          <RecentList />
        </ListCss>
        <Right_sidebar />
      </div>
    )
  }
}
