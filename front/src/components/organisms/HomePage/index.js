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
import { Nav, NavLink } from 'styled-nav-component';

const Title_Font = styled.div`
  display: flex;
  font-size: 55px;
  font-weight: bold;
  justify-content: center;
`

const Upper_Box = styled.div`
  display: block;
  margin-top: 5px;
  margin-left: 5px;
  margin-bottom: 100px;
  margin-right: 5px;
`

const Lower_Box = styled.div`
  display: block;
  margin-left: 5px;
  margin-right: 5px;
`

const List_Box = styled.div`
  float: left;
  margin-left: 10%;
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
        <Alert success />
        <Upper_Box>
          <ToHome />
          <Logout />
          <ToMyPage />
          <Title_Font>SNU Moyeo</Title_Font>
        </Upper_Box>
        <Lower_Box>
          <Left_sidebar />
          <List_Box>
            <ImpendingList />
            <RecentList />
          </List_Box>
          <Right_sidebar />
        </Lower_Box>
      </div>
    )
  }
}
