import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import MeetingEntry from '../../atoms/MeetingEntry'
import LeadList from '../../../containers/LeadList'
import JoinList from '../../../containers/JoinList'
import HistoryList from '../../../containers/HistoryList'
import { Container } from 'semantic-ui-react'

const Font_Info = styled.div`
  font-size: 20px;
  display: inline-block;
`

export const MyInfo = ({ state }) => {
  console.log('<MyInfo Rendering>')
  return (
    <Container>
      <Container>
        <Font_Info>1. 이름 : {state.name}</Font_Info><br />
        <Font_Info>2. SNU 메일 : {state.email}</Font_Info><br /><br />
      </Container>
      <Container>
        <LeadList />
        <JoinList />
        <HistoryList />
      </Container>
    </Container>
  )
}

MyInfo.propTypes = {
  reverse: PropTypes.bool,
}
