import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import MeetingEntry from '../../atoms/MeetingEntry'

const KindList_Box = styled.div`
  display: inline-block;
  width: 900px;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 50px;
  border: 2px solid black;
  border-radius: 5px;
`

const KindMeeting_Font = styled.div`
  margin-top: 5px;
  margin-left: 5px;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
`

export const KindList = ({ meetinglist_list }) => {
  console.log('<KindList Rendering>')
  if (meetinglist_list != null) {
    let meetings = JSON.parse(meetinglist_list).results
    return (
      <KindList_Box>
        <KindMeeting_Font>모임 목록</KindMeeting_Font>
        {meetings.map(meeting_entry =>
          <div key = {meeting_entry.id} >
            <MeetingEntry meeting_info = {meeting_entry}/>
          </div>
        )}
      </KindList_Box>
    )
  }
  else
    return <div></div>
}

KindList.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}
