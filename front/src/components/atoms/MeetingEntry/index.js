import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const MeetingEntryCss = styled.span`
  display: block;
  width: 700px;
  padding: 0.5rem 0.5rem;
  margin: 1rem 2rem;
  border: 2px solid cadetblue;
  font-size: 20px;
  border-radius: 7px;
  &:hover {
    background: azure;
  }
`

const delete_style = {
  float : 'right'
}

const MeetingEntry = ({ id, title, created, due, min_people, max_people, state, description, kind, leader }) => {
  return(
    <MeetingEntryCss>
      <br/>
      &ensp;1. 제목 : {title}<br/>
      &ensp;2. 주최자 : {leader}<br/>
      &ensp;3. 최소 인원 : {min_people}<br/>
      &ensp;4. 최대 인원 : {max_people}<br/>
      &ensp;5. 모임 내용 : {description}<br/>
      &ensp;6. 마감 기한 : {due}<br/>
      <br/>
    </MeetingEntryCss>
  )
}

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
