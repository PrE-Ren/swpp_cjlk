import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import MeetingEntry from '../../atoms/MeetingEntry'

const MyInfoCss = styled.div`
  position: absolute;
  float: center;
  right: 500px;
  top: 150px;
  border: 2px solid black;
  display: inline-block;
`

const FontCss = styled.div`
  font-size: 20px;
`

export const MyInfo = ({ state }) => {
  let meetings = JSON.parse(state.meetinglist_recent)
  console.log('<MyInfo Rendering>')
  return (
    <MyInfoCss>
      <FontCss>
        &emsp; 1. 이름 : {state.name} <br />
        &emsp; 2. SNU 메일 : {state.email} <br />
      </FontCss>
      {meetings.map(meeting_entry =>
        <div key = {meeting_entry.id} >
          <MeetingEntry meeting_info = {meeting_entry}/>
        </div>
      )}
    </MyInfoCss>
  )
}

MyInfo.propTypes = {
  reverse: PropTypes.bool,
}
