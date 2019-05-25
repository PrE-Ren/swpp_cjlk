import React from 'react'
import { PropTypes } from 'prop-types'
import ToMyPage from '../../atoms/ToMyPage'
import Logout from '../../../containers/Logout'
import Make_new from '../../atoms/Make_new'
import Join_chatroom from '../../atoms/Join_chatroom'
import { Menu, Sidebar, Icon } from 'semantic-ui-react'

const Right_sidebar = () => {
  return (
    <Sidebar as={Menu} animation='overlay' direction='right' icon='labeled' inverted vertical visible width='wide'>
      <ToMyPage />
      <Logout />
      <Make_new />
      <Join_chatroom />
    </Sidebar>
  )
}

Right_sidebar.propTypes = {
  reverse: PropTypes.bool,
}

export default Right_sidebar
