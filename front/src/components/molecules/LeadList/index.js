import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import MeetingEntry from '../../atoms/MeetingEntry'

const LeadList_Box = styled.div`
  display: block;
  width: 900px;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 50px;
  border: 2px solid black;
  border-radius: 5px;
`

const LeadMeeting_Font = styled.div`
  margin-top: 5px;
  margin-left: 5px;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
`
const Font = styled.div`
  font-size: 17px;
  font-weight: bold;
`

export const LeadList = ({ meetinglist_lead }) => {
  console.log('<Lead Rendering>')
  if (meetinglist_lead != null) {
    let meetings = JSON.parse(meetinglist_lead)
    return (
      <LeadList_Box>
        <LeadMeeting_Font>내가 만든 모임</LeadMeeting_Font>
        <br />
        <Font>&emsp;&emsp;제목&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
        마감기한&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;최소인원 최대인원 모집현황</Font>
        {meetings.map(meeting_entry =>
          <div key = {meeting_entry.id} >
            <MeetingEntry meeting_info = {meeting_entry}/>
          </div>
        )}
      </LeadList_Box>
    )
  }
  else
    return <div></div>
}

LeadList.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}
