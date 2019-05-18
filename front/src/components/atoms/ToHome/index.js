import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const ToHome_Css = styled.div`
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

const ToHome = () => {
  return (
    <ToHome_Css fontSize="1.25rem" type="submit" onClick={() => window.location.href = '/'}>To Home</ToHome_Css>
  );
};

ToHome.defaultProps = {
    palette: 'primary',
    type: 'button',
}

export default ToHome
