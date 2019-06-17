import React from 'react'
import { Button, Icon, Popup } from 'semantic-ui-react'
import * as meeting_state from '../../../literal'

// <수정>
// meeting_info : id, title, created, due, min_people, max_people, description, state, kind,
//                leader, leaderid, picture, members, comments, latitude, longitude
// f (= change_meeting_info_click) : 수정 버튼을 눌렀을 때 액션을 디스패치할 함수
export const ModifyButton = ({ meeting_info, f }) => {
  return (
      <Button secondary onClick={() => {
        if (meeting_info.members.length == 1) f(meeting_info)  //  미팅 정보를 세션 스토리지에 저장한 후 모임 생성 페이지로 리다이렉트
        else                                  alert('이미 멤버가 있는 상태입니다. 수정이 불가능합니다.')
      }}>수정</Button>
  );
};

// <마감>
// meeting_info : id, title, created, due, min_people, max_people, description, state, kind,
//                leader, leaderid, picture, members, comments, latitude, longitude
// f (= change_meeting_state_click) : 마감 버튼을 눌렀을 때 액션을 디스패치할 함수
// hash : 내가 만든 모임인지 확인할 때 필요
export const CloseButton = ({ meeting_info, f, hash }) => {
  return (
      <Button secondary onClick={() => {
        if (meeting_info.members.length < meeting_info.min_people)  alert('최소인원을 충족하지 못하였습니다. 마감이 불가능합니다.')
        else                                                        f(hash, meeting_info, meeting_state.CLOSED)  //  미팅 상태 변경
      }}>마감</Button>
  );
};

// <해산>
// meeting_info : id, title, created, due, min_people, max_people, description, state, kind,
//                leader, leaderid, picture, members, comments, latitude, longitude
// f (= change_meeting_state_click) : 마감 버튼을 눌렀을 때 액션을 디스패치할 함수
// hash : 내가 만든 모임인지 확인할 때 필요
export const BreakUpButton = ({ meeting_info, f, hash }) => {
  return (
      <Popup position='bottom' content='정말 해산하시겠습니까?'
        trigger={<Button secondary onClick={() => { f(hash, meeting_info, meeting_state.BREAK_UP) }}>해산</Button>} />
        //  미팅 상태 변경
  );
};

// <추가모집 시작>
// meeting_info : id, title, created, due, min_people, max_people, description, state, kind,
//                leader, leaderid, picture, members, comments, latitude, longitude
// f (= change_meeting_state_click) : 추가모집 시작 버튼을 눌렀을 때 액션을 디스패치할 함수
// hash : 내가 만든 모임인지 확인할 때 필요
export const ReOpenButton = ({ meeting_info, f, hash }) => {
  return (
      <Button secondary onClick={() => { f(hash, meeting_info, meeting_state.RE_OPEN) }}>추가 모집 시작</Button>  //  미팅 상태 변경
  );
};

// <추가모집 중단>
// meeting_info : id, title, created, due, min_people, max_people, description, state, kind,
//                leader, leaderid, picture, members, comments, latitude, longitude
// f (= change_meeting_state_click) : 추가모집 중단 버튼을 눌렀을 때 액션을 디스패치할 함수
// hash : 내가 만든 모임인지 확인할 때 필요
export const ReCloseButton = ({ meeting_info, f, hash }) => {
  return (
      <Button secondary onClick={() => { f(hash, meeting_info, meeting_state.RE_CLOSED) }}>추가 모집 중단</Button>  //  미팅 상태 변경
  );
};

// <참가>
// meeting_info : id, title, created, due, min_people, max_people, description, state, kind,
//                leader, leaderid, picture, members, comments, latitude, longitude
// user_id : 누가 참가하는 건지 알기 위해 필요
// hash : 불필요
// f (= join_meeting_click) : 참가 버튼을 눌렀을 때 액션을 디스패치할 함수

export const JoinButton = ({ meeting_info, user_id, hash, f }) => {
  return (
      <Button secondary onClick={() => {
        if (meeting_info.members.length >= meeting_info.max_people) alert('정원이 모두 찼습니다. 참가가 불가능합니다.')
        else                                                        f(hash, user_id, meeting_info.id)
      }}>참가</Button>
  );
}

// <탈퇴>
// meeting_info : id, title, created, due, min_people, max_people, description, state, kind,
//                leader, leaderid, picture, members, comments, latitude, longitude
// user_id : 누가 탈퇴하는 건지 알기 위해 필요
// hash : 불필요
// f (= withdraw_meeting_click) : 탈퇴 버튼을 눌렀을 때 액션을 디스패치할 함수
export const WithdrawButton = ({ meeting_info, user_id, hash, f }) => {
  return (
      <Popup position='bottom right' content='마감된 모임을 탈퇴시 벌점 3점 부과'
             trigger={<Button secondary onClick={() => { f(hash, user_id, meeting_info.id) }}>탈퇴</Button>} />
  );
};
