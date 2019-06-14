import React from 'react'
import MeetingEntry from '../../../containers/MeetingEntry'
import { Segment, Card, Header, Label } from 'semantic-ui-react'

// meetinglist_recent : Home 페이지에서 보여줄 Recent 리스트 정보
export const RecentList = ({ meetinglist_recent }) => {
  console.log('<RecentList Rendering>')
  if (meetinglist_recent != null) {
    let meetings = JSON.parse(meetinglist_recent)  //  미팅 리스트
    return (
      <Segment raised>
        <Label as='a' color='blue' ribbon> New! </Label>    {/* 라벨 */}
        <Header as='h2'> 따끈따끈 방금 올라온 모임 </Header>  {/* 제목 */}
        <Card.Group>                                        {/* 각각의 카드는 하나의 미팅 엔트리를 담고 있음 */}
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
