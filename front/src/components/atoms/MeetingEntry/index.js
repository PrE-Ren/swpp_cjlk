import React from 'react'
import MeetingInfo from '../../../containers/MeetingInfo'
import { Modal, Card, Header, Image, Grid, Label } from 'semantic-ui-react'

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

// 모임 상태에 따라 다른 라벨 태그 생성
const get_label = (state) => {
  if (state == 0)       return <Label circular as='a' color='yellow'> 모집 중 </Label>
  else if (state == 1)  return <Label circular as='a' color='red'> 모집 마감 </Label>
  else if (state == 2)  return <Label circular as='a' color='pink'> 추가 모집 중 </Label>
  else if (state == 3)  return <Label circular as='a' color='red'> 추가 모집 마감 </Label>
  else                  return <Label circular as='a' color='grey'> 해산 </Label>
}

// meeting_info : id, title, created, due, min_people, max_people, description, state, kind,
//                leader, leaderid, picture, members, comments, latitude, longitude, kakao_link
// prepare_load_comments_click : 댓글 목록을 가져오기 전까지 봉인하기 위해 플래그를 설정할 함수
export class MeetingEntry extends React.Component {
  state = { open: false }
  show = () => this.setState({ open: true })
  close = () => this.setState({ open: false})
  render() {
    // 미팅 정보를 보여줄 카드
    let meeting_entry = (
      <Card.Content style={{ cursor: 'pointer' }} onClick={() => {
        this.show()                                                 //  모임 게시글 정보 창이 뜨게 함
        this.props.prepare_load_comments_click();                   //  이전에 봤던 댓글 목록이 보이지 않도록 lock
        this.props.load_comments_click(this.props.meeting_info.id)  //  댓글 목록을 새로 로드하여 세션 스토리지에 설정한 뒤 unlock
      }}>
        {/* 제목 및 상태 라벨 */}
        <Card.Header as='h5'> {this.props.meeting_info.title} &ensp; {get_label(this.props.meeting_info.state)} </Card.Header>

        {/* 모집 현황 (최소 인원) */}
        <Card.Meta>
          모집 현황 : {this.props.meeting_info.members.length}명/{this.props.meeting_info.max_people}명&ensp;
          (최소 인원 : {this.props.meeting_info.min_people}명)
        </Card.Meta>

        {/* 마감 기한*/}
        <Card.Meta> 마감 기한 : {dateParse(this.props.meeting_info.due)} </Card.Meta>

        {/* 본문 */}
        <Card.Description> {this.props.meeting_info.description}</Card.Description>
      </Card.Content>
    )

    return (
      <React.Fragment>
        {meeting_entry}                                             {/* 간단한 모임 정보를 담은 카드 */}
        <Modal open={this.state.open} onClose={this.close}>         {/* 모임 게시글 정보 창 */}
          <MeetingInfo meeting_info = {this.props.meeting_info} />  {/* 모임 게시글 정보 */}
        </Modal>
      </React.Fragment>
    )
  }
}
