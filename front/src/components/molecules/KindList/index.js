import React from 'react'
import { PropTypes } from 'prop-types'
import MeetingEntry from '../../../containers/MeetingEntry'
import { Segment, Card, Header, Label } from 'semantic-ui-react'

export const KindList = ({ meetinglist_list }) => {
  console.log('<KindList Rendering>')
  if (meetinglist_list != null) {
    console.log(meetinglist_list)
    let meetings = JSON.parse(meetinglist_list).results
    return (
      <Segment raised>
        <Label as='a' color='pink' ribbon>Now</Label>
        <Header as='h1'>모집 중인 모임</Header>
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
