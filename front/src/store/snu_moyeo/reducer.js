import { initialState } from "./selectors";

const snu_moyeo_reducer = (state = initialState, action) => {
    switch(action.type) {
      case 'RELOAD_ACTION' : {
        localStorage.setItem(action.option, JSON.stringify(action.meetinglist))
        switch(action.option) {
          case 'impending' :
            return {
              ...state,
              meetinglist_impending : JSON.stringify(action.meetinglist)
            }
          case 'recent' :
            return {
              ...state,
              meetinglist_recent : JSON.stringify(action.meetinglist)
            }
          case 'lead' :
            return {
              ...state,
              meetinglist_lead : JSON.stringify(action.meetinglist)
            }
          case 'join' :
            return {
              ...state,
              meetinglist_join : JSON.stringify(action.meetinglist)
            }
          case 'history' :
            return {
              ...state,
              meetinglist_history : JSON.stringify(action.meetinglist)
            }
          default :
            return state
        }
      }
      case 'LOGIN_SUCCESS_ACTION': {
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
      case 'SIGNUP_SUCCESS_ACTION': {
        return state
      }
      case 'LOGOUT_ACTION': {
       localStorage.removeItem("username");
       localStorage.removeItem("password");
       localStorage.removeItem("token");
       localStorage.removeItem("user_id");
       localStorage.removeItem("email");
       localStorage.removeItem("name");
       localStorage.removeItem("impending");
       localStorage.removeItem("recent");
       localStorage.removeItem("lead");
       localStorage.removeItem("join");
       localStorage.removeItem("history");
       return {
           ...state,
           username: null,
           paswword: null,
           mySNU_verification_token: null,
           user_id: null,
           email: null,
           name: null,
           meetinglist_impending : null,
           meetinglist_recent : null,
           meetinglist_lead : null,
           meetinglist_join : null,
           meetinglist_history : null
       }
      }
      /* case 'PARTICIPATE_ADD_ACTION': {
        let participates = JSON.parse(state.participatelist)
        let new_participates = participates.concat(action.participate_info)
        localStorage.setItem("participatelist", JSON.stringify(new_participates));
        return {
            ...state,
            participatelist : JSON.stringify(new_participates)
        }
      } */
      default:
        return state
    }
}

export default snu_moyeo_reducer
