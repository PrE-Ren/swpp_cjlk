import React from 'react'
import MeetingEntry from '../../../containers/MeetingEntry'
import { Segment, Card, Header, Label } from 'semantic-ui-react'

// meetinglist_impending : Home 페이지에서 보여줄 Impending 리스트 정보
export const ImpendingList = ({ meetinglist_impending }) => {
  console.log('<ImpendingList Rendering>')
  if (meetinglist_impending != null) {
    let meetings = JSON.parse(meetinglist_impending)  //  미팅 리스트
    return (
      <Segment raised>
        <Label as='a' color='red' ribbon>Hurry up!</Label>  {/* 라벨 */}
        <Header as='h1'>마감 임박 모임</Header>              {/* 제목 */}
        <Card.Group>                                          {/* 각각의 카드는 하나의 미팅 엔트리를 담고 있음 */}
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
    return (<div></div>)
}
