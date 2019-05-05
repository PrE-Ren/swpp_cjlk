export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const RELOAD_ACTION = 'RELOAD_ACTION'
export const NEW_REQUEST = 'NEW_REQUEST'

export const postNewData = (kind, leader, title, due, min_people, max_people, description) => {
  return {
    type: NEW_REQUEST,
    kind,
    leader,
    title,
    due,
    min_people,
    max_people,
    description
  }
};

export const reload_action = (meeting_list) => {
  return {
    type : RELOAD_ACTION,
    meeting_list : meeting_list
  }
};

export const getLoginData = (username, password) => {
    return {
        type : LOGIN_REQUEST,
        username,
        password
    }
};

export const postSignupData = (username, password, name, email) => {
    return {
        type : SIGNUP_REQUEST,
        username,
        password,
        name,
        email
    }
};

export const loginSuccess = (username, password, data) => {
    return {
        type : LOGIN_SUCCESS,
        data : {
            username,
            password,
            mySNU_verification_token : data.mySNU_verification_token
        }
    }
};

export const logoutRequest = () => {
    return {
        type : LOGOUT_REQUEST
    }
};

export const signupSuccess = () => {
    return {
        type : SIGNUP_SUCCESS
    }
};
