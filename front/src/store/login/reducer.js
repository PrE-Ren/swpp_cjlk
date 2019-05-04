import { initialState } from "./selectors";


const login_reducer = (state = initialState, action) =>{
    switch(action.type){
        case 'LOGIN_SUCCESS':
            localStorage.setItem("user",action.data.username);
            localStorage.setItem("token", action.data.mySNU_verification_token);
            return {
                ...state, 
                ...action.data,
            }
        case 'SIGNUP_SUCCESS':
            return state
        case 'LOGOUT_REQUEST':    
           localStorage.removeItem("user");
           localStorage.removeItem("token");
           return {
               ...state,
               mySNU_verification_token: null,
               username: null,
               password: null,
           }
        default:
            return state
    }
}

export default login_reducer