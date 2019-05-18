import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import MeetingEntry from '../../atoms/MeetingEntry'
import LeadList from '../../../containers/LeadList'
import JoinList from '../../../containers/JoinList'
import HistoryList from '../../../containers/HistoryList'

const MyInfoCss = styled.div`
  border: 2px solid black;
  display: block;
  margin-left: 200px;
  margin-right: 100px;
  position: relative;
  top: 100px;
  left: 3%;
`

const FontCss = styled.div`
  font-size: 20px;
`

const ListCss = styled.div`
  left: 10%
  top: 120px;
  border: 2px solid black;
  display: inline-block;
  margin-left: 30px;
  margin-top: 30px;
  margin-bottom: 30px;
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
      <ListCss>
        <LeadList />
        <JoinList />
        <HistoryList />
      </ListCss>
    </MyInfoCss>
  )
}
/*
{meetings.map(meeting_entry =>
  <div key = {meeting_entry.id} >
    <MeetingEntry meeting_info = {meeting_entry}/>
  </div>
)}
*/
MyInfo.propTypes = {
  reverse: PropTypes.bool,
}
