import React from 'react'
import ToMyPage from '../../atoms/ToMyPage'
import Logout from '../../../containers/Logout'
import Make_new from '../../atoms/Make_new'
import Join_chatroom from '../../atoms/Join_chatroom'
import { Menu, Sidebar, Input, Button } from 'semantic-ui-react'

let keyword

const Right_sidebar = () => {
  return (
    <Sidebar as={Menu} animation='overlay' direction='right' icon='labeled' inverted vertical visible width='wide'>
      <ToMyPage/>
      <Logout/><br /><br />
      <Input type='text' placeholder='Search all . . .' action>
        <input ref={node => {keyword = node}}/>
        <Button type='submit' onClick={() => {
          if (keyword.value == "")
            alert('Type Search Keyword')
          else
            window.location.href = '/all/' + keyword.value;
        }}>Search</Button>
      </Input>
      <Make_new/>
      <Join_chatroom/>
    </Sidebar>
  )
}

export default Right_sidebar
