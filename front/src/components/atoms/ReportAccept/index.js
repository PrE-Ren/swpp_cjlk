import { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const ReportAccept = styled.span`
  font-family: ${font('primary')};
  color: ${palette({ grayscale: 0 }, 1)};
`

ReportAccept.propTypes = {
  palette: PropTypes.string,
  reverse: PropTypes.bool,
}

ReportAccept.defaultProps = {
  palette: 'grayscale',
}

export default ReportAccept
