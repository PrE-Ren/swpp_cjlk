import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from '../../atoms/Button'
import * as meeting_state from '../../../literal'

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

  console.log(meeting_info)
  if(meeting_info.picture != null){
    if(meeting_info.picture.includes("http://") == false)
    {
      meeting_info.picture = "http://127.0.0.1:8000" + meeting_info.picture
      console.log(meeting_info.picture)
    }
  }
  // 내가 만든 모임
  if (meeting_info.leader == state.username) {
    switch (meeting_info.state) {
      case meeting_state.OPEN : {
        return (
          <div>
            {content}
            {meeting_info.picture == null
              ?
              <div>
                <Button type="submit" onClick={() => meeting_info.members.length < meeting_info.min_people
                  ? alert('최소인원을 충족하지 못함')
                  : change_meeting_state_click(hash, meeting_info, meeting_state.CLOSED)}>마감</Button> &nbsp;
                <Button type="submit" onClick={() => change_meeting_state_click(hash, meeting_info, meeting_state.BREAK_UP)}>해산</Button>
              </div>
              :
              <div>
                <br />
                <img src={meeting_info.picture} width="400" /><br />
                <Button type="submit" onClick={() => meeting_info.members.length == 1 ? change_meeting_info_click(meeting_info):
                    alert('이미 멤버가 있는 상태입니다. 수정이 불가합니다')}>수정</Button>&nbsp;
                <Button type="submit" onClick={() => meeting_info.members.length < meeting_info.min_people
                  ? alert('최소인원을 충족하지 못함')
                  : change_meeting_state_click(hash, meeting_info, meeting_state.CLOSED)}>마감</Button> &nbsp;
                <Button type="submit" onClick={() => change_meeting_state_click(hash, meeting_info, meeting_state.BREAK_UP)}>해산</Button>
              </div>}
          </div>
        )
      }
      case meeting_state.CLOSED : {
        return (
          <div>
            {content}
            {meeting_info.picture == null
              ?
              <div>
                <Button type="submit" onClick={() => change_meeting_state_click(hash, meeting_info, meeting_state.RE_OPEN)}>추가 모집 시작</Button>&nbsp;
                <Button type="submit" onClick={() => change_meeting_state_click(hash, meeting_info, meeting_state.BREAK_UP)}>해산</Button>
              </div>
              :
              <div>
                <br />
                <img src={meeting_info.picture} width="400" /><br />
                <Button type="submit" onClick={() => change_meeting_state_click(hash, meeting_info, meeting_state.RE_OPEN)}>추가 모집 시작</Button>&nbsp;
                <Button type="submit" onClick={() => change_meeting_state_click(hash, meeting_info, meeting_state.BREAK_UP)}>해산</Button>
              </div>}
          </div>
        )
      }
      case meeting_state.RE_OPEN : {
        return (
          <div>
            {content}
            {meeting_info.picture == null
              ?
              <div>
                <Button type="submit" onClick={() => change_meeting_state_click(hash, meeting_info, meeting_state.RE_CLOSED)}>추가 모집 중단</Button>&nbsp;
                <Button type="submit" onClick={() => change_meeting_state_click(hash, meeting_info, meeting_state.BREAK_UP)}>해산</Button>
              </div>
              :
              <div>
                <br />
                <img src={meeting_info.picture} width="400" /><br />
                <Button type="submit" onClick={() => change_meeting_state_click(hash, meeting_info, meeting_state.RE_CLOSED)}>추가 모집 중단</Button>&nbsp;
                <Button type="submit" onClick={() => change_meeting_state_click(hash, meeting_info, meeting_state.BREAK_UP)}>해산</Button>
              </div>}
          </div>
        )
      }
      case meeting_state.RE_CLOSED : {
        return (
          <div>
            {content}
            {meeting_info.picture == null
              ?
              <div>
                <Button type="submit" onClick={() => change_meeting_state_click(hash, meeting_info, meeting_state.BREAK_UP)}>해산</Button>
              </div>
              :
              <div>
                <br />
                <img src={meeting_info.picture} width="400" /><br />
                <Button type="submit" onClick={() => change_meeting_state_click(hash, meeting_info, meeting_state.BREAK_UP)}>해산</Button>
              </div>}
          </div>
        )
      }
      case meeting_state.BREAK_UP : {
        return (
          <div>
            {content}
            {meeting_info.picture == null
              ?
              <div></div>
              :
              <div>
                <br />
                <img src={meeting_info.picture} width="400" /><br />
              </div>
            }
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
          {content}
          {meeting_info.picture == null
            ?
            <div></div>
            :
            <div>
              <br />
              <img src={meeting_info.picture} width="400" /><br />
            </div>
          }
          <Button type="submit" onClick={() => withdraw_meeting_click(hash, state.user_id, meeting_info.id)}>탈퇴</Button>
        </div>
      )
    }
    // 참여 중 X
    else {
      return (
        <div>
          {content}
          {meeting_info.picture == null
            ?
            <div></div>
            :
            <div>
              <br />
              <img src={meeting_info.picture} width="400" /><br />
            </div>
          }
          {meeting_info.members.length >= meeting_info.max_people
            ?<div>FULL</div>
            :<Button type="submit" onClick={() => join_meeting_click(hash, state.user_id, meeting_info.id)}>참가</Button>}
        </div>
      )
    }
  }
}

MeetingInfo.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}
