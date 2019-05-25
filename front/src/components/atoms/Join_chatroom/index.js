import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const Join_chatroom_Css = styled.div`
  display: block;
  border: 2px solid;
  border-radius: 5px;
  text-align: center;
  width: 250px;
  margin-top: 10px;
  font-size: 25px;
  padding-top: 10px;
  padding-bottom: 10px;
`

const Join_chatroom = () => {
  return (
    <Join_chatroom_Css>채팅방 빠른 입장</Join_chatroom_Css>
  )
}

Join_chatroom.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}

export default Join_chatroom
