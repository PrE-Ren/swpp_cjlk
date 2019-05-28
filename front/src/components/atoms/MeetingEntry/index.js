import React from 'react'
import MeetingInfo from '../../../containers/MeetingInfo'
import { Modal, Card } from 'semantic-ui-react'

const dateParse = (data) => {
    const year = data.substring(0, 19).replace("-", "년 ")
    const month = year.replace("-", "월")
    let day = month.replace("T", "일 ")
    day = day.split('+')[0]
    day = day.replace(":", "시")
    day = day.replace(":", "분&")
    return day.split("&")[0]
}

export class MeetingEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { is_folded: true };
  }
  render() {
    let meeting_entry = (
      <Card.Content style={{ cursor: 'pointer' }} onClick={() => { this.props.load_comments_click(this.props.meeting_info.id) }}>
        <Card.Header as='h5'>{this.props.meeting_info.title}</Card.Header>
        <Card.Meta>
          모집 현황 : {this.props.meeting_info.members.length}명/{this.props.meeting_info.max_people}명&ensp;
          (최소 인원 : {this.props.meeting_info.min_people}명)
        </Card.Meta>
        <Card.Meta>마감 기한 : {dateParse(this.props.meeting_info.due)}</Card.Meta>
        <Card.Description>{this.props.meeting_info.description}</Card.Description>
      </Card.Content>
    )
    return (
      <Modal trigger={meeting_entry} >
        <Modal.Header>{this.props.meeting_info.title}</Modal.Header>
        <MeetingInfo meeting_info = {this.props.meeting_info} />
      </Modal>
    )
  }
}
