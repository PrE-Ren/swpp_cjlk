import React from 'react'
import { PropTypes } from 'prop-types'
import ToMyPage from '../../atoms/ToMyPage'
import Logout from '../../../containers/Logout'
import Make_new from '../../atoms/Make_new'
import Join_chatroom from '../../atoms/Join_chatroom'
import { Menu, Sidebar, Icon } from 'semantic-ui-react'

const Right_sidebar = () => {
  return (
<<<<<<< HEAD
    <Right_sidebar_Box>
      <Make_new type="submit" onClick={() => {localStorage.removeItem("meeting_info"),window.location.href = '/new'}}>새 모임 만들기 +</Make_new>
=======
    <Sidebar as={Menu} animation='overlay' direction='right' icon='labeled' inverted vertical visible width='wide'>
      <ToMyPage />
      <Logout />
      <Make_new />
>>>>>>> 1ccdebb7e7c9eedc16812597c76b7362747d3a1f
      <Join_chatroom />
    </Sidebar>
  )
}

Right_sidebar.propTypes = {
  reverse: PropTypes.bool,
}

export default Right_sidebar
