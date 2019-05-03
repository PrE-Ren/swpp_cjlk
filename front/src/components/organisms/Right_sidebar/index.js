import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Make_new from '../../atoms/Make_new'
import Join_chatroom from '../../molecules/Join_chatroom'
const Wrapper = styled.div`
  float:right;
  margin-top: 150px;
`

const Right_sidebar = (props) => {
  return (
    <Wrapper>
      <Make_new type="button" onClick={() => window.location.href='/new'}>새 모임 만들기</Make_new>
      <p></p>
      <Join_chatroom />
    </Wrapper>
  )
}

Right_sidebar.propTypes = {
  reverse: PropTypes.bool,
}

export default Right_sidebar
