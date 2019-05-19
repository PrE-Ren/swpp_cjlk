import React from 'react'
import { PropTypes } from 'prop-types'
import styled, {css} from 'styled-components'
import { font, palette } from 'styled-theme'
import { SSL_OP_SINGLE_DH_USE } from 'constants';

const Left_sidebar_Box = styled.div`
  display: inline-block;
  float: left;
  border: 2px solid;
  border-radius: 5px;
  margin-left: 5px;
`

const Font_Classify = styled.div`
  font-size: 25px;
  font-weight: bold;
  padding-top: 10px;
  padding-bottom: 20px;
  text-align: center;
`

const Font_Kind = styled.div`
  font-size: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 30px;
  padding-right: 30px;
  text-align: center;
`
const A = styled.a`
  color: blue;
  &:hover {
    color : red;
  }
`
export const Left_sidebar = () => {
  return (
    <Left_sidebar_Box>
      <Font_Classify>분류</Font_Classify>
      <Font_Kind><A href="/list/0/?page=1" style={{textDecoration: 'none'}}>음식배달</A><br /></Font_Kind>
      <Font_Kind><A href="/list/1/?page=1" style={{textDecoration: 'none'}}>택시합승</A><br /></Font_Kind>
      <Font_Kind><A href="/list/2/?page=1" style={{textDecoration: 'none'}}>공동구매</A><br /></Font_Kind>
      <Font_Kind><A href="/list/3/?page=1" style={{textDecoration: 'none'}}>스터디</A><br /></Font_Kind>
      <Font_Kind><A href="/list/4/?page=1" style={{textDecoration: 'none'}}>운동</A><br /></Font_Kind>
      <Font_Kind><A href="/list/5/?page=1" style={{textDecoration: 'none'}}>미팅</A><br /></Font_Kind>
    </Left_sidebar_Box>
  )
}

Left_sidebar.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}

export default Left_sidebar
