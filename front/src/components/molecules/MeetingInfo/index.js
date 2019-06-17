import React from 'react'
import CommentList from '../../../containers/CommentList'
import Map from '../../../containers/Map'
import { ModifyButton, CloseButton, BreakUpButton, ReOpenButton, ReCloseButton } from '../../atoms/ButtonsInMeetingInfo'
import { JoinButton, WithdrawButton } from '../../atoms/ButtonsInMeetingInfo'
import { Modal, Image, List, Dropdown, Message, Form, TextArea, Button, Grid, Header } from 'semantic-ui-react'
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

// state : 상태 전부 (is_leader_loaded, is_member_loaded 값에 접근하기 위해)
// meeting_info : id, title, created, due, min_people, max_people, description, state, kind,
//                leader, leaderid, picture, members, comments, latitude, longitude, kakao_link
// change_meeting_state_click : 미팅 상태를 바꿀 때 액션을 디스패치할 함수
// change_meeting_info_click : 미팅을 수정할 때 액션을 디스패치할 함수
// join_meeting_click : 미팅에 참가할 때 액션을 디스패치할 함수
// withdraw_meeting_click : 미팅에서 탈퇴할 때 액션을 디스패치할 함수
// prepare_load_leaderinfo_click : 리더 정보를 가져오기 전까지 봉인하기 위해 플래그를 설정할 함수
// load_leaderinfo_click : 리더의 이름을 눌렀을 때 리더 정보를 가져오기 위해 액션을 디스패치할 함수
// prepare_load_memberinfo_click : 참여 멤버들 정보를 가져오기 전까지 봉인하기 위해 플래그를 설정할 함수
// load_memberinfo_click : 참여 인원을 눌렀을 때 참여 멤버들의 정보를 가져오기 위해 액션을 디스패치할 함수
// accuse_click : 신고할 때 액션을 디스패치할 함수 (Report 모델 POST)
export class MeetingInfo extends React.Component {
  state = {
    accuse_open: false,
    accuse_reason: null,  //  신고 사유
    member_id: null       //  Reportee 고유값
  }
  accuse_show = () => this.setState({ accuse_open: true })
  accuse_close = () => this.setState({ accuse_open: false})

  render() {
    const {
      state, meeting_info, change_meeting_state_click, change_meeting_info_click, join_meeting_click, withdraw_meeting_click,
      prepare_load_leaderinfo_click, load_leaderinfo_click, prepare_load_memberinfo_click, load_memberinfo_click, accuse_click
    } = this.props
    const { accuse_reason, member_id } = this.state
    const hash = new Buffer(`${state.username}:${state.password}`).toString('base64')  //  유저의 해시값
    const member_list = JSON.parse(sessionStorage.getItem("member_list"))  //  참여 멤버 정보 로드
    const leader_id = meeting_info.leaderid  //  Reporter 고유값

    // 신고 창
    const accuse_content =
      <Modal open={this.state.accuse_open} onClose={this.accuse_close}>
        <Modal.Header> 신고하기 </Modal.Header>
        <Form reply style={{ margin: '10px' }}>
          <Form.TextArea onChange={(e) => { this.setState({ accuse_reason: e.target.value }) }} placeholder='신고 사유'/>
        </Form>
        <Modal.Actions>
          <Button positive icon='checkmark' labelPosition='right' content='완료'
                  onClick={() => {
                    if (accuse_reason !== null)
                      accuse_click(hash, accuse_reason, member_id), alert("신고가 접수되었습니다."), this.accuse_close()
                    else
                      alert("신고 사유를 적어주세요.")
                  }}/>
          <Button negative onClick={() => { this.setState({ accuse_reason: null }), this.accuse_close() }}> 취소 </Button>
        </Modal.Actions>
      </Modal>

    // 상단 제목
    const window_title = <Modal.Header> {meeting_info.title} </Modal.Header>

    // 모임 기본 정보 (주최자, 게시 날짜, 마감 기한, 유형, 참여 멤버, 상태, 참여 멤버 엑셀 파일 다운, 오픈 채팅방 링크, 본문)
    const basic_info =
      <React.Fragment>
        <List style={{ marginTop: '20px' }}>

          {/* 주최자 (정보 보기를 누르면 리더 정보를 가져온 후 플래그가 true로 설정되어 리렌더링됨) */}
          <List.Item>
            <List.Icon name='user circle' />
            <List.Content> 주최자 :&nbsp;
              {state.is_leader_loaded
                ?
                <Dropdown id="top" text={meeting_info.leader} onClick={() => { prepare_load_leaderinfo_click(); load_leaderinfo_click(meeting_info.leaderid) }}>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Dropdown text='정보보기'>
                        <Dropdown.Menu>
                          <Message header='리더 정보' content={<div>
                            이름 : {meeting_info.leader}<br/>
                            이메일 : {sessionStorage.getItem("leader.email")}<br/>
                            전화번호 : {sessionStorage.getItem("leader.phone_number")}<br/>
                            벌점 : {sessionStorage.getItem("leader.points")}<br/>
                            </div>} />
                        </Dropdown.Menu>
                      </Dropdown>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Dropdown text='신고하기' onClick={() => { this.setState({ member_id: leader_id}); this.accuse_show() }}/>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                :
                <Dropdown text={meeting_info.leader} onClick={() => { prepare_load_leaderinfo_click(); load_leaderinfo_click(meeting_info.leaderid)}}>
                  <Dropdown.Menu>
                  </Dropdown.Menu>
                </Dropdown>
              }
              {accuse_content}
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
              {/* 참여 멤버를 신고할 수 있는 건 오직 리더 */}
              {leader_id == state.user_id
                ?
                <Dropdown text = {' ' + meeting_info.members.length + '명'}
                          onClick={() => { prepare_load_memberinfo_click(); load_memberinfo_click(meeting_info.members) }}>
                {state.is_member_loaded
                  ?
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
                                      벌점 : {member[4]}<br/>
                                      </div>} />
                                  </Dropdown.Menu>
                                </Dropdown>
                              </Dropdown.Item>
                              <Dropdown.Item >
                                <Dropdown text='신고하기' onClick={() => { this.setState({ member_id: member[5]}); this.accuse_show() }}/>
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  :
                    <Dropdown.Menu>
                    </Dropdown.Menu>}
                </Dropdown>
                :
                <span> {meeting_info.members.length}명</span>
              }
              {accuse_content}
            </List.Content>
          </List.Item>

