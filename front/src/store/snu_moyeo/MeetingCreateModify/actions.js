export const NEW_ACTION = 'NEW_ACTION'
export const MODIFY_ACTION = 'MODIFY_ACTION'
export const CHANGE_MEETING_STATE_ACTION = 'CHANGE_MEETING_STATE_ACTION'
export const CHANGE_MEETING_INFO_ACTION = 'CHANGE_MEETING_INFO_ACTION'

export const new_action = (hash, user_id, meeting_info) => {
  return {
    type: NEW_ACTION,
    hash,
    user_id,
    meeting_info
  }
};

export const modify_action = (hash, meeting_info) => {
  return {
    type: MODIFY_ACTION,
    hash,
    meeting_info
  }
};

export const change_meeting_state_action = (hash, meeting_info, new_state) => {
  return {
    type: CHANGE_MEETING_STATE_ACTION,
    hash,
    meeting_info,
    new_state
  }
};

export const change_meeting_info_action = (meeting_info) => {
  return {
    type: CHANGE_MEETING_INFO_ACTION,
    meeting_info
  }
}
