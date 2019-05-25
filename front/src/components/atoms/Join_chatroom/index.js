import React from 'react'
import { PropTypes } from 'prop-types'
import { Menu, Icon } from 'semantic-ui-react'

const Join_chatroom = () => {
  return (
    <Menu.Item borderless><Icon name='chat' size='big' />채팅방 빠른 입장</Menu.Item>
  )
}

Join_chatroom.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}

export default Join_chatroom
