import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import MeetingEntry from '../../atoms/MeetingEntry'

const MyInfoCss = styled.div`
  position: relative;
  float: center;
  right: -200px;
  top: -250px;
`

export const MyInfo = ({ state }) => {
  let meetings = JSON.parse(state.meeting_list)
  console.log('<Rendering>')
  return (
    <MyInfoCss>
      {meetings.map(meeting_entry =>
        <div key = {meeting_entry.id} >
          <MeetingEntry {...meeting_entry} />
        </div>
      )}
    </MyInfoCss>
  )
}

MyInfo.propTypes = {
  reverse: PropTypes.bool,
}

export default MyInfo
