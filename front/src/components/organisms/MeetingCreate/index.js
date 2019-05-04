import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

const MeetingCreate = (props) => {
  return (
    <Wrapper {...props}>content</Wrapper>
  )
}

MeetingCreate.propTypes = {
  reverse: PropTypes.bool,
}

export default MeetingCreate
