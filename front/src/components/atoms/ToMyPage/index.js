import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const ToMyPageCss1 = styled.div`
  position: relative;
  float: right;
  right: 110px;
  top: -43px;
`

const ToMyPageCss2 = styled.div`
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

const ToMyPage = () => {
  return (
    <ToMyPageCss1>
      <ToMyPageCss2 fontSize="1.25rem" type="submit" onClick={() => window.location.href = '/mypage'}>My Page</ToMyPageCss2>
    </ToMyPageCss1>
  );
};

ToMyPage.defaultProps = {
    palette: 'primary',
    type: 'button',
}

export default ToMyPage
