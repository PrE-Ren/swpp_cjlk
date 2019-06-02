import React from 'react'
import MeetingEntry from '../../atoms/MeetingEntry'
import LeadList from '../../../containers/LeadList'
import JoinList from '../../../containers/JoinList'
import HistoryList from '../../../containers/HistoryList'
import { Container, Header, List, Segment, Label } from 'semantic-ui-react'

export const MyInfo = ({ state }) => {
  console.log('<MyInfo Rendering>')
  return (
    <Container>
      <Segment raised>
        <Label as='a' color='purple' ribbon>My Information</Label>
        <Header as='h1'>내 정보</Header>
        <List>
          <List.Item>
            <List.Icon name='user' />
            <List.Content>아이디 : {state.username}</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='pencil alternate' />
            <List.Content>이름 : {state.name}</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='mail' />
            <List.Content>이메일 : {state.email}</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='call' />
            <List.Content>핸드폰 : {state.phone_number}</List.Content>
          </List.Item>
        </List>
      </Segment>
      <Container>
        <LeadList/>
        <JoinList/>
        <HistoryList/>
      </Container>
    </Container>
  )
}
