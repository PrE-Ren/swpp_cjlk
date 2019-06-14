import React from 'react'
import MeetingInfo from '../../../containers/MeetingInfo'
import { Modal, Card } from 'semantic-ui-react'

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

// state : 상태 전부 (check_meeting_click 값 변경을 위함)
// meeting_info : id, title, created, due, min_people, max_people, description, state, kind,
//                leader, leaderid, picture, members, comments, latitude, longitude
export class MeetingEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { is_folded: true };
  }
  render() {
    // 미팅 정보를 보여줄 카드
    let meeting_entry = (
      <Card.Content style={{ cursor: 'pointer' }} onClick={() => {
        this.props.state.check_meeting_click = false                //  이전에 봤던 댓글 목록이 보이지 않도록 lock
        this.props.load_comments_click(this.props.meeting_info.id)  //  댓글 목록을 새로 로드하여 세션 스토리지에 설정한 뒤 unlock
      }}>
        {/* 제목 */}
        <Card.Header as='h5'> {this.props.meeting_info.title} </Card.Header>

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
      <Modal trigger={meeting_entry} >  {/* 해당 카드를 누르면 미팅 정보 창이 뜸 */}
        <Modal.Header> {this.props.meeting_info.title} </Modal.Header>  {/* 제목 */}
        <MeetingInfo meeting_info = {this.props.meeting_info} />        {/* 미팅 정보 */}
      </Modal>
    )
  }
}
