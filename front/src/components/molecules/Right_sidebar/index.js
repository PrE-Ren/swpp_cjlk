import React from 'react'
import { PropTypes } from 'prop-types'
import { font, palette } from 'styled-theme'
import Make_new from '../../atoms/Make_new'
import Join_chatroom from '../../atoms/Join_chatroom'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  float:right;
  top: -150px;
  right: 0px;
`
const Right_sidebar = () => {
  return (
    <div>
      <Make_new type="submit" onClick={() => window.location.href = '/new'}>새 모임 만들기</Make_new>
      <Wrapper>
        <Join_chatroom />
      </Wrapper>
    </div>
  )
}

Right_sidebar.propTypes = {
  reverse: PropTypes.bool,
}

export default Right_sidebar
