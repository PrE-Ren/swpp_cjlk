import { initialState } from "./selectors";

const snu_moyeo_reducer = (state = initialState, action) => {
    switch(action.type) {
      case 'RELOAD_ACTION' : {
        const meetinglist = JSON.stringify(action.meetinglist)
        switch(action.option) {
          case 'impending' :
            sessionStorage.setItem(action.option, meetinglist)
            return {
              ...state,
              meetinglist_impending : meetinglist
            }
          case 'recent' :
            sessionStorage.setItem(action.option, meetinglist)
            return {
              ...state,
              meetinglist_recent : meetinglist
            }
          case 'lead' :
            sessionStorage.setItem(action.option, meetinglist)
            return {
              ...state,
              meetinglist_lead : meetinglist
            }
          case 'join' :
            sessionStorage.setItem(action.option, meetinglist)
            return {
              ...state,
              meetinglist_join : meetinglist
            }
          case 'history' :
            sessionStorage.setItem(action.option, meetinglist)
            return {
              ...state,
              meetinglist_history : meetinglist
            }
          default :
          sessionStorage.setItem("list", meetinglist)
          sessionStorage.setItem("page_num", 1)
            return {
              ...state,
              meetinglist_list : meetinglist,
              page_num : 1
            }
        }
      }
      case 'LOGIN_SUCCESS_ACTION': {
        sessionStorage.setItem("username", action.data.username);
        sessionStorage.setItem("password", action.data.password);
        if (action.data.mySNU_verification_token != null) {
          sessionStorage.setItem("mySNU_verification_token", action.data.mySNU_verification_token);
          sessionStorage.setItem("email", action.data.email);
        }
        if (action.data.phone_verification_token != null) {
          sessionStorage.setItem("phone_verification_token", action.data.phone_verification_token);
          sessionStorage.setItem("phone_number", action.data.phone_number);
        } 
        sessionStorage.setItem("user_id", action.data.user_id);
        sessionStorage.setItem("name", action.data.name);
        return {
          ...state,
          username: action.data.username,
          password: action.data.password,
          mySNU_verification_token: action.data.mySNU_verification_token,
          phone_verification_token: action.data.phone_verification_token,
          user_id: action.data.user_id,
          email: action.data.email,
          phone_number: action.data.phone_number,
          name: action.data.name
        }
      }

      // 사실 username과 password만 설정해줘도 괜찮음 (근데 일단 수정이 귀찮아서 방치)
      case 'LOGIN_AUTH_ACTION': {
        sessionStorage.setItem("username", action.username);
        sessionStorage.setItem("password", action.password);
        sessionStorage.setItem("user_id", action.user_id);
        sessionStorage.setItem("name", action.name);
        return {
          ...state,
          username: action.username,
          password: action.password,
          user_id: action.user_id,
          name: action.name
        }
      }
      
      case 'SUCCESS_EMAIL_ACTION' : {
        sessionStorage.setItem("email", action.email);
        sessionStorage.setItem("mySNU_verification_token", action.email_code);
        return {
          ...state,
          email: action.email,
          mySNU_verification_token: action.email_code
        }
      }

      case 'SUCCESS_PHONE_ACTION' : {
        sessionStorage.setItem("phone_number", action.phone_number);
        sessionStorage.setItem("phone_verification_token", action.phone_code);
        return {
          ...state,
          phone_number: action.phone_number,
          phone_verification_token: action.phone_code
        }
      }

      case 'SIGNUP_SUCCESS_ACTION': {
        return state
      }

      case 'LOGOUT_ACTION': {
       sessionStorage.removeItem("username");
       sessionStorage.removeItem("password");
       sessionStorage.removeItem("mySNU_verification_token");
       sessionStorage.removeItem("phone_verification_token");
       sessionStorage.removeItem("user_id");
       sessionStorage.removeItem("email");
       sessionStorage.removeItem("name");
       sessionStorage.removeItem("impending");
       sessionStorage.removeItem("recent");
       sessionStorage.removeItem("lead");
       sessionStorage.removeItem("join");
       sessionStorage.removeItem("history");
       sessionStorage.removeItem("list");
       sessionStorage.removeItem("page_num");
       return {
         ...state,
         username: null,
         password: null,
         mySNU_verification_token: null,
         phone_verification_token: null,
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
        sessionStorage.setItem("list", meetinglist)
        sessionStorage.setItem("page_num", action.page_num)
        return {
          ...state,
          meetinglist_list : meetinglist,
          page_num : action.page_num
        }
      }

      case 'LOAD_COMMENTS_SUCCESS_ACTION': {
        const comments = JSON.stringify(action.comments)
        return {
          ...state,
          comments: comments
        }
      }

      default:
        return state
    }
}

export default snu_moyeo_reducer
