import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import MeetingInfo from '../../../containers/MeetingInfo'

const MeetingEntryCss = styled.span`
  display: block;
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
  width: 60px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const MaxCss = styled.span`
  display: inline-block;
  width: 60px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const FractionCss = styled.span`
  display: inline-block;
  width: 50px;
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
    const year = data.replace("-", "년 ")
    const month = year.replace("-", "월 ")
    const day = month.replace("T", "일 ")
    return day.split('+')[0]
}

class MeetingEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { is_folded: true };
  }
  render() {
    let meeting_entry = (
      <div style={{ cursor: 'pointer' }} onClick={() => { this.setState({ is_folded: !this.state.is_folded }) }}>
        <TitleCss>{this.props.meeting_info.title}</TitleCss><BorderCss>|</BorderCss>
        <DueCss>{dateParse(this.props.meeting_info.due)}</DueCss><BorderCss>|</BorderCss>
        <MinCss>{this.props.meeting_info.min_people}명</MinCss><BorderCss>|</BorderCss>
        <MaxCss>{this.props.meeting_info.max_people}명</MaxCss><BorderCss>|</BorderCss>
        <FractionCss>{this.props.meeting_info.members.length}/{this.props.meeting_info.max_people}</FractionCss>
      </div>
    )

    if (this.state.is_folded == true) {
      return (
        <MeetingEntryCss >
          {meeting_entry}
        </MeetingEntryCss>
      )
    }
    else {
      return (
        <MeetingEntryCss >
          {meeting_entry}
          <MeetingInfo meeting_info = {this.props.meeting_info}/>
        </MeetingEntryCss>
      )
    }
  }
}

export default MeetingEntry
