import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import MeetingEntry from '../../atoms/MeetingEntry'

const FontCss = styled.div`
  font-size: 20px;
`

export const RecentList = ({ meetinglist_recent }) => {
  console.log('<RecentList Rendering>')
  let meetings = JSON.parse(meetinglist_recent)
  if (meetings !== null) {
    return (
      <div>
        <FontCss> 따끈따끈 방금 올라온 모임 </FontCss>
        {meetings.map(meeting_entry =>
          <div key = {meeting_entry.id} >
            <MeetingEntry meeting_info = {meeting_entry}/>
          </div>
        )}
      </div>
    )
  }
  else
    return <div></div>
}

RecentList.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}
