export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'

export const getLoginData = (userid,password) => {
    return {
        type : LOGIN_REQUEST,
        userid,
        password
    }
};

export const postSignupData = (userid,password,name,email) => {
    return {
        type : SIGNUP_REQUEST,
        userid,
        password,
        name,
        email
    }
};

export const loginSuccess = (username,password,content) => {
    return {
        type : LOGIN_SUCCESS,
        data : { 
            username,
            password,
            mySNU_verification_token : content.mySNU_verification_token
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
