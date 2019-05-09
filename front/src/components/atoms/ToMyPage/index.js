import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const ToMyPagePos = styled.div`
  position: relative;
  float:right;
  right:110px;
  top:-43px;
`

const ToMyPageDesign = styled.div`
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

  const ToMyPage = ({ type, ...props }) => {
    return (
      <ToMyPagePos>
        <ToMyPageDesign fontSize="1.25rem" {...props}></ToMyPageDesign>
      </ToMyPagePos>
    );
  };

ToMyPage.defaultProps = {
    palette: 'primary',
    type: 'button',
}

export default ToMyPage
