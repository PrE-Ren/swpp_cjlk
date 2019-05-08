import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const LogoutPos = styled.div`
  position: absolute;
  float: right;
  right: 0px;
  top: 2px;
`

const LogoutDesign = styled.div`
  border: 1.5px solid black;
  display: inline-block;
  padding: 0.5rem;
  border-radius: 5px;
  background: white;
  font-size: ${(props)=>props.fontSize};
  &:hover {
    background: black;
    color: white;
  }
`

  const Logout = ({ type, ...props }) => {
    return (
      <LogoutPos>
        <LogoutDesign fontSize="1.25rem" {...props}></LogoutDesign>
      </LogoutPos>
    );
  };

Logout.defaultProps = {
    palette: 'primary',
    type: 'button',
}

export default Logout
