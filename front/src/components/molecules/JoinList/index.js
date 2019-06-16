import React from 'react'
import MeetingEntry from '../../../containers/MeetingEntry'
import { Segment, Card, Header, Label } from 'semantic-ui-react'

// meetinglist_join : MyPage 페이지에서 보여줄 Join 리스트 정보
export const JoinList = ({ meetinglist_join }) => {
  console.log('<Join Rendering>')
  if (meetinglist_join != null) {
    let meetings = JSON.parse(meetinglist_join)  //  미팅 리스트
    return (
      <Segment raised>
        <Label as='a' color='red' ribbon>Now</Label>  {/* 라벨 */}
        <Header as='h1'>내가 참여중인 모임</Header>      {/* 제목 */}
        <Card.Group>                                      {/* 각각의 카드는 하나의 미팅 엔트리를 담고 있음 */}
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
