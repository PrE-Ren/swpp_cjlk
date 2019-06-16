import React from 'react'
import MeetingEntry from '../../../containers/MeetingEntry'
import { Segment, Card, Header, Label } from 'semantic-ui-react'

// 모임 유형에 따라 다른 라벨 태그 생성
const get_label = (kind) => {
  if (kind == 0)      return <Label as='a' color='red' ribbon> 음식배달 </Label>
  else if (kind == 1) return <Label as='a' color='red' ribbon> 택시합승 </Label>
  else if (kind == 2) return <Label as='a' color='red' ribbon> 공동구매 </Label>
  else if (kind == 3) return <Label as='a' color='red' ribbon> 스터디 </Label>
  else if (kind == 4) return <Label as='a' color='red' ribbon> 운동 </Label>
  else if (kind == 5) return <Label as='a' color='red' ribbon> 미팅 </Label>
  else                return <Label as='a' color='red' ribbon> 기타 </Label>
}

// meetinglist_list : List 페이지에서 보여줄 미팅 리스트 정보
export const KindList = ({ meetinglist_list }) => {
  console.log('<KindList Rendering>')
  if (meetinglist_list != null) {
    let meetings = JSON.parse(meetinglist_list).results  //  미팅 리스트
    const kind = window.location.pathname[6]

    return (
      <Segment raised>
        {get_label(kind)}                         {/* 라벨 */}
        <Header as='h1'>모집 중인 모임</Header>  {/* 제목 */}
        <Card.Group>                              {/* 각각의 카드는 하나의 미팅 엔트리를 담고 있음 */}
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
