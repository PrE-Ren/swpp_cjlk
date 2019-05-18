import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import MeetingEntry from '../../atoms/MeetingEntry'

const HistoryList_Box = styled.div`
  display: inline-block;
  width: 900px;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 50px;
  border: 2px solid black;
  border-radius: 5px;
`

const HistoryMeeting_Font = styled.div`
  margin-top: 5px;
  margin-left: 5px;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
`

export const HistoryList = ({ meetinglist_history }) => {
  console.log('<History Rendering>')
  if (meetinglist_history != null) {
    let meetings = JSON.parse(meetinglist_history)
    return (
      <HistoryList_Box>
        <HistoryMeeting_Font>내가 참여했던 모임</HistoryMeeting_Font>
        {meetings.map(meeting_entry =>
          <div key = {meeting_entry.id} >
            <MeetingEntry meeting_info = {meeting_entry}/>
          </div>
        )}
      </HistoryList_Box>
    )
  }
  else
    return <div></div>
}

HistoryList.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}
