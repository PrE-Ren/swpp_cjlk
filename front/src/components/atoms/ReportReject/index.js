import { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const ReportReject = styled.span`
  font-family: ${font('primary')};
  color: ${palette({ grayscale: 0 }, 1)};
`

ReportReject.propTypes = {
  palette: PropTypes.string,
  reverse: PropTypes.bool,
}

ReportReject.defaultProps = {
  palette: 'grayscale',
}

export default ReportReject
