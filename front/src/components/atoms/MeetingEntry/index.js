import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import MeetingInfo from '../../molecules/MeetingInfo'

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
    this.state = {
      flag: 0,
      title: this.props.title,
      description: this.props.description,
      due: this.props.due,
      min_people: this.props.min_people,
      max_people: this.props.max_people,
      members: this.props.members
    };
  }
  render() {
    let meeting_entry = (
      <div style={{ cursor: 'pointer' }}>
        <TitleCss>{this.state.title}</TitleCss><BorderCss>|</BorderCss>
        <DueCss>{dateParse(this.state.due)}</DueCss><BorderCss>|</BorderCss>
        <MinCss>{this.state.min_people}명</MinCss><BorderCss>|</BorderCss>
        <MaxCss>{this.state.max_people}명</MaxCss><BorderCss>|</BorderCss>
        <FractionCss>{this.state.members.length}/{this.state.max_people}</FractionCss>
      </div>
    )

    if (this.state.flag == 0) {
      return (
        <MeetingEntryCss onClick={() => { this.setState({ flag: 1 }) }}>
          {meeting_entry}
        </MeetingEntryCss>
      )
    }
    else {
      return (
        <MeetingEntryCss onClick={() => { this.setState({ flag: 0 }) }}>
          {meeting_entry}
          <MeetingInfo description={this.state.description} />
        </MeetingEntryCss>
      )
    }
  }
}


/* id, title, created, due, min_people, max_people, state, description, kind, leader
const MeetingEntry = ({ id, title, due, min_people, max_people, members }) => {
  let flag = 0

} */

MeetingEntry.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  due: PropTypes.string.isRequired,
  min_people: PropTypes.number.isRequired,
  max_people: PropTypes.number.isRequired,
  state: PropTypes.number.isRequired,
  kind: PropTypes.number.isRequired,
  leader: PropTypes.string.isRequired,
  reverse: PropTypes.bool,
}

export default MeetingEntry
