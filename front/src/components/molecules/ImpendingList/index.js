import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import MeetingEntry from '../../atoms/MeetingEntry'

const FontCss = styled.div`
  font-size: 20px;
`

export const ImpendingList = ({ meetinglist_impending }) => {
  console.log('<ImpendingList Rendering>')
  let meetings = JSON.parse(meetinglist_impending)
  if (meetings !== null) {
    return (
      <div>
        <FontCss> 마감 임박 모임 </FontCss>
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

ImpendingList.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}
