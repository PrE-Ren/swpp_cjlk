import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import MeetingEntry from '../../../containers/MeetingEntry'

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
const Font = styled.div`
  font-size: 17px;
  font-weight: bold;
`

export const KindList = ({ meetinglist_list }) => {
  console.log('<KindList Rendering>')
  if (meetinglist_list != null) {
    let meetings = JSON.parse(meetinglist_list).results
    console.log(meetings)
    return (
      <KindList_Box>
        <KindMeeting_Font>모임 목록</KindMeeting_Font>
        <br />
        <Font>&emsp;&emsp;제목&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
        마감기한&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;최소인원 최대인원 모집현황</Font>
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
