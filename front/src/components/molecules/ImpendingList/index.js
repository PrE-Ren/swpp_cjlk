import React from 'react'
import { PropTypes } from 'prop-types'
import MeetingEntry from '../../../containers/MeetingEntry'
import { Segment, Card, Header, Label } from 'semantic-ui-react'

export const ImpendingList = ({ meetinglist_impending }) => {
  console.log('<ImpendingList Rendering>')
  if (meetinglist_impending != null) {
    let meetings = JSON.parse(meetinglist_impending)
    return (
      <Segment raised>
        <Label as='a' color='red' ribbon>Hurry up!</Label>
        <Header as='h1'>마감 임박 모임</Header>
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
