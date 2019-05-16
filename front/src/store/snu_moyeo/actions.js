export const RELOAD_ACTION = 'RELOAD_ACTION'
export const LOGIN_ACTION = 'LOGIN_ACTION'
export const LOGIN_SUCCESS_ACTION = 'LOGIN_SUCCESS_ACTION'
export const LOGOUT_ACTION = 'LOGOUT_ACTION'
export const SIGNUP_ACTION = 'SIGNUP_ACTION'
export const SIGNUP_SUCCESS_ACTION = 'SIGNUP_SUCCESS_ACTION'
export const NEW_ACTION = 'NEW_ACTION'
export const CHANGE_MEETING_STATE_ACTION = 'CHANGE_MEETING_STATE_ACTION'
export const JOIN_MEETING_ACTION = 'JOIN_MEETING_ACTION'
export const WITHDRAW_MEETING_ACTION = 'WITHDRAW_MEETING_ACTION'
export const PARTICIPATE_ADD_ACTION = 'PARTICIPATE_ADD_ACTION'

export const reload_action = (meetinglist_impending, meetinglist_recent) => {
  return {
    type : RELOAD_ACTION,
    meetinglist_impending : meetinglist_impending,
    meetinglist_recent : meetinglist_recent
  }
};

export const login_action = (username, password) => {
    return {
        type : LOGIN_ACTION,
        username,
        password
    }
};

export const login_success_action = (username, password, token, user_id, email, name) => {
    return {
        type : LOGIN_SUCCESS_ACTION,
        data : {
            username : username,
            password : password,
            mySNU_verification_token : token,
            user_id : user_id,
            email : email,
            name : name
        }
    }
};

export const logout_action = () => {
    return {
        type : LOGOUT_ACTION
    }
};

export const signup_action = (username, password, name, email) => {
    return {
        type : SIGNUP_ACTION,
        username,
        password,
        name,
        email
    }
};

export const signup_success_action = () => {
    return {
        type : SIGNUP_SUCCESS_ACTION
    }
};

export const new_action = (username, password, kind, leader, title, due, min_people, max_people, description, user_id, picture) => {
  return {
    type: NEW_ACTION,
    username,
    password,
    kind,
    leader,
    title,
    due,
    min_people,
    max_people,
    description,
    user_id,
    picture
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

export const join_meeting_action = (hash, user_id, meeting_id) => {
  return {
    type: JOIN_MEETING_ACTION,
    hash,
    user_id,
    meeting_id
  }
};

export const withdraw_meeting_action = (username, password, user_id, meeting_id) => {
  return {
    type: WITHDRAW_MEETING_ACTION,
    hash,
    user_id,
    meeting_id
  }
};

export const participate_update_action = (participate_info) => {
  return {
    type: PARTICIPATE_ADD_ACTION,
    participate_info
  }
};