          {/* 상태 */}
          <List.Item>
            <List.Icon name='circle' />
            <List.Content> 모임 상태 : {meeting_state.STATE_NUM_TO_STRING(meeting_info.state)} </List.Content>
          </List.Item>

          {/* 참여 멤버 정보 엑셀 파일 다운 (오직 리더만 가능) */}
          {meeting_info.leader == state.username
            ?
            <List.Item>
              <List.Icon name='file excel' />
              <List.Content as='a' target="_blank" href={'http://localhost:8000/infoexcel_secure/' + meeting_info.secure_token}> 참여 멤버 정보 다운 </List.Content>
            </List.Item>
            :
            <div></div>
          }

          {/* 오픈 채팅방 링크 */}
          {meeting_info.kakao_link !== "" && meeting_info.members.includes(Number(state.user_id))
            ?
            <List.Item>
              <List.Icon name='chat' />
              <List.Content as='a' target="_blank" href={meeting_info.kakao_link}> 오픈 채팅 링크 : {meeting_info.kakao_link}
              </List.Content>
            </List.Item>
            :
            <div></div>
          }
        </List>

        {/* 본문 */}
        <h4><pre>{meeting_info.description}</pre></h4>
      </React.Fragment>

    // 사진 + 모임 기본 정보 + 지도 + 댓글 목록
    const all_info =
      <Modal.Content image scrolling>
        <Grid column={2}>
          {/* 사진 및 모임 기본 정보 */}
          <Grid.Row>
            <Grid.Column width={7}>  {/* 사진 (없으면 기본 사진) */}
              {meeting_info.picture != null
                ? <Image wrapped size='medium' src={meeting_info.picture} />
                : <Image wrapped size='medium' src='https://react.semantic-ui.com/images/wireframe/image.png' />}
            </Grid.Column>
            <Grid.Column width={9}>  {/* 모임 기본 정보  */}
              <Header> 모임 정보 </Header>
              {basic_info}
            </Grid.Column>
          </Grid.Row>

          {/* 지도 */}
          <Grid.Row>
            <div style={{ marginLeft: '15px' }}><Map meeting_info = {meeting_info} write = {false} /></div>
          </Grid.Row>

