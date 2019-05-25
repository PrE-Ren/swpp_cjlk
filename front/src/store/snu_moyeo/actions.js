export const RELOAD_ACTION = 'RELOAD_ACTION'
export const LOGIN_ACTION = 'LOGIN_ACTION'
export const LOGIN_SUCCESS_ACTION = 'LOGIN_SUCCESS_ACTION'
export const LOGOUT_ACTION = 'LOGOUT_ACTION'
export const SIGNUP_ACTION = 'SIGNUP_ACTION'
export const SIGNUP_SUCCESS_ACTION = 'SIGNUP_SUCCESS_ACTION'
export const LOGIN_AUTH_ACTION = 'LOGIN_AUTH_ACTION'
export const SEND_EMAIL_ACTION = 'SEND_EMAIL_ACTION'
export const SEND_PHONE_ACTION = 'SEND_PHONE_ACTION'
export const CONFIRM_EMAIL_ACTION = 'CONFIRM_EMAIL_ACTION'
export const CONFIRM_PHONE_ACTION = 'CONFIRM_PHONE_ACTION'
export const NEW_ACTION = 'NEW_ACTION'
export const MODIFY_ACTION = 'MODIFY_ACTION'
export const CHANGE_MEETING_STATE_ACTION = 'CHANGE_MEETING_STATE_ACTION'
export const CHANGE_MEETING_INFO_ACTION = 'CHANGE_MEETING_INFO_ACTION'
export const JOIN_MEETING_ACTION = 'JOIN_MEETING_ACTION'
export const WITHDRAW_MEETING_ACTION = 'WITHDRAW_MEETING_ACTION'
export const PARTICIPATE_ADD_ACTION = 'PARTICIPATE_ADD_ACTION'
export const CHANGE_PAGE_NUM_ACTION = 'CHANGE_PAGE_NUM_ACTION'
export const CHANGE_PAGE_NUM_SUCCESS_ACTION = 'CHANGE_PAGE_NUM_SUCCESS_ACTION'

export const reload_action = (option, meetinglist) => {
  return {
    type : RELOAD_ACTION,
    option,
    meetinglist
  }
};

export const login_action = (username, password) => {
    return {
        type : LOGIN_ACTION,
        username,
        password
    }
};

export const login_success_action = (username, password, mySNU_verification_token, user_id, email, phone_number, name) => {
    return {
        type : LOGIN_SUCCESS_ACTION,
        data : {
            username : username,
            password : password,
            mySNU_verification_token : mySNU_verification_token,
            user_id : user_id,
            email : email,
            phone_number : phone_number,
            name : name
        }
    }
};

export const logout_action = () => {
    return {
        type : LOGOUT_ACTION
    }
};

export const signup_action = (username, password, name) => {
    return {
        type : SIGNUP_ACTION,
        username,
        password,
        name
    }
};

export const signup_success_action = () => {
    return {
        type : SIGNUP_SUCCESS_ACTION
    }
};

export const login_auth_action = (username, password) => {
  return {
      type : LOGIN_AUTH_ACTION,
      username : username,
      password : password
  }
};

export const send_email_action = (hash, email) => {
  return {
      type : SEND_EMAIL_ACTION,
      hash : hash,
      email: email
  }
};

export const send_phone_action = (hash, phone_number) => {
  return {
      type : SEND_PHONE_ACTION,
      hash : hash,
      phone_number: phone_number
  }
};

export const confirm_email_action = (hash, email, mySNU_verification_token) => {
  return {
      type : CONFIRM_EMAIL_ACTION,
      hash : hash,
      email : email,
      email_code : mySNU_verification_token
  }
};

export const confirm_phone_action = (hash, phone_number, phone_token) => {
  return {
      type : CONFIRM_PHONE_ACTION,
      hash : hash,
      phone_number : phone_number,
      phone_code : phone_token
  }
};

export const new_action = (hash, user_id, meeting_info) => {
  return {
    type: NEW_ACTION,
    hash,
    user_id,
    meeting_info
  }
};

export const modify_action = (hash, user_id, meeting_info) => {
  return {
    type: MODIFY_ACTION,
    hash,
    user_id,
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

export const participate_update_action = (participate_info) => {
  return {
    type: PARTICIPATE_ADD_ACTION,
    participate_info
  }
};

export const change_page_num_action = (page_num) => {
  return {
    type: CHANGE_PAGE_NUM_ACTION,
    page_num
  }
}

export const change_page_num_success_action = (page_num, meetinglist) => {
  return {
    type: CHANGE_PAGE_NUM_SUCCESS_ACTION,
    page_num,
    meetinglist
  }
}
