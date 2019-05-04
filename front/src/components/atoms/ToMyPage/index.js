import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const ToMyPageWrapper = styled.div`
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

  const ToMyPage = ({ type, ...rest }) => {
    return (
      <ToMyPageWrapper fontSize="1.25rem" {...rest}></ToMyPageWrapper>
    );
  };

export default ToMyPage
