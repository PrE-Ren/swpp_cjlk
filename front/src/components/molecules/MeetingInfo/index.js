import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from '../../atoms/Button'
import * as meeting_state from '../../../literal'
import { ModifyButton, CloseButton, BreakUpButton, ReOpenButton, ReCloseButton } from '../../atoms/ButtonsInMeetingInfo'
import { JoinButton, WithdrawButton } from '../../atoms/ButtonsInMeetingInfo'

const Info_Box = styled.div`
  font-size: 20px;
  font-weight: 400;
  padding-top: 20px;
  padding-left: 10px;
  padding-bottom: 20px;
`
const Font = styled.div`
  float: right;
  font-size: 17px;
  font-weight: 600;
`

const dateParse = (data) => {
    const year = data.substring(0, 19).replace("-", "년 ")
    const month = year.replace("-", "월")
    let day = month.replace("T", "일 ")
    day = day.split('+')[0]
    day = day.replace(":", "시")
    day = day.replace(":", "분&")
    return day.split("&")[0]
}

/* meeting_entry 필드 : id, title, created, due, min_people, max_people, description, state, kind, leader, picture, members */

export const MeetingInfo = ({ state, meeting_info, change_meeting_state_click, join_meeting_click, withdraw_meeting_click, change_meeting_info_click}) => {
  const hash = new Buffer(`${state.username}:${state.password}`).toString('base64')
  const content =
    <Info_Box>
      <Font>제목 : {meeting_info.title}</Font><br />
      <Font>주최자 : {meeting_info.leader}</Font><br />
      <Font>게시 날짜 : {dateParse(meeting_info.created)}</Font><br />
      <Font>분류 : {meeting_state.KIND_NUM_TO_STRING(meeting_info.kind)}</Font><br />
      <Font>현재 참여 인원 : {meeting_info.members.length}명</Font><br />
      <Font>모임 상태 : {meeting_state.STATE_NUM_TO_STRING(meeting_info.state)}</Font><br />
      <pre style={{fontSize:'20px', fontFamily: 'Georgia'}}>{meeting_info.description}</pre>
    </Info_Box>

  if (meeting_info.picture != null) {
    if (meeting_info.picture.includes("http://") == false) {
      meeting_info.picture = "http://127.0.0.1:8000" + meeting_info.picture
      console.log(meeting_info.picture)
    }
  }

  // 내가 만든 모임
  if (meeting_info.leader == state.username) {
    switch (meeting_info.state) {
      case meeting_state.OPEN :
        return (
          <div>
            {content}
            {meeting_info.picture != null ? <img src={meeting_info.picture} width="400" /> : <div></div>}
            <ModifyButton meeting_info = {meeting_info} f = {change_meeting_info_click} />
            <CloseButton meeting_info = {meeting_info} f = {change_meeting_state_click} hash = {hash} />
            <BreakUpButton meeting_info = {meeting_info} f = {change_meeting_state_click} hash = {hash} />
          </div>
        )

      case meeting_state.CLOSED :
        return (
          <div>
            {content}
            {meeting_info.picture != null ? <img src={meeting_info.picture} width="400" /> : <div></div>}
            <ModifyButton meeting_info = {meeting_info} f = {change_meeting_info_click} />
            <ReOpenButton meeting_info = {meeting_info} f = {change_meeting_state_click} hash = {hash} />
            <BreakUpButton meeting_info = {meeting_info} f = {change_meeting_state_click} hash = {hash} />
          </div>
        )

      case meeting_state.RE_OPEN :
        return (
          <div>
            {content}
            {meeting_info.picture != null ? <img src={meeting_info.picture} width="400" /> : <div></div>}
            <ModifyButton meeting_info = {meeting_info} f = {change_meeting_info_click} />
            <ReCloseButton meeting_info = {meeting_info} f = {change_meeting_state_click} hash = {hash} />
            <BreakUpButton meeting_info = {meeting_info} f = {change_meeting_state_click} hash = {hash} />
          </div>
        )

      case meeting_state.RE_CLOSED :
        return (
          <div>
            {content}
            {meeting_info.picture != null ? <img src={meeting_info.picture} width="400" /> : <div></div>}
            <ModifyButton meeting_info = {meeting_info} f = {change_meeting_info_click} />
            <BreakUpButton meeting_info = {meeting_info} f = {change_meeting_state_click} hash = {hash} />
          </div>
        )

      case meeting_state.BREAK_UP :
        return (
          <div>
            {content}
            {meeting_info.picture != null ? <img src={meeting_info.picture} width="400" /> : <div></div>}
          </div>
        )
    }
  }

  // 다른 사람이 만든 모임
  else {
    // 참여 중 O
    if (meeting_info.members.includes(Number(state.user_id))) {
      return (
        <div>
          {content}
          {meeting_info.picture != null ? <img src={meeting_info.picture} width="400" /> : <div></div>}
          <WithdrawButton meeting_info = {meeting_info} user_id = {state.user_id} hash = {hash} f = {withdraw_meeting_click} />
        </div>
      )
    }
    // 참여 중 X
    else {
      return (
        <div>
          {content}
          {meeting_info.picture != null ? <img src={meeting_info.picture} width="400" /> : <div></div>}
          <JoinButton meeting_info = {meeting_info} user_id = {state.user_id} hash = {hash} f = {join_meeting_click} />
        </div>
      )
    }
  }
}

MeetingInfo.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}
