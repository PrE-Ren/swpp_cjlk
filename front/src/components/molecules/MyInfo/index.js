import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import MeetingEntry from '../../atoms/MeetingEntry'
import LeadList from '../../../containers/LeadList'
import JoinList from '../../../containers/JoinList'
import HistoryList from '../../../containers/HistoryList'

const MyInfo_Box = styled.div`
  border: 2px solid black;
  border-radius: 5px;
  float: left;
  margin-left: 50px;
  display: inline-block;
`

const Info_Box = styled.div`
  display: block;
  margin-top: 10px;
  margin-bottom: 20px;
  margin-left: 20px;
`

const Font_Info = styled.div`
  font-size: 20px;
  display: inline-block;
`

const List_Box = styled.div`
  float: left;
  display: inline-block;
  margin-left: 20px;
  margin-right: 20px;
`

export const MyInfo = ({ state }) => {
  let meetings = JSON.parse(state.meetinglist_recent)
  console.log('<MyInfo Rendering>')
  return (
    <MyInfo_Box>
      <Info_Box>
        <Font_Info>1. 이름 : {state.name}</Font_Info><br />
        <Font_Info>2. SNU 메일 : {state.email}</Font_Info><br />
      </Info_Box>
      <List_Box>
        <LeadList />
        <JoinList />
        <HistoryList />
      </List_Box>
    </MyInfo_Box>
  )
}

MyInfo.propTypes = {
  reverse: PropTypes.bool,
}
