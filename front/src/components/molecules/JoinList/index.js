import React from 'react'
import MeetingEntry from '../../../containers/MeetingEntry'
import { Segment, Card, Header, Label } from 'semantic-ui-react'

export const JoinList = ({ meetinglist_join }) => {
  console.log('<Join Rendering>')
  if (meetinglist_join != null) {
    let meetings = JSON.parse(meetinglist_join)
    return (
      <Segment raised>
        <Label as='a' color='green' ribbon>Now</Label>
        <Header as='h1'>내가 참여중인 모임</Header>
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
