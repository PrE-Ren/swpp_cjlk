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
export const REQUIRE_EMAIL_ACTION = 'REQUIRE_EMAIL_ACTION'
export const REQUIRE_PHONE_ACTION = 'REQUIRE_PHONE_ACTION'
export const PREPARE_SEND_EMAIL_ACTION = 'PREPARE_SEND_EMAIL_ACTION'
export const PREPARE_SEND_PHONE_ACTION = 'PREPARE_SEND_PHONE_ACTION'
export const MYPAGE_RELOAD_ACTION = 'MYPAGE_RELOAD_ACTION'

export const login_action = (username, password) => {
    return {
        type : LOGIN_ACTION,
        username,
        password
    }
};

export const login_success_action = (username, password, mySNU_verification_token, phone_verification_token, user_id, email, phone_number, name, point) => {
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
            name : name,
            point : point
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

export const prepare_send_email_action = () => {
    return {
        type : PREPARE_SEND_EMAIL_ACTION
    }
};
  
export const prepare_send_phone_action = () => {
    return {
        type : PREPARE_SEND_PHONE_ACTION
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

export const require_email_action = () => {
    return {
        type : REQUIRE_EMAIL_ACTION
    }
};

export const require_phone_action = () => {
    return {
        type : REQUIRE_PHONE_ACTION
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

export const mypage_reload_action = (point) => {
  return {
      type : MYPAGE_RELOAD_ACTION,
      point : point
  }
}
