import React from 'react'
import CommentList from '../../../containers/CommentList'
import Map from '../../../containers/Map'
import { ModifyButton, CloseButton, BreakUpButton, ReOpenButton, ReCloseButton } from '../../atoms/ButtonsInMeetingInfo'
import { JoinButton, WithdrawButton } from '../../atoms/ButtonsInMeetingInfo'
import { Modal, Image, List, Dropdown, Message } from 'semantic-ui-react'
import * as meeting_state from '../../../literal'

// 날짜를 보기 좋게 만들어주는 함수
const dateParse = (data) => {
    const year = data.substring(0, 19).replace("-", "년 ")
    const month = year.replace("-", "월 ")
    let day = month.replace("T", "일 ")
    day = day.split('+')[0]
    day = day.replace(":", "시 ")
    day = day.replace(":", "분&")
    return day.split("&")[0]
}

// state : 상태 전부 (check_leader_click, check_member_click 값 변경을 위함)
// meeting_info : id, title, created, due, min_people, max_people, description, state, kind,
//                leader, leaderid, picture, members, comments, latitude, longitude
// change_meeting_state_click : 미팅 상태를 바꿀 때 액션을 디스패치할 함수
// join_meeting_click : 미팅에 참가할 때 액션을 디스패치할 함수
// withdraw_meeting_click : 미팅에서 탈퇴할 때 액션을 디스패치할 함수
// change_meeting_info_click : 미팅을 수정할 때 액션을 디스패치할 함수
// load_leaderinfo_click : 리더의 이름을 눌렀을 때 리더 정보를 가져오기 위해 액션을 디스패치할 함수
// load_memberinfo_click : 참여 인원을 눌렀을 때 참여 멤버들의 정보를 가져오기 위해 액션을 디스패치할 함수
export const MeetingInfo = ({ state, meeting_info, change_meeting_state_click, join_meeting_click, withdraw_meeting_click,
                            change_meeting_info_click, load_leaderinfo_click, load_memberinfo_click }) => {
  const hash = new Buffer(`${state.username}:${state.password}`).toString('base64')  //  유저의 해시값
  const member_list = JSON.parse(sessionStorage.getItem("member_list"))  //  참여 멤버 정보 로드

  // 미팅 정보
  const content =
    <Modal.Description style={{ marginLeft: '10px' }}>
      <List style={{ marginTop: '20px' }}>

        {/* 주최자 (정보 보기를 누르면 리더 정보를 가져온 후 플래그가 true로 설정되어 리렌더링됨) */}
        <List.Item>
          <List.Icon name='user circle' />
          <List.Content> 주최자 :&nbsp;
            {state.check_leader_click
              ?
              <Dropdown text={meeting_info.leader} onClick={() => { state.check_leader_click = false; load_leaderinfo_click(meeting_info.leaderid) }}>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Dropdown text='정보보기'>
                      <Dropdown.Menu>
                        <Message header='리더 정보' content={<div>
                          이름 : {sessionStorage.getItem("leader.name")}<br/>
                          이메일 : {sessionStorage.getItem("leader.email")}<br/>
                          전화번호 : {sessionStorage.getItem("leader.phone_number")}<br/>
                          </div>} />
                      </Dropdown.Menu>
                    </Dropdown>
                  </Dropdown.Item>
                  <Dropdown.Item text='신고하기' />
                </Dropdown.Menu>
              </Dropdown>
              :
              <Dropdown text={meeting_info.leader} onClick={() => {state.check_leader_click = false; load_leaderinfo_click(meeting_info.leaderid)}}>
                <Dropdown.Menu>
                </Dropdown.Menu>
              </Dropdown>
             }
          </List.Content>
        </List.Item>

        {/* 게시 날짜 */}
        <List.Item>
          <List.Icon name='calendar alternate outline' />
          <List.Content> 게시 날짜 : {dateParse(meeting_info.created)} </List.Content>
        </List.Item>

        {/* 마감 기한 */}
        <List.Item>
          <List.Icon name='calendar alternate outline' />
          <List.Content> 마감 날짜 : {dateParse(meeting_info.due)} </List.Content>
        </List.Item>

        {/* 유형 */}
        <List.Item>
          <List.Icon name='bars' />
          <List.Content> 분류 : {meeting_state.KIND_NUM_TO_STRING(meeting_info.kind)} </List.Content>
        </List.Item>

        {/* 참여 멤버(인원) */}
        <List.Item>
          <List.Icon name='user' />
          <List.Content> 현재 참여 인원 :
            {state.check_member_click
              ?
              <Dropdown text = {' ' + meeting_info.members.length + '명'}
                        onClick={() => {state.check_member_click = false; load_memberinfo_click(meeting_info.members)}}>
                <Dropdown.Menu>
                  {member_list.map(member =>
                    <Dropdown.Item key={member[0]}>
                      <Dropdown text={member[0]}>
                        <Dropdown.Menu>
                          <Dropdown.Item>
                            <Dropdown text='정보보기'>
                              <Dropdown.Menu>
                                <Message header='멤버 정보' content={<div>
                                  이름 : {member[1]}<br/>
                                  이메일 : {member[2]}<br/>
                                  전화번호 : {member[3]}<br/>
                                  </div>} />
                              </Dropdown.Menu>
                            </Dropdown>
                          </Dropdown.Item>
                          <Dropdown.Item text='신고하기' />
                        </Dropdown.Menu>
                      </Dropdown>
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
              :
              <Dropdown text = {meeting_info.members.length + '명'}
                        onClick={() => {state.check_member_click = false; load_memberinfo_click(meeting_info.members)}}>
                <Dropdown.Menu>
                </Dropdown.Menu>
                </Dropdown>
              }
          </List.Content>
        </List.Item>

        {/* 상태 */}
        <List.Item>
          <List.Icon name='circle' />
          <List.Content> 모임 상태 : {meeting_state.STATE_NUM_TO_STRING(meeting_info.state)} </List.Content>
        </List.Item>

      </List>

      {/* 지도 */}
      <Map meeting_info = {meeting_info} write = {false} />

      {/* 본문 */}
      <h4><pre>{meeting_info.description}</pre></h4>

    </Modal.Description>

  // 사진이 첨부된 미팅 게시물에서, 사진 경로에 "http://"가 없는 경우 이를 붙여줌 (그래야 보임)
  if (meeting_info.picture != null) {
    if (meeting_info.picture.includes("http://") == false) {
      meeting_info.picture = "http://127.0.0.1:8000" + meeting_info.picture
      console.log(meeting_info.picture)
    }
  }

  // 내가 만든 모임
  if (meeting_info.leader == state.username) {
    switch (meeting_info.state) {
      // 모집 중
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
      // 마감
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
      // 추가모집 중
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
      // 추가모집 마감
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
      // 해산
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
