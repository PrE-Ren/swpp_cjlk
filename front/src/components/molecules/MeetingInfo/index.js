import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import CommentList from '../../../containers/CommentList'
import * as meeting_state from '../../../literal'
import { ModifyButton, CloseButton, BreakUpButton, ReOpenButton, ReCloseButton } from '../../atoms/ButtonsInMeetingInfo'
import { JoinButton, WithdrawButton } from '../../atoms/ButtonsInMeetingInfo'
import { Modal, Image, Grid, List, Container } from 'semantic-ui-react'

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
    <Modal.Description style={{ marginLeft: '10px' }}>
      <List style={{ marginTop: '20px' }}>
        <List.Item>
          <List.Icon name='user circle' />
          <List.Content>주최자 : {meeting_info.leader}</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name='calendar alternate outline' />
          <List.Content>게시 날짜 : {dateParse(meeting_info.created)}</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name='bars' />
          <List.Content>분류 : {meeting_state.KIND_NUM_TO_STRING(meeting_info.kind)}</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name='user' />
          <List.Content>현재 참여 인원 : {meeting_info.members.length}명</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name='circle' />
          <List.Content>모임 상태 : {meeting_state.STATE_NUM_TO_STRING(meeting_info.state)}</List.Content>
        </List.Item>
      </List>
      <h4><p>{meeting_info.description}</p></h4>
      {/*<h4><p>A long description is a way to provide long alternative text for non-text elements, such as images. Generally, alternative text exceeding 250 characters, which cannot be made more concise without making it less descriptive or meaningful, should have a long description. Examples of suitable use of long description are charts, graphs, maps, infographics, and other complex images. Like alternative text, long description should be descriptive and meaningful. It should also include all text that is incorporated into the image. A long description should provide visually-impaired users with as much information as sighted users would understand from the image. There are four components to creating a long description in the Waterloo Content Management System (WCMS)</p></h4>*/}
    </Modal.Description>

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
            <Modal.Content image scrolling>
              {meeting_info.picture != null ? <Image size='medium' src={meeting_info.picture} wrapped /> : <div></div>}
              {content}
              <CommentList meeting_id={meeting_info.id} />
            </Modal.Content>
            <Modal.Actions style={{ float: 'right', marginTop: '20px', marginBottom: '10px' }}>
              <CloseButton meeting_info = {meeting_info} f = {change_meeting_state_click} hash = {hash} />
              <BreakUpButton meeting_info = {meeting_info} f = {change_meeting_state_click} hash = {hash} />
              <ModifyButton meeting_info = {meeting_info} f = {change_meeting_info_click} />
            </Modal.Actions>
          </div>
        )

      case meeting_state.CLOSED :
        return (
          <div>
            <Modal.Content image scrolling>
              {meeting_info.picture != null ? <img src={meeting_info.picture} width="400" /> : <div></div>}
              {content}
              <CommentList meeting_id={meeting_info.id} />
            </Modal.Content>
            <Modal.Actions style={{ float: 'right', marginTop: '20px', marginBottom: '10px' }}>
              <ReOpenButton meeting_info = {meeting_info} f = {change_meeting_state_click} hash = {hash} />
              <BreakUpButton meeting_info = {meeting_info} f = {change_meeting_state_click} hash = {hash} />
              <ModifyButton meeting_info = {meeting_info} f = {change_meeting_info_click} />
            </Modal.Actions>
          </div>
        )

      case meeting_state.RE_OPEN :
        return (
          <div>
            <Modal.Content image scrolling>
              {meeting_info.picture != null ? <img src={meeting_info.picture} width="400" /> : <div></div>}
              {content}
              <CommentList meeting_id={meeting_info.id} />
            </Modal.Content>
            <Modal.Actions style={{ float: 'right', marginTop: '20px', marginBottom: '10px' }}>
              <ReCloseButton meeting_info = {meeting_info} f = {change_meeting_state_click} hash = {hash} />
              <BreakUpButton meeting_info = {meeting_info} f = {change_meeting_state_click} hash = {hash} />
              <ModifyButton meeting_info = {meeting_info} f = {change_meeting_info_click} />
            </Modal.Actions>
          </div>
        )

      case meeting_state.RE_CLOSED :
        return (
          <div>
            <Modal.Content image scrolling>
              {meeting_info.picture != null ? <img src={meeting_info.picture} width="400" /> : <div></div>}
              {content}
              <CommentList meeting_id={meeting_info.id} />
            </Modal.Content>
            <Modal.Actions style={{ float: 'right', marginTop: '20px', marginBottom: '10px' }}>
              <BreakUpButton meeting_info = {meeting_info} f = {change_meeting_state_click} hash = {hash} />
              <ModifyButton meeting_info = {meeting_info} f = {change_meeting_info_click} />
            </Modal.Actions>
          </div>
        )

      case meeting_state.BREAK_UP :
        return (
          <div>
            <Modal.Content image scrolling>
              {meeting_info.picture != null ? <img src={meeting_info.picture} width="400" /> : <div></div>}
              {content}
              <CommentList meeting_id={meeting_info.id} />
            </Modal.Content>
          </div>
        )
    }
  }

  // 다른 사람이 만든 모임
  else {
    // 참여 중 O
    if (meeting_info.members.includes(Number(state.user_id))) {
      switch (meeting_info.state) {
        case meeting_state.BREAK_UP :
          return (
            <div>
              <Modal.Content image>
                {meeting_info.picture != null ? <img src={meeting_info.picture} width="400" /> : <div></div>}
                {content}
                <CommentList meeting_id={meeting_info.id} />
              </Modal.Content>
            </div>
          )

        default :
          return (
            <div>
              <Modal.Content image>
                {meeting_info.picture != null ? <img src={meeting_info.picture} width="400" /> : <div></div>}
                {content}
                <CommentList meeting_id={meeting_info.id} />
              </Modal.Content>
              <Modal.Actions style={{ float: 'right', marginTop: '20px', marginBottom: '10px' }}>
                <WithdrawButton meeting_info = {meeting_info} user_id = {state.user_id} hash = {hash} f = {withdraw_meeting_click} />
              </Modal.Actions>
            </div>
          )
      }
    }
    // 참여 중 X
    else {
      return (
        <div>
          <Modal.Content image>
            {meeting_info.picture != null ? <img src={meeting_info.picture} width="400" /> : <div></div>}
            {content}
            <CommentList meeting_id={meeting_info.id} />
          </Modal.Content>
          <Modal.Actions style={{ float: 'right', marginTop: '20px', marginBottom: '10px' }}>
            <JoinButton meeting_info = {meeting_info} user_id = {state.user_id} hash = {hash} f = {join_meeting_click} />
          </Modal.Actions>
        </div>
      )
    }
  }
}

MeetingInfo.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}
