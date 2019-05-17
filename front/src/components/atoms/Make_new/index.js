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
  background-color: #4CAF50; /* Green */
  border: none;
  position:absolute;
  right: 5px;
  margin-top: -100px;
  width: 250px;
  color: white;
  border-radius: 12px;
  padding: 10px 30px;
  text-align: center;
  display: inline-block;
  font-size: 25px;
  cursor: pointer;
  &:hover, &:focus, &:active {
    background-color: ${hoverBackgroundColor};
    color: ${hoverForegroundColor};
  }
`

const Make_newCss = styled.button`${styles}`

const Make_new = () => {
  return <Make_newCss type="submit" onClick={() => window.location.href = '/new'} />새 모임 만들기 +</Make_newCss>
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
