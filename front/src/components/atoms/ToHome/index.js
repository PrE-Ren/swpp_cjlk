import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const ToHomeCss1 = styled.div`
  position: relative;
  top: 5px;
  left: 20px;
`

const ToHomeCss2 = styled.div`
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

const ToHome = ({ type, ...props }) => {
  return (
    <ToHomeCss1>
      <ToHomeCss2 fontSize="1.25rem" {...props}></ToHomeCss2>
    </ToHomeCss1>
  );
};

ToHome.defaultProps = {
    palette: 'primary',
    type: 'button',
}

export default ToHome
