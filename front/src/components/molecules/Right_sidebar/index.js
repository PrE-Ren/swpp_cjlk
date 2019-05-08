import React from 'react'
import { PropTypes } from 'prop-types'
import { font, palette } from 'styled-theme'
import Make_new from '../../atoms/Make_new'
import Join_chatroom from '../../atoms/Join_chatroom'
import styled from 'styled-components'

const Right_sidebarCss = styled.div`
  position: fixed;
  float:right;
  top: 350px;
  right: 3px;
`

const Right_sidebar = () => {
  return (
    <Right_sidebarCss>
      <Make_new type="submit" onClick={() => window.location.href = '/new'}>새 모임 만들기 +</Make_new>
      <Join_chatroom />
    </Right_sidebarCss>
  )
}

Right_sidebar.propTypes = {
  reverse: PropTypes.bool,
}

export default Right_sidebar
