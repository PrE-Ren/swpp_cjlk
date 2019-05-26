import React from 'react'
import { PropTypes } from 'prop-types'
import MeetingEntry from '../../../containers/MeetingEntry'
import { Segment, Card, Header, Label } from 'semantic-ui-react'

export const LeadList = ({ meetinglist_lead }) => {
  console.log('<Lead Rendering>')
  if (meetinglist_lead != null) {
    let meetings = JSON.parse(meetinglist_lead)
    return (
      <Segment raised>
        <Label as='a' color='yellow' ribbon>I am leader!</Label>
        <Header as='h1'>내가 만든 모임</Header>
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
