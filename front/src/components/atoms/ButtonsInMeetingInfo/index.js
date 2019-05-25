import React from 'react'
import { PropTypes } from 'prop-types'
import { Button, Icon } from 'semantic-ui-react'
import * as meeting_state from '../../../literal'

export const ModifyButton = ({ meeting_info, f }) => {
  return (
      <Button secondary onClick={() => {
        if (meeting_info.members.length == 1)
          f(meeting_info)
        else
          alert('이미 멤버가 있는 상태입니다. 수정이 불가능합니다.')
      }}>수정</Button>
  );
};

export const CloseButton = ({ meeting_info, f, hash }) => {
  return (
      <Button secondary onClick={() => {
        if (meeting_info.members.length < meeting_info.min_people)
          alert('최소인원을 충족하지 못하였습니다. 마감이 불가능합니다.')
        else
          f(hash, meeting_info, meeting_state.CLOSED)
      }}>마감</Button>
  );
};

export const BreakUpButton = ({ meeting_info, f, hash }) => {
  return (
      <Button secondary onClick={() => { f(hash, meeting_info, meeting_state.BREAK_UP) }}>해산</Button>
  );
};

export const ReOpenButton = ({ meeting_info, f, hash }) => {
  return (
      <Button secondary onClick={() => { f(hash, meeting_info, meeting_state.RE_OPEN) }}>추가 모집 시작</Button>
  );
};

export const ReCloseButton = ({ meeting_info, f, hash }) => {
  return (
      <Button secondary onClick={() => { f(hash, meeting_info, meeting_state.RE_CLOSED) }}>추가 모집 중단</Button>
  );
};

export const JoinButton = ({ meeting_info, user_id, hash, f }) => {
  return (
      <Button secondary onClick={() => {
        if (meeting_info.members.length >= meeting_info.max_people)
          alert('정원이 모두 찼습니다. 참가가 불가능합니다.')
        else
          f(hash, user_id, meeting_info.id)
      }}>참가</Button>
  );
}

export const WithdrawButton = ({ meeting_info, user_id, hash, f }) => {
  return (
      <Button secondary onClick={() => { f(hash, user_id, meeting_info.id) }}>탈퇴</Button>
  );
};
