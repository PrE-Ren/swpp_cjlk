import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import MeetingInfo from '../../../containers/MeetingInfo'
import { Modal } from 'semantic-ui-react'

const MeetingEntryCss = styled.span`
  display: inline-block;
  width: 800px;
  padding: 0.5rem 0.5rem;
  margin: 1rem 2rem;
  border: 2px solid cadetblue;
  font-size: 20px;
  border-radius: 7px;
  &:hover {
    background: azure;
  }
`

const TitleCss = styled.span`
  display: inline-block;
  width: 330px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const DueCss = styled.span`
  display: inline-block;
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const MinCss = styled.span`
  display: inline-block;
  width: 65px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const MaxCss = styled.span`
  display: inline-block;
  width: 65px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const FractionCss = styled.span`
  display: inline-block;
  width: 55x;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const BorderCss = styled.span`
  display: inline-block;
  width: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

export class MeetingEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { is_folded: true };
  }
  render() {
    let meeting_entry = (
      <div style={{ cursor: 'pointer' }} onClick={() => { this.props.load_comments_click(this.props.meeting_info.id) }}>
        <TitleCss>{this.props.meeting_info.title}</TitleCss><BorderCss>|</BorderCss>
        <DueCss>{dateParse(this.props.meeting_info.due)}</DueCss><BorderCss>|</BorderCss>
        <MinCss>{this.props.meeting_info.min_people}명</MinCss><BorderCss>|</BorderCss>
        <MaxCss>{this.props.meeting_info.max_people}명</MaxCss><BorderCss>|</BorderCss>
        <FractionCss>{this.props.meeting_info.members.length}/{this.props.meeting_info.max_people}</FractionCss>
      </div>
    )
    return (
      <MeetingEntryCss>
        <Modal trigger={meeting_entry}>
          <Modal.Header>{this.props.meeting_info.title}</Modal.Header>
          <MeetingInfo meeting_info = {this.props.meeting_info}/>
        </Modal>
      </MeetingEntryCss >
    )
  }
}
