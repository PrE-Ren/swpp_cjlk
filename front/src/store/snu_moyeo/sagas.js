import {take, put, call, fork} from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'

/* It will be unnecessary later */
export function* initialize() {
  console.log("<Initialize : state will be initialized by back-end data>")
  const response = yield call(fetch, 'http://127.0.0.1:8000/meetinglist/', { method : 'GET' })
  if (response.ok) {
    const meeting_list = yield call([response, response.json])
    console.log('<Fetch data from back-end (Initialization)>')
    console.log('<Fetched meeting_list>')
    console.log(meeting_list)
    console.log('<Dispatch reload_action>')
    yield put(actions.reload_action(meeting_list))
  }
  else {
    alert('Fail to fetch data from back-end')
  }
}

/* Fetch data from back-end when detecting page reload */
export function* watchReload() {
  if (window.performance && performance.navigation.type == 1) {
    console.log("<Detect page reload : state will be updated by back-end data>")
    yield call(reload_function)
  }
}

export function* reload_function() {
  const response = yield call(fetch, 'http://127.0.0.1:8000/meetinglist/', { method : 'GET' })
  if (response.ok) {
    const meeting_list = yield call([response, response.json])
    console.log('<Fetch data from back-end (Reload)>')
    console.log('<Fetched meeting_list>')
    console.log(meeting_list)
    console.log('<Dispatch reload_action>')
    yield put(actions.reload_action(meeting_list))
  }
  else {
    alert('Fail to fetch data from back-end')
  }
}

export function* watchLogin(){
    while(true) {
        const action = yield take(actions.LOGIN_REQUEST)
        yield call(sendLoginReq, action)
    }
}

export function* watchNew(){
    while(true) {
        const action = yield take(actions.NEW_REQUEST)
        yield call(sendNewReq, action)
    }
}

export function* watchSignup(){
    while(true) {
        const action = yield take(actions.SIGNUP_REQUEST)
        yield call(sendSignupReq, action)
    }
}

export function* sendNewReq(action){
  const url_meetinglist = 'http://127.0.0.1:8000/meetinglist/'
  const url_participate = 'http://127.0.0.1:8000/participate/'
  const hash = new Buffer(`${action.username}:${action.password}`).toString('base64')
  const formData = new FormData();
  formData.append('title',action.title);
  formData.append('kind',action.kind);
  formData.append('due',action.due);
  formData.append('min_people',action.min_people);
  formData.append('max_people',action.max_people);
  formData.append('description',action.description);
  formData.append('state',0);
  if(action.picture !== undefined){
    formData.append('picture',action.picture);
  }

  const info_meeting = JSON.stringify(
    {
      title: action.title,
      kind: action.kind,
      due: action.due,
      min_people: action.min_people,
      max_people: action.max_people,
      description: action.description,
      state: 0,
      picture: action.picture,
    }
  );

  const response_meeting = yield call(fetch, url_meetinglist, {
      method: 'POST',
      headers: {
          'Authorization': `Basic ${hash}`,
      },
      body: formData,
  })

  if (response_meeting.ok) {
    console.log('Meeting POST ok')
    const meeting_id = (yield call([response_meeting, response_meeting.json])).id
    const info_participate = JSON.stringify({ user_id: action.user_id, meeting_id: meeting_id });
    const response_participate = yield call(fetch, url_participate, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${hash}`,
            'Content-Type': 'application/json',
        },
        body: info_participate,
    })

    if (response_participate.ok) {
      console.log('Participate POST ok')
      Object.defineProperty(window.location, 'href', {
        writable: true,
        value: '/'
      });
    }
    else
      console.log('Participate POST bad')
  }
  else {
    console.log('Meeting POST bad')
    console.log('올바르지 않은 형식입니다.')
  }
}

export function* sendLoginReq(action) {
    const username = action.username
    const password = action.password
    const url_token = 'http://127.0.0.1:8000/get_auth_token/'
    const url_user = 'http://127.0.0.1:8000/sign_up/'
    const info = JSON.stringify({ username: username, password: password });
    const response_token = yield call(fetch, url_token, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: info,
    })
    if (response_token.ok) {
        const response_user = yield call(fetch, url_user, {
            method: 'GET'
        })
        const response_user_data = yield call([response_user, response_user.json]);
        for (var i in response_user_data) {
            if (response_user_data[i].username == username) {
                const user_data = response_user_data[i]
                const token = user_data.mySNU_verification_token
                const user_id = user_data.id
                const email = user_data.email
                const name = user_data.name
                if (user_data.mySNU_verified)
                    yield put(actions.loginSuccess(username, password, token, user_id, email, name))
                else
                    alert("인증되지 않은 사용자입니다. 메일 인증을 하십시오.")
                break
            }
        }
    }
    else
      alert("존재하지 않는 ID나 비밀번호입니다.")
}

export function* sendSignupReq(data) {
    let uid = data.username
    let upw = data.password
    let name = data.name
    let email = data.email+"@snu.ac.kr"
    const url = 'http://127.0.0.1:8000/sign_up/'
    const info = JSON.stringify({ username: uid, password: upw, name: name, email: email });
    const response = yield call(fetch, url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: info,
    })
    if (response.ok) {
        alert("인증 링크가 당신의 SNU 메일로 전송되었습니다.")
        yield put(actions.signupSuccess())
        Object.defineProperty(window.location, 'href', {
          writable: true,
          value: '/login'
        });
    } else {
        alert("회원가입 실패 : 정보를 바르게 입력하세요.")
    }
}

export default function* () {
  yield fork(initialize)
  yield fork(watchReload)
  yield fork(watchLogin)
  yield fork(watchSignup)
  yield fork(watchNew)
}
