import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const MeetingInfoCss = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

const MeetingInfo = ({ children, ...props }) => {
  return (
    <MeetingInfoCss {...props}>
      {children}
    </MeetingInfoCss>
  )
}

MeetingInfo.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}

export default MeetingInfo
