import React from 'react'
import MeetingEntry from '../../../containers/MeetingEntry'
import { Segment, Card, Header, Label } from 'semantic-ui-react'

export const RecentList = ({ meetinglist_recent }) => {
  console.log('<RecentList Rendering>')
  if (meetinglist_recent != null) {
    let meetings = JSON.parse(meetinglist_recent)
    return (
      <Segment raised>
        <Label as='a' color='blue' ribbon>New</Label>
        <Header as='h2'>따끈따끈 방금 올라온 모임</Header>
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
