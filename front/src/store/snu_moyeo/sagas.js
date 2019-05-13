import {take, put, call, fork} from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'

/* Fetch data from back-end when detecting page reload */
/* 각 페이지 별로 필요한 미팅 목록이 다르기 때문에, 사실 따로따로 구현해야 함. */
/* 그런데 일단 여기서 다 가져오는 걸로 구현하겠음. 나중에 수정 요망. */
export function* watchReload() {
  if (window.performance && performance.navigation.type == 1) {
    console.log("<Detect page reload : state will be updated by back-end data>")
    yield call(reload_func)
  }
}

export function* watchLogin(){
  while(true) {
    const action = yield take(actions.LOGIN_ACTION)
    yield call(login_func, action)
  }
}

export function* watchSignup(){
  while(true) {
    const action = yield take(actions.SIGNUP_ACTION)
    yield call(signup_func, action)
  }
}

export function* watchNew(){
  while(true) {
    const action = yield take(actions.NEW_ACTION)
    yield call(new_func, action)
  }
}

export function* watchChangeMeetingState(){
  while(true) {
    const action = yield take(actions.CHANGE_MEETING_STATE_ACTION)
    yield call(change_meeting_state_func, action)
  }
}

/* It will be unnecessary later */
export function* initialize() {
  console.log("<Initialize : state will be initialized by back-end data>")
  let meetinglist_impending
  let meetinglist_recent

  const response_impending = yield call(fetch, 'http://127.0.0.1:8000/meetinglist/impending', { method : 'GET' })
  if (response_impending.ok) {
    meetinglist_impending = yield call([response_impending, response_impending.json])
    console.log('<Fetch impending list from back-end (Reload)>')
    console.log(meetinglist_impending)
  }
  else
    alert('Fail to fetch impending list from back-end')

  const response_recent = yield call(fetch, 'http://127.0.0.1:8000/meetinglist/recent', { method : 'GET' })
  if (response_recent.ok) {
    meetinglist_recent = yield call([response_recent, response_recent.json])
    console.log('<Fetch recent list from back-end (Reload)>')
    console.log(meetinglist_recent)
  }
  else
    alert('Fail to fetch recent list from back-end')

  console.log('<Dispatch reload_action>')
  yield put(actions.reload_action(meetinglist_impending, meetinglist_recent))
}

export function* reload_func() {
  let meetinglist_impending
  let meetinglist_recent

  const response_impending = yield call(fetch, 'http://127.0.0.1:8000/meetinglist/impending', { method : 'GET' })
  if (response_impending.ok) {
    meetinglist_impending = yield call([response_impending, response_impending.json])
    console.log('<Fetch impending list from back-end (Reload)>')
    console.log(meetinglist_impending)
  }
  else
    alert('Fail to fetch impending list from back-end')

  const response_recent = yield call(fetch, 'http://127.0.0.1:8000/meetinglist/recent', { method : 'GET' })
  if (response_recent.ok) {
    meetinglist_recent = yield call([response_recent, response_recent.json])
    console.log('<Fetch recent list from back-end (Reload)>')
    console.log(meetinglist_recent)
  }
  else
    alert('Fail to fetch recent list from back-end')

  console.log('<Dispatch reload_action>')
  yield put(actions.reload_action(meetinglist_impending, meetinglist_recent))
}

export function* login_func(action) {
  const username = action.username
  const password = action.password
  const url_token = 'http://127.0.0.1:8000/get_auth_token/'
  const url_user = 'http://127.0.0.1:8000/log_in/'
  const info = JSON.stringify({ username: username, password: password });
  const response_token = yield call(fetch, url_token, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: info,
  })
  if (response_token.ok) {
    const hash = new Buffer(`${action.username}:${action.password}`).toString('base64')
    const response_login = yield call(fetch, url_user, { 
      method: 'GET',
      headers: {
          'Authorization' : `Basic ${hash}`
      },
    })
    if(response_login.ok)
    {
      const response_login_data = yield call([response_login, response_login.json]);
      yield put(actions.login_success_action(username, password, response_login_data.mySNU_verification_token, response_login_data.user_id, response_login_data.email, response_login_data.name))
    }
    else
      alert("인증되지 않은 사용자입니다. 메일 인증을 하십시오.")
  }
  else
    alert("존재하지 않는 ID나 비밀번호입니다.")
}

export function* signup_func(data) {
  let uid = data.username
  let upw = data.password
  let name = data.name
  let email = data.email+"@snu.ac.kr"
  const url = 'http://127.0.0.1:8000/sign_up/'
  const info = JSON.stringify({ username: uid, password: upw, name: name, email: email });
  const response = yield call(fetch, url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: info,
  })
  if (response.ok) {
    alert("인증 링크가 당신의 SNU 메일로 전송되었습니다.")
    yield put(actions.signup_success_action())
    Object.defineProperty(window.location, 'href', {
      writable: true,
      value: '/login'
    });
  }
  else
    alert("회원가입 실패 : 정보를 바르게 입력하세요.")
}

export function* new_func(action){
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
      state: 0
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

export function* change_meeting_state_func(action) {
  let meeting_id = action.meeting_info.id
  const url_meeting = `http://127.0.0.1:8000/meetinglist/${meeting_id}/`
  const hash = new Buffer(`${action.username}:${action.password}`).toString('base64')
  const info_meeting = JSON.stringify(
    {
      title: action.meeting_info.title,
      due: action.meeting_info.due,
      min_people: action.meeting_info.min_people,
      max_people: action.meeting_info.max_people,
      description: action.meeting_info.description,
      state: action.new_state,
      kind: action.meeting_info.kind
    }
  );
  const response_meeting = yield call(fetch, url_meeting, {
      method: 'PUT',
      headers: {
          'Authorization': `Basic ${hash}`,
          'Content-Type': 'application/json',
      },
      body: info_meeting,
  })
  if (response_meeting.ok) {
    console.log('PUT ok')
    window.location.reload()
  }
  else {
    console.log('PUT bad')
  }
}

export default function* () {
  yield fork(initialize)
  yield fork(watchReload)
  yield fork(watchLogin)
  yield fork(watchSignup)
  yield fork(watchNew)
  yield fork(watchChangeMeetingState)
}
