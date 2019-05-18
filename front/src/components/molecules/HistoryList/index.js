import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import MeetingEntry from '../../atoms/MeetingEntry'

const FontCss = styled.div`
  font-size: 20px;
`

export const HistoryList = ({ meetinglist_history }) => {
  console.log('<History Rendering>')
  let meetings = JSON.parse(meetinglist_history)
  if (meetings !== null) {
    return (
      <div>
        <FontCss> 내가 참여했던 모임 </FontCss>
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

HistoryList.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}
