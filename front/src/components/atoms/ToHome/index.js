import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const ToHomeWrapper = styled.div`
  border: 1.5px solid black;
  display: inline-block;
  padding: 0.5rem;
  border-radius: 5px;
  background: white;
  font-size: ${(props)=>props.fontSize};
  &:hover {
    background: black;
    color: white;
  }`;

  const ToHome = ({ type, ...rest }) => {
    return (
      <ToHomeWrapper fontSize="1.25rem" {...rest}></ToHomeWrapper>
    );
  };

export default ToHome
