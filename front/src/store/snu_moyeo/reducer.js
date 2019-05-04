import { initialState } from "./selectors";

const snu_moyeo_reducer = (state = initialState, action) => {
    switch(action.type){
      case 'RELOAD_ACTION' : {
        localStorage.setItem("meeting_list", JSON.stringify(action.meeting_list))
        return {
          ...state,
          meeting_list : JSON.stringify(action.meeting_list)
        }
      }
      case 'LOGIN_SUCCESS': {
        localStorage.setItem("username", action.data.username);
        localStorage.setItem("token", action.data.mySNU_verification_token);
        return {
            ...state,
            username: action.data.username,
            mySNU_verification_token: action.data.mySNU_verification_token,
        }
      }
      case 'SIGNUP_SUCCESS': {
        return state
      }
      case 'LOGOUT_REQUEST': {
       localStorage.removeItem("username");
       localStorage.removeItem("token");
       return {
           ...state,
           username: null,
           mySNU_verification_token: null,
       }
      }
      default:
        return state
    }
}

export default snu_moyeo_reducer
