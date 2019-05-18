import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import MeetingEntry from '../../atoms/MeetingEntry'

const FontCss = styled.div`
  font-size: 20px;
`

export const LeadList = ({ meetinglist_lead }) => {
  let meetings = JSON.parse(meetinglist_lead)
  console.log('<Lead Rendering>')
  return (
    <div>
      <FontCss> 내가 만든 모임 </FontCss>
      {meetings.map(meeting_entry =>
        <div key = {meeting_entry.id} >
          <MeetingEntry meeting_info = {meeting_entry}/>
        </div>
      )}
    </div>
  )
}

LeadList.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}
