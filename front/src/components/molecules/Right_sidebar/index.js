import React from 'react'
import ToMyPage from '../../atoms/ToMyPage'
import Logout from '../../../containers/Logout'
import Make_new from '../../atoms/Make_new'
import Join_chatroom from '../../atoms/Join_chatroom'
import { Menu, Sidebar, Search } from 'semantic-ui-react'

const Right_sidebar = () => {
  return (
    <Sidebar as={Menu} animation='overlay' direction='right' icon='labeled' inverted vertical visible width='wide'>
      <ToMyPage/>
      <Logout/><br /><br />
      <Search placeholder="Search"/>
      <Make_new/>
      <Join_chatroom/>
    </Sidebar>
  )
}

export default Right_sidebar
