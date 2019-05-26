import React from 'react'
import { PropTypes } from 'prop-types'
import MeetingEntry from '../../atoms/MeetingEntry'
import LeadList from '../../../containers/LeadList'
import JoinList from '../../../containers/JoinList'
import HistoryList from '../../../containers/HistoryList'
import { Container, Header } from 'semantic-ui-react'

export const MyInfo = ({ state }) => {
  console.log('<MyInfo Rendering>')
  return (
    <Container>
      <Container>
        <Header as='h3'>
          1. 아이디 : {state.username}<br/>
          2. 이름 : {state.name}<br/>
          3. 이메일 : {state.email}<br/>
          {/*4. 핸드폰 : {state.phone_number}*/}<br/>
        </Header>
      </Container>
      <Container>
        <LeadList />
        <JoinList />
        <HistoryList />
      </Container>
    </Container>
  )
}
