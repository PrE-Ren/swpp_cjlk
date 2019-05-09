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
        localStorage.setItem("password", action.data.password);
        localStorage.setItem("token", action.data.mySNU_verification_token);
        localStorage.setItem("user_id", action.data.user_id);
        localStorage.setItem("email", action.data.email);
        localStorage.setItem("name", action.data.name);
        return {
            ...state,
            username: action.data.username,
            paswword: action.data.password,
            mySNU_verification_token: action.data.mySNU_verification_token,
            user_id: action.data.user_id,
            email: action.data.email,
            name: action.data.name
        }
      }
      case 'SIGNUP_SUCCESS': {
        return state
      }
      case 'LOGOUT_REQUEST': {
       localStorage.removeItem("username");
       localStorage.removeItem("password");
       localStorage.removeItem("token");
       localStorage.removeItem("user_id");
       localStorage.removeItem("email");
       localStorage.removeItem("name");
       return {
           ...state,
           username: null,
           paswword: null,
           mySNU_verification_token: null,
           user_id: null,
           email: null,
           name: null
       }
      }
      default:
        return state
    }
}

export default snu_moyeo_reducer
