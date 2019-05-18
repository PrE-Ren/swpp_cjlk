import React from 'react'
import { PropTypes } from 'prop-types'
import styled, { css } from 'styled-components'
import { font, palette } from 'styled-theme'
import { ifProp } from 'styled-tools'

const fontSize = ({ height }) => `${height / 40}rem`

const backgroundColor = ({ transparent, disabled }) =>
  transparent ? 'transparent' : palette(disabled ? 2 : 1)

const foregroundColor = ({ transparent, disabled }) =>
  transparent ? palette(disabled ? 2 : 1) : palette('grayscale', 0, true)

const hoverBackgroundColor = ({ disabled, transparent }) => !disabled && !transparent && palette(0)
const hoverForegroundColor = ({ disabled, transparent }) => !disabled && transparent && palette(0)

const styles = css`
  width: 250px;
  display: block;
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  border-radius: 12px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 25px;
  text-align: center;
  cursor: pointer;
  &:hover, &:focus, &:active {
    background-color: ${hoverBackgroundColor};
    color: ${hoverForegroundColor};
  }
`

const Make_newCss = styled.button`${styles}`

const Make_new = (props) => {
  return <Make_newCss {...props} />
}

Make_new.propTypes = {
  disabled: PropTypes.bool,
  palette: PropTypes.string,
  transparent: PropTypes.bool,
  reverse: PropTypes.bool,
  height: PropTypes.number,
  type: PropTypes.string,
  to: PropTypes.string,
  href: PropTypes.string,
}

Make_new.defaultProps = {
  palette: 'primary',
  type: 'button',
}

export default Make_new
