import React from 'react'
import ToMyPage from '../../atoms/ToMyPage'
import Logout from '../../../containers/Logout'
import Make_new from '../../atoms/Make_new'
import Join_chatroom from '../../../containers/Join_chatroom'
import { Menu, Sidebar, Input, Button } from 'semantic-ui-react'

const Right_sidebar = () => {
  let keyword  //  입력한 검색 키워드

  return (
    <Sidebar as={Menu} animation='overlay' direction='right' icon='labeled' inverted vertical visible width='wide'>
      <ToMyPage/>
      <Logout/><br /><br />
      <Input type='text' placeholder='전체 검색' action>
        <input ref={node => {keyword = node}}/>
        <Button type='submit' onClick={() => {
          if (keyword.value == "")
            alert('검색어를 입력해주세요.')
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
