import React from 'react'
import { PropTypes } from 'prop-types'
import styled, {css} from 'styled-components'
import { font, palette } from 'styled-theme'
import { SSL_OP_SINGLE_DH_USE } from 'constants';

const Wrapper = styled.div`
  width: 150px;
  z-index: 1;
  top: 120px;
  left: 0px;
  text-align: center;
  overflow-x: hidden;
  display: inline-block;
  border: 2px solid;
  margin-top: 100px;
`

const Fonts = styled.div`
  font-size: 20px;
`

export const Left_sidebar = () => {
  return (
    <Wrapper>
      <h3>분류</h3>
      <Fonts>
        <a href="/0" style={{textDecoration: 'none'}}>음식배달</a>
        <br />
        <a href="/1" style={{textDecoration: 'none'}}>택시합승</a>
        <br />
        <a href="/2" style={{textDecoration: 'none'}}>공동구매</a>
        <br />
        <a href="/3" style={{textDecoration: 'none'}}>스터디</a>
        <br />
        <a href="/4" style={{textDecoration: 'none'}}>운동</a>
        <br />
        <a href="/5" style={{textDecoration: 'none'}}>미팅</a>
      </Fonts>
    </Wrapper>
  )
}

Left_sidebar.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}

export default Left_sidebar
