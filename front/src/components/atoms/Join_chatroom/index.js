import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const Join_chatroomPos = styled.div`
  text-align: center;
  display: inline-block;
  width: 300px;
  top: -1000px;
  border: 2px solid;
  font-size: 30px;
`

const Join_chatroom = ({ children, ...props }) => {
  return (
    <Join_chatroomPos>채팅방 빠른 입장</Join_chatroomPos>
  )
}

Join_chatroom.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}

export default Join_chatroom