          {/* 댓글 목록 */}
          <Grid.Row>
            <Grid.Column width={16}>
              <CommentList meeting_id={meeting_info.id} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>

    // 사진이 첨부된 미팅 게시물에서, 사진 경로에 "http://"가 없는 경우 이를 붙여줌 (그래야 보임)
    if (meeting_info.picture != null)
      if (meeting_info.picture.includes("http://") == false)
        meeting_info.picture = "http://127.0.0.1:8000" + meeting_info.picture

    // 내가 만든 모임
    if (meeting_info.leader == state.username) {
      switch (meeting_info.state) {
        // 모집 중
        case meeting_state.OPEN :
          return (
            <React.Fragment>
              {window_title}{all_info}
              {/* 마감, 해산, 수정 */}
              <div>
                <Modal.Actions style={{ float: 'right', marginTop: '20px', marginBottom: '10px' }}>
                  <CloseButton meeting_info = {meeting_info} f = {change_meeting_state_click} hash = {hash} />
                  <BreakUpButton meeting_info = {meeting_info} f = {change_meeting_state_click} hash = {hash} />
                  <ModifyButton meeting_info = {meeting_info} f = {change_meeting_info_click} />
                </Modal.Actions>
              </div>
            </React.Fragment>
          )
        // 마감
        case meeting_state.CLOSED :
          return (
            <React.Fragment>
              {window_title}{all_info}
              {/* 추가모집 시작, 해산, 수정 */}
              <div>
                <Modal.Actions style={{ float: 'right', marginTop: '20px', marginBottom: '10px' }}>
                  <ReOpenButton meeting_info = {meeting_info} f = {change_meeting_state_click} hash = {hash} />
                  <BreakUpButton meeting_info = {meeting_info} f = {change_meeting_state_click} hash = {hash} />
                  <ModifyButton meeting_info = {meeting_info} f = {change_meeting_info_click} />
                </Modal.Actions>
              </div>
            </React.Fragment>
          )
        // 추가모집 중
        case meeting_state.RE_OPEN :
          return (
            <React.Fragment>
              {window_title}{all_info}
              {/* 추가모집 중단, 해산, 수정 */}
              <div>
                <Modal.Actions style={{ float: 'right', marginTop: '20px', marginBottom: '10px' }}>
                  <ReCloseButton meeting_info = {meeting_info} f = {change_meeting_state_click} hash = {hash} />
                  <BreakUpButton meeting_info = {meeting_info} f = {change_meeting_state_click} hash = {hash} />
                  <ModifyButton meeting_info = {meeting_info} f = {change_meeting_info_click} />
                </Modal.Actions>
              </div>
            </React.Fragment>
          )
        // 추가모집 마감
        case meeting_state.RE_CLOSED :
          return (
            <React.Fragment>
              {window_title}{all_info}
              {/* 해산, 수정 */}
              <div>
                <Modal.Actions style={{ float: 'right', marginTop: '20px', marginBottom: '10px' }}>
                  <BreakUpButton meeting_info = {meeting_info} f = {change_meeting_state_click} hash = {hash} />
                  <ModifyButton meeting_info = {meeting_info} f = {change_meeting_info_click} />
                </Modal.Actions>
              </div>
            </React.Fragment>
          )
        // 해산
        case meeting_state.BREAK_UP :
          return (
            <React.Fragment>
              {window_title}{all_info}
            </React.Fragment>
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
              <React.Fragment>
                {window_title}{all_info}
              </React.Fragment>
            )

          default :
            return (
              <React.Fragment>
                {window_title}{all_info}
                {/* 탈퇴 */}
                <div>
                  <Modal.Actions style={{ float: 'right', marginTop: '20px', marginBottom: '10px' }}>
                    <WithdrawButton meeting_info = {meeting_info} user_id = {state.user_id} hash = {hash} f = {withdraw_meeting_click} />
                  </Modal.Actions>
                </div>
              </React.Fragment>
            )
        }
      }
      // 참여 중 X
      else {
        return (
          <React.Fragment>
            {window_title}{all_info}
            {/* 참가 */}
            <div>
              <Modal.Actions style={{ float: 'right', marginTop: '20px', marginBottom: '10px' }}>
                <JoinButton meeting_info = {meeting_info} user_id = {state.user_id} hash = {hash} f = {join_meeting_click} />
              </Modal.Actions>
            </div>
          </React.Fragment>
        )
      }
    }
  }
}
