export const RELOAD_ACTION = 'RELOAD_ACTION'
export const CHANGE_PAGE_NUM_ACTION = 'CHANGE_PAGE_NUM_ACTION'
export const CHANGE_PAGE_NUM_SUCCESS_ACTION = 'CHANGE_PAGE_NUM_SUCCESS_ACTION'
export const LOGIN_ACTION = 'LOGIN_ACTION'
export const LOGIN_SUCCESS_ACTION = 'LOGIN_SUCCESS_ACTION'
export const LOGOUT_ACTION = 'LOGOUT_ACTION'
export const SIGNUP_ACTION = 'SIGNUP_ACTION'
export const LOGIN_AUTH_ACTION = 'LOGIN_AUTH_ACTION'
export const SEND_EMAIL_ACTION = 'SEND_EMAIL_ACTION'
export const SEND_PHONE_ACTION = 'SEND_PHONE_ACTION'
export const CONFIRM_EMAIL_ACTION = 'CONFIRM_EMAIL_ACTION'
export const CONFIRM_PHONE_ACTION = 'CONFIRM_PHONE_ACTION'
export const SUCCESS_EMAIL_ACTION = 'SUCCESS_EMAIL_ACTION'
export const SUCCESS_PHONE_ACTION = 'SUCCESS_PHONE_ACTION'

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const NEW_ACTION = 'NEW_ACTION'
export const MODIFY_ACTION = 'MODIFY_ACTION'
export const CHANGE_MEETING_STATE_ACTION = 'CHANGE_MEETING_STATE_ACTION'
export const CHANGE_MEETING_INFO_ACTION = 'CHANGE_MEETING_INFO_ACTION'
export const JOIN_MEETING_ACTION = 'JOIN_MEETING_ACTION'
export const WITHDRAW_MEETING_ACTION = 'WITHDRAW_MEETING_ACTION'
export const LOAD_LEADERINFO_ACTION = 'LOAD_LEADERINFO_ACTION'
export const LOAD_LEADERINFO_SUCCESS_ACTION = 'LOAD_LEADERINFO_SUCCESS_ACTION'
export const LOAD_MEMBERINFO_ACTION = 'LOAD_MEMBERINFO_ACTION'
export const LOAD_MEMBERINFO_SUCCESS_ACTION = 'LOAD_MEMBERINFO_SUCCESS_ACTION'
export const LOAD_COMMENTS_ACTION = 'LOAD_COMMENTS_ACTION'
export const LOAD_COMMENTS_SUCCESS_ACTION = 'LOAD_COMMENTS_SUCCESS_ACTION'
export const ADD_COMMENT_ACTION = 'ADD_COMMENT_ACTION'
export const EDIT_COMMENT_ACTION = 'EDIT_COMMENT_ACTION'
export const DELETE_COMMENT_ACTION = 'DELETE_COMMENT_ACTION'
export const PENALTY_ACTION = 'PENALTY_ACTION'
export const GET_REPORT_INFO_SUCCESS_ACTION = 'GET_REPORT_INFO_SUCCESS_ACTION'

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const reload_action = (option, meetinglist) => {
  return {
    type : RELOAD_ACTION,
    option,
    meetinglist
  }
};

export const change_page_num_action = (option, page_num) => {
  return {
    type: CHANGE_PAGE_NUM_ACTION,
    option,
    page_num
  }
}

export const change_page_num_success_action = (option, page_num, meetinglist) => {
  return {
    type: CHANGE_PAGE_NUM_SUCCESS_ACTION,
    option,
    page_num,
    meetinglist
  }
}

export const login_action = (username, password) => {
    return {
        type : LOGIN_ACTION,
        username,
        password
    }
};

export const login_success_action = (username, password, mySNU_verification_token, phone_verification_token, user_id, email, phone_number, name) => {
    return {
        type : LOGIN_SUCCESS_ACTION,
        data : {
            username : username,
            password : password,
            mySNU_verification_token : mySNU_verification_token,
            phone_verification_token : phone_verification_token,
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

export const confirm_phone_action = (hash, phone_number, phone_verification_token) => {
  return {
      type : CONFIRM_PHONE_ACTION,
      hash : hash,
      phone_number : phone_number,
      phone_code : phone_verification_token
  }
};

export const success_email_action = (email, mySNU_verification_token) => {
  return {
      type : SUCCESS_EMAIL_ACTION,
      email : email,
      email_code : mySNU_verification_token
  }
};

export const success_phone_action = (phone_number, phone_verification_token) => {
  return {
      type : SUCCESS_PHONE_ACTION,
      phone_number : phone_number,
      phone_code : phone_verification_token
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

export const load_leaderinfo_action = (user_id) => {
  return {
    type : LOAD_LEADERINFO_ACTION,
    user_id
  }
}

export const load_memberinfo_action = (members) => {
  return {
    type : LOAD_MEMBERINFO_ACTION,
    members
  }
}
export const load_comments_action = (meeting_id) => {
  return {
    type : LOAD_COMMENTS_ACTION,
    meeting_id
  }
}

export const load_comments_success_action = (comments) => {
  return {
    type : LOAD_COMMENTS_SUCCESS_ACTION,
    comments
  }
}

export const load_leaderinfo_success_action = (leader_name, leader_email, leader_phone_number) => {
  return {
    type : LOAD_LEADERINFO_SUCCESS_ACTION,
    leader_name,
    leader_email,
    leader_phone_number
  }
}

export const load_memberinfo_success_action = (member_list) => {
  return {
    type : LOAD_MEMBERINFO_SUCCESS_ACTION,
    member_list
  }
}


export const add_comment_action = (hash, content, meeting_id) => {
  return {
    type : ADD_COMMENT_ACTION,
    hash,
    content,
    meeting_id
  }
}

export const edit_comment_action = (hash, comment_id, meeting_id, writer_id, content) => {
  return {
    type : EDIT_COMMENT_ACTION,
    hash,
    comment_id,
    meeting_id,
    writer_id,
    content
  }
}

export const delete_comment_action = (hash, comment_id, meeting_id) => {
  return {
    type : DELETE_COMMENT_ACTION,
    hash,
    comment_id,
    meeting_id
  }
}

export const get_report_info_success_action = (report_info_list) => {
  return {
    type : GET_REPORT_INFO_SUCCESS_ACTION,
    report_info_list
  }
}

export const penalty_action = (hash, flag, report_info, points) => {
  return {
    type : PENALTY_ACTION,
    hash,
    flag,
    report_info,
    points
  }
}
