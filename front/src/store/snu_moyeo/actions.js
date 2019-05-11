export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const RELOAD_ACTION = 'RELOAD_ACTION'
export const NEW_REQUEST = 'NEW_REQUEST'
export const CHANGE_STATE = 'CHANGE_STATE'
export const PARTICIPATE_REQUEST = 'PARTICIPATE_REQUEST'

export const reload_action = (meetinglist_impending, meetinglist_recent) => {
  return {
    type : RELOAD_ACTION,
    meetinglist_impending : meetinglist_impending,
    meetinglist_recent : meetinglist_recent
  }
};

export const getLoginData = (username, password) => {
    return {
        type : LOGIN_REQUEST,
        username,
        password
    }
};

export const loginSuccess = (username, password, token, user_id, email, name) => {
    return {
        type : LOGIN_SUCCESS,
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

export const logoutRequest = () => {
    return {
        type : LOGOUT_REQUEST
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

export const signupSuccess = () => {
    return {
        type : SIGNUP_SUCCESS
    }
};

export const postNewData = (username, password, kind, leader, title, due, min_people, max_people, description, user_id) => {
  return {
    type: NEW_REQUEST,
    username,
    password,
    kind,
    leader,
    title,
    due,
    min_people,
    max_people,
    description,
    user_id
  }
};

export const putChangeState = (username, password, id, title, due, min_people, max_people, description, state, kind) => {
  return {
    type: CHANGE_STATE,
    username,
    password,
    id,
    title,
    due,
    min_people,
    max_people,
    description,
    state,
    kind
  }
};

export const postParticipate = (username, password, user_id, meeting_id) => {
  return {
    type: PARTICIPATE_REQUEST,
    username,
    password,
    user_id,
    meeting_id
  }
};
