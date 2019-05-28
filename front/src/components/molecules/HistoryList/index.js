import React from 'react'
import MeetingEntry from '../../../containers/MeetingEntry'
import { Segment, Card, Header, Label } from 'semantic-ui-react'

export const HistoryList = ({ meetinglist_history }) => {
  console.log('<History Rendering>')
  if (meetinglist_history != null) {
    let meetings = JSON.parse(meetinglist_history)
    return (
      <Segment raised>
        <Label as='a' color='pink' ribbon>Now</Label>
        <Header as='h1'>내가 참여했던 모임</Header>
        <Card.Group>
          {meetings.map(meeting_entry =>
            <Card key = {meeting_entry.id} >
              <MeetingEntry meeting_info = {meeting_entry}/>
            </Card>
          )}
        </Card.Group>
      </Segment>
    )
  }
  else
    return <div></div>
}
