import { initialState } from "./selectors";

const snu_moyeo_reducer = (state = initialState, action) => {
    switch(action.type) {
      case 'RELOAD_ACTION' : {
        const meetinglist = JSON.stringify(action.meetinglist)
        switch(action.option) {
          case 'impending' :
            localStorage.setItem(action.option, meetinglist)
            return {
              ...state,
              meetinglist_impending : meetinglist
            }
          case 'recent' :
            localStorage.setItem(action.option, meetinglist)
            return {
              ...state,
              meetinglist_recent : meetinglist
            }
          case 'lead' :
            localStorage.setItem(action.option, meetinglist)
            return {
              ...state,
              meetinglist_lead : meetinglist
            }
          case 'join' :
            localStorage.setItem(action.option, meetinglist)
            return {
              ...state,
              meetinglist_join : meetinglist
            }
          case 'history' :
            localStorage.setItem(action.option, meetinglist)
            return {
              ...state,
              meetinglist_history : meetinglist
            }
          default :
          localStorage.setItem("list", meetinglist)
          localStorage.setItem("page_num", 1)
            return {
              ...state,
              meetinglist_list : meetinglist,
              page_num : 1
            }
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
       localStorage.removeItem("list");
       localStorage.removeItem("page_num");
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
         meetinglist_history : null,
         meetinglist_list : null,
         page_num : null
       }
      }
      case 'CHANGE_PAGE_NUM_SUCCESS_ACTION': {
        const meetinglist = JSON.stringify(action.meetinglist)
        localStorage.setItem("list", meetinglist)
        localStorage.setItem("page_num", action.page_num)
        return {
          ...state,
          meetinglist_list : meetinglist,
          page_num : action.page_num
        }
      }
      default:
        return state
    }
}

export default snu_moyeo_reducer
