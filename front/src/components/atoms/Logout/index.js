import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const Logout_Css = styled.div`
  float: right;
  display: inline-block;
  text-align: center;
  border: 1.5px solid black;
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
    <Logout_Css fontSize="1.25rem" type = "submit" onClick={logout_click}>로그아웃</Logout_Css>
  );
};

Logout.defaultProps = {
    palette: 'primary',
    type: 'button',
}
