import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from '../../atoms/Button'

const MeetingInfo = ({ meeting_id, title, due, min_people, max_people, kind, description, leader, state, members, user_state, stateReq, participateReq}) => {
  let joinflag = 0; //0이면 미팅에 참여하지 않은 상태, 1이면 이미 참여하고 있는 상태
  if(leader == user_state.username){
    if(state == 0){ //모집 중
      return (
        <div>
          {description}<br />
          <Button type="submit" onClick={() => stateReq(user_state.username, user_state.password, meeting_id, 1, title, due, min_people, max_people, description, kind)}>마감</Button>
          &nbsp;
          <Button type="submit" onClick={() => stateReq(user_state.username, user_state.password, meeting_id, 3, title, due, min_people, max_people, description, kind)}>해산</Button>
        </div>
      )
    }
    else{
      return (
        <div>
          {description}
        </div>
      )
    }
  }
  else{
    for(var i in members){
      if(members[i] == user_state.user_id){
          joinflag = 1;
      }
    }
    if(joinflag == 1){
      return (
        <div>
          {description}<br />
          <Button type="submit">탈퇴</Button>
        </div>
      )
    }
    else{
      return (
        <div>
          {description}<br />
          <Button type="submit" onClick={() => participateReq(user_state.username,user_state.password, user_state.user_id, meeting_id)}>참가</Button>
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
