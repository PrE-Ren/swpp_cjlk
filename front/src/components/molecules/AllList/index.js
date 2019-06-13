import React from 'react'
import MeetingEntry from '../../../containers/MeetingEntry'
import { Segment, Card, Header, Label } from 'semantic-ui-react'

export const AllList = ({ meetinglist_all }) => {
  console.log('<AllList Rendering>')
  if (meetinglist_all != null) {
    console.log(meetinglist_all)
    let meetings = JSON.parse(meetinglist_all).results
    return (
      <Segment raised>
        <Label as='a' color='pink' ribbon>All</Label>
        <Header as='h1'>전체 검색 결과</Header>
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
