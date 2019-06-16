import React from 'react'
import { Menu, Icon, List } from 'semantic-ui-react'

// meetinglist_join : 내가 참여중인 모임
export const Join_chatroom = ({ meetinglist_join }) => {
  if (meetinglist_join != null) {
    let meetings = JSON.parse(meetinglist_join)
    return (
      <div>
        <Menu.Item><Icon name='chat' size='big' /> 채팅방 빠른 입장 </Menu.Item>
        {meetings.map(meeting_entry =>
          meeting_entry.kakao_link == ""
          ? <div key={meeting_entry.id}></div>
          : <List.Item key={meeting_entry.id} as='a' target="_blank" href={meeting_entry.kakao_link}>{meeting_entry.title}</List.Item>
        )}
        
      </div>
    )
  }
  else
    return <div></div>
}
