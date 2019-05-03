import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const Wrapper = styled.div`
  text-align: center;
  display: inline-block;
  width: 300px;
  border: 2px solid;
  font-size: 30px;
`

const Join_chatroom = ({ children, ...props }) => {
  return (
    <Wrapper>채팅방 빠른입장</Wrapper>
  )
}

Join_chatroom.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}

export default Join_chatroom
