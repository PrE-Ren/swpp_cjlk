import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from '../../atoms/Button'

const MeetingInfo = ({ id, title, due, min_people, max_people, description, state, kind, leader, picture, members,
                       user_state, stateReq }) => {
  /* 내가 만든 모임일 때 */
  if (leader == user_state.username) {
    /* 모집 중 */
    if (state == 0) {
      return (
        <div>
          {description}<br />
          <Button type="submit" onClick={() => stateReq(user_state.username, user_state.password, id, title, due, min_people, max_people, description, 1, kind)}>마감</Button>
          &nbsp;
          <Button type="submit" onClick={() => stateReq(user_state.username, user_state.password, id, title, due, min_people, max_people, description, 3, kind)}>해산</Button>
        </div>
      )
    }
    /* 그 외 */
    else {
      return (
        <div>
          {description}
        </div>
      )
    }
  }

  /* 내가 만든 모임이 아닐 때 */
  else {
    if (members.includes(user_state.user_id)) {
      return (
        <div>
          {description}<br />
          <Button type="submit">탈퇴</Button>
        </div>
      )
    }
    else {
      return (
        <div>
          {description}<br />
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

export default MeetingInfo
