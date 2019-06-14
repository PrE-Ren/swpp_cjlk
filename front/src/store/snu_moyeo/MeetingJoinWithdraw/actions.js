export const JOIN_MEETING_ACTION = 'JOIN_MEETING_ACTION'
export const WITHDRAW_MEETING_ACTION = 'WITHDRAW_MEETING_ACTION'

export const join_meeting_action = (hash, user_id, meeting_id) => {
  return {
    type: JOIN_MEETING_ACTION,
    hash,
    user_id,
    meeting_id
  }
};

export const withdraw_meeting_action = (hash, user_id, meeting_id) => {
  return {
    type: WITHDRAW_MEETING_ACTION,
    hash,
    user_id,
    meeting_id
  }
};
