import { initialState } from "./selectors";

const snu_moyeo_reducer = (state = initialState, action) => {
    switch(action.type) {

      case 'RELOAD_ACTION' : {
        const meetinglist = JSON.stringify(action.meetinglist)  //  불러온 미팅 리스트를 스토어에 저장 가능한 형태로 변환
        switch(action.option) {

          // Impending 리스트
          case 'impending' :
            sessionStorage.setItem('impending', meetinglist)
            return {
              ...state,
              meetinglist_impending : meetinglist
            }

          // Recent 리스트
          case 'recent' :
            sessionStorage.setItem('recent', meetinglist)
            return {
              ...state,
              meetinglist_recent : meetinglist
            }

          // Lead 리스트
          case 'lead' :
            sessionStorage.setItem('lead', meetinglist)
            return {
              ...state,
              meetinglist_lead : meetinglist
            }

          // Join 리스트
          case 'join' :
            sessionStorage.setItem('join', meetinglist)
            return {
              ...state,
              meetinglist_join : meetinglist
            }

          // History 리스트
          case 'history' :
            sessionStorage.setItem('history', meetinglist)
            return {
              ...state,
              meetinglist_history : meetinglist
            }

          default : {
            // List 페이지에서 불러온 미팅 리스트
            if (action.option.includes('/list')) {
              sessionStorage.setItem("kind", meetinglist)
              sessionStorage.setItem("page_num", 1)
                return {
                  ...state,
                  meetinglist_list : meetinglist,
                  page_num : 1
                }
            }

            // All 페이지에서 불러온 미팅 리스트
            else if (action.option.includes('/all')) {
              sessionStorage.setItem("all", meetinglist)
              sessionStorage.setItem("page_num", 1)
                return {
                  ...state,
                  meetinglist_all : meetinglist,
                  page_num : 1
                }
            }
          }
        }
      }

      case 'CHANGE_PAGE_NUM_SUCCESS_ACTION': {
        const meetinglist = JSON.stringify(action.meetinglist)  //  불러온 미팅 리스트를 스토어에 저장 가능한 형태로 변환
        switch (action.option) {

          // List 페이지에서 페이지를 넘기는 경우
          case "kind" : {
            sessionStorage.setItem("kind", meetinglist)
            sessionStorage.setItem("page_num", action.page_num)
            return {
              ...state,
              meetinglist_list : meetinglist,
              page_num : action.page_num
            }
          }

          // All 페이지에서 페이지를 넘기는 경우
          case "all" : {
            sessionStorage.setItem("all", meetinglist)
            sessionStorage.setItem("page_num", action.page_num)
            return {
              ...state,
              meetinglist_all : meetinglist,
              page_num : action.page_num
            }
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

      case 'LOGOUT_ACTION': {  //  세션 스토리지 및 리덕스 스토어 초기화
       sessionStorage.clear();
       return {
         ...state,
         user_id: null,
         username: null,
         password: null,
         name: null,
         email: null,
         phone_number: null,
         point: null,
         mySNU_verification_token: null,
         phone_verification_token: null,
         meetinglist_impending : null,
         meetinglist_recent : null,
         meetinglist_lead : null,
         meetinglist_join : null,
         meetinglist_history : null,
         meetinglist_list : null,
         meetinglist_all : null,
         page_num : null,
         comments : null,
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
