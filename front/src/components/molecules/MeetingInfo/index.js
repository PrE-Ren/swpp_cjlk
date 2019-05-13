import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from '../../atoms/Button'
import * as meeting_state from '../../../literal'

/* meeting_entry 필드 : id, title, created, due, min_people, max_people, description, state, kind, leader, picture, members */

export const MeetingInfo = ({ state, meeting_info, change_meeting_state_click, join_meeting_click, withdraw_meeting_click }) => {
  const hash = new Buffer(`${state.username}:${state.password}`).toString('base64')
  // 내가 만든 모임
  if (meeting_info.leader == state.username) {
    switch (meeting_info.state) {
      case meeting_state.OPEN : {
        return (
          <div>
            주최자 : {meeting_info.leader}<br />
            본문 : {meeting_info.description}<br />
            상태 : {meeting_state.NUM_TO_STRING(meeting_info.state)}<br />
            <Button type="submit" onClick={() => change_meeting_state_click(hash, meeting_info, meeting_state.CLOSED)}>마감</Button>&nbsp;
            <Button type="submit" onClick={() => change_meeting_state_click(hash, meeting_info, meeting_state.BREAK_UP)}>해산</Button>
          </div>
        )
      }
      case meeting_state.CLOSED : {
        return (
          <div>
            주최자 : {meeting_info.leader}<br />
            본문 : {meeting_info.description}<br />
            상태 : {meeting_state.NUM_TO_STRING(meeting_info.state)}<br />
            <Button type="submit" onClick={() => change_meeting_state_click(hash, meeting_info, meeting_state.RE_OPEN)}>추가 모집 시작</Button>&nbsp;
            <Button type="submit" onClick={() => change_meeting_state_click(hash, meeting_info, meeting_state.BREAK_UP)}>해산</Button>
          </div>
        )
      }
      case meeting_state.RE_OPEN : {
        return (
          <div>
            주최자 : {meeting_info.leader}<br />
            본문 : {meeting_info.description}<br />
            상태 : {meeting_state.NUM_TO_STRING(meeting_info.state)}<br />
            <Button type="submit" onClick={() => change_meeting_state_click(hash, meeting_info, meeting_state.RE_CLOSED)}>추가 모집 중단</Button>&nbsp;
            <Button type="submit" onClick={() => change_meeting_state_click(hash, meeting_info, meeting_state.BREAK_UP)}>해산</Button>
          </div>
        )
      }
      case meeting_state.RE_CLOSED : {
        return (
          <div>
            주최자 : {meeting_info.leader}<br />
            본문 : {meeting_info.description}<br />
            상태 : {meeting_state.NUM_TO_STRING(meeting_info.state)}<br />
            <Button type="submit" onClick={() => change_meeting_state_click(hash, meeting_info, meeting_state.BREAK_UP)}>해산</Button>
          </div>
        )
      }
      case meeting_state.BREAK_UP : {
        return (
          <div>
            주최자 : {meeting_info.leader}<br />
            본문 : {meeting_info.description}<br />
            상태 : {meeting_state.NUM_TO_STRING(meeting_info.state)}<br />
          </div>
        )
      }
    }
  }
  // 다른 사람이 만든 모임
  else {
    // 참여 중 O
    if (meeting_info.members.includes(Number(state.user_id))) {
      return (
        <div>
          주최자 : {meeting_info.leader}<br />
          본문 : {meeting_info.description}<br />
          상태 : {meeting_state.NUM_TO_STRING(meeting_info.state)}<br />
          <Button type="submit" onClick={() => withdraw_meeting_click(hash, state.user_id, meeting_info.id)}>탈퇴</Button>
        </div>
      )
    }
    // 참여 중 X
    else {
      return (
        <div>
          주최자 : {meeting_info.leader}<br />
          본문 : {meeting_info.description}<br />
          상태 : {meeting_state.NUM_TO_STRING(meeting_info.state)}<br />
          <Button type="submit" onClick={() => join_meeting_click(hash, state.user_id, meeting_info.id)}>참가</Button>
        </div>
      )
    }
  }
}

MeetingInfo.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}
