import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const MeetingInfo = ({ title, created, due, min_people, max_people, state, description, kind, leader, members }) => {
  return (
    <div> {description} </div>
  )
}

MeetingInfo.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}

export default MeetingInfo
