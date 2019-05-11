import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import MeetingEntry from '../../atoms/MeetingEntry'

const FontCss = styled.div`
  font-size: 20px;
`

/* meeting_entry 필드 : id, title, created, due, min_people, max_people, description, state, kind, leader, picture, members */

export const RecentList = ({ state, stateReq }) => {
  let meetings = JSON.parse(state.meetinglist_recent)
  console.log('<RecentList Rendering>')
  return (
    <div>
      <FontCss> 따끈따끈 방금 올라온 모임 </FontCss>
      {meetings.map(meeting_entry =>
        <div key = {meeting_entry.id} >
          <MeetingEntry {...meeting_entry} user_state={state} stateReq = {stateReq}/>
        </div>
      )}
    </div>
  )
}

RecentList.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}
