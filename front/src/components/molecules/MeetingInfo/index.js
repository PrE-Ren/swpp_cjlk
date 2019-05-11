import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from '../../atoms/Button'

/* meeting_entry 필드 : id, title, created, due, min_people, max_people, description, state, kind, leader, picture, members */

export const MeetingInfo = ({ state, meeting_info, stateReq, participateReq }) => {
  /* 내가 만든 모임일 때 */
  if (meeting_info.leader == state.username) {
    /* 모집 중 */
    if (meeting_info.state == 0) {
      return (
        <div>
          {meeting_info.description}<br />
          상태 번호 : {meeting_info.state}<br />
          <Button type="submit" onClick={() => stateReq(state.username, state.password, meeting_info, 1)}>마감</Button>
          &nbsp;
          <Button type="submit" onClick={() => stateReq(state.username, state.password, meeting_info, 3)}>해산</Button>
        </div>
      )
    }
    /* 그 외 */
    else {
      return (
        <div>
          {meeting_info.description}<br />
          상태 번호 : {meeting_info.state}<br />
        </div>
      )
    }
  }

  /* 내가 만든 모임이 아닐 때 */
  else {
    if (meeting_info.members.includes(state.user_id)) {
      return (
        <div>
          {meeting_info.description}<br />
          <Button type="submit">탈퇴</Button>
        </div>
      )
    }
    else {
      return (
        <div>
          {meeting_info.description}<br />
          <Button type="submit">참가</Button>
        </div>
      )
    }
  }
}

MeetingInfo.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}
