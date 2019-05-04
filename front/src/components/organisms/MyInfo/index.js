import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import MeetingEntry from '../../atoms/MeetingEntry'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

export const MyInfo = ({ state }) => {
  let meetings = JSON.parse(state.meeting_list)
  console.log('<Rendering>')
  return (
    <div>
      {meetings.map(meeting_entry =>
        <div key = {meeting_entry.id} >
          <MeetingEntry {...meeting_entry} />
        </div>
      )}
    </div>
  )
}

MyInfo.propTypes = {
  reverse: PropTypes.bool,
}

export default MyInfo
