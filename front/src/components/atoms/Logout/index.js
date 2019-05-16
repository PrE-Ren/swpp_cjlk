import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const LogoutCss1 = styled.div`
  position: absolute;
  float: right;
  right: 0px;
  top: 2px;
`

const LogoutCss2 = styled.div`
  border: 1.5px solid black;
  display: inline-block;
  padding: 0.5rem;
  border-radius: 5px;
  background: white;
  font-size: ${(props)=>props.fontSize};
  cursor: pointer;
  &:hover {
    background: black;
    color: white;
  }
`

export const Logout = ({ logout_click }) => {
  return (
    <LogoutCss1>
      <LogoutCss2 fontSize="1.25rem" type = "submit" onClick={logout_click}>로그아웃</LogoutCss2>
    </LogoutCss1>
  );
};

Logout.defaultProps = {
    palette: 'primary',
    type: 'button',
}
