import {take, put, call, fork, select} from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'

export function* watchLogin() {
  while(true) {
    const action = yield take(actions.LOGIN_ACTION)
    yield call(login_func, action)
  }
}

export function* watchSignup() {
  while(true) {
    const action = yield take(actions.SIGNUP_ACTION)
    yield call(signup_func, action)
  }
}

export function* watchNew() {
  while(true) {
    const action = yield take(actions.NEW_ACTION)
    yield call(new_func, action)
  }
}

export function* watchChangeMeetingState() {
  while(true) {
    const action = yield take(actions.CHANGE_MEETING_STATE_ACTION)
    yield call(change_meeting_state_func, action)
  }
}

export function* watchJoinMeeting() {
  while(true) {
    const action = yield take(actions.JOIN_MEETING_ACTION)
    yield call(join_meeting_func, action)
  }
}

export function* watchWithdrawMeeting() {
  while(true) {
    const action = yield take(actions.WITHDRAW_MEETING_ACTION)
    yield call(withdraw_meeting_func, action)
  }
}

export function* watchChangePageNum() {
  while(true) {
    const action = yield take(actions.CHANGE_PAGE_NUM_ACTION)
    yield call(change_page_num_func, action)
  }
}

function* get_meetinglist(type) {
  const get_token = (state) => state.snu_moyeo.mySNU_verification_token
  const token = yield select(get_token)

  if (token !== null) {
    let url
    if (type.includes('/list'))
      url = 'http://127.0.0.1:8000' + type + '?page=1'
    else
      url = 'http://127.0.0.1:8000/meetinglist/' + type

    const get_username = (state) => state.snu_moyeo.username
    const get_password = (state) => state.snu_moyeo.password
    const username = yield select(get_username)
    const password = yield select(get_password)
    const hash = new Buffer(`${username}:${password}`).toString('base64')

    const response = yield call(fetch, url, {
      method : 'GET',
      headers: { 'Authorization' : `Basic ${hash}` }
    })
    if (response.ok) {
      const meetinglist = yield call([response, response.json])
      console.log('<Fetch ' + type + ' list from back-end (by reload)>')
      console.log(meetinglist)
      return meetinglist
    }
    else {
      alert('Fail to fetch ' + type + ' list from back-end')
      return null
    }
  }
  else
    return null
}

export function* reload() {
  const pathname = window.location.pathname
  alert(pathname)
  if (pathname == '/') {
    //alert("Reload " + pathname + " : Set state by data from back-end")
    const meetinglist_impending = yield call(get_meetinglist, 'impending')
    const meetinglist_recent = yield call(get_meetinglist, 'recent')
    if (meetinglist_impending !== null && meetinglist_recent !== null) {
      console.log('<Dispatch reload_action>')
      yield put(actions.reload_action('impending', meetinglist_impending))
      yield put(actions.reload_action('recent', meetinglist_recent))
    }
  }
  else if (pathname == '/mypage') {
    //alert("Reload " + pathname + " : Set state by data from back-end")
    const meetinglist_lead = yield call(get_meetinglist, 'lead')
    const meetinglist_join = yield call(get_meetinglist, 'join')
    const meetinglist_history = yield call(get_meetinglist, 'history')
    if (meetinglist_lead !== null && meetinglist_join !== null && meetinglist_history !== null) {
      console.log('<Dispatch reload_action>')
      yield put(actions.reload_action('lead', meetinglist_lead))
      yield put(actions.reload_action('join', meetinglist_join))
      yield put(actions.reload_action('history', meetinglist_history))
    }
  }
  else if (pathname.includes('/list')) {
    //alert("Reload " + pathname + " : Set state by data from back-end")
    const meetinglist = yield call(get_meetinglist, pathname)
    if (meetinglist !== null) {
      console.log('<Dispatch reload_action>')
      yield put(actions.reload_action(pathname, meetinglist))
    }
  }
  else {
    //alert("Reload " + pathname + " : Do nothing")
  }
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
  // 회원가입된 계정 O
  if (response_token.ok) {
    const hash = new Buffer(`${action.username}:${action.password}`).toString('base64')
    const response_user = yield call(fetch, url_user, {
      method: 'GET',
      headers: { 'Authorization' : `Basic ${hash}` }
    })
    // 로그인 성공 (인증 완료)
    if (response_user.ok) {
      const response_user_data = yield call([response_user, response_user.json]);
      yield put(actions.login_success_action(username, password, response_user_data.mySNU_verification_token, response_user_data.user_id, response_user_data.email, response_user_data.name))
    }
    // 로그인 실패 (인증 미완료)
    else
      alert("인증되지 않은 사용자입니다. 메일 인증을 하십시오.")
  }
  // 회원가입된 계정 X
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

export function* new_func(action) {
  const url_meeting = 'http://127.0.0.1:8000/meeting/'
  const url_participate = 'http://127.0.0.1:8000/participate/'
  const hash = new Buffer(`${action.username}:${action.password}`).toString('base64')
  const formData = new FormData();
  if (action.min_people > 1 && action.max_people > 1) {
    formData.append('title', action.title);
    formData.append('kind', action.kind);
    formData.append('due', action.due);
    formData.append('min_people', action.min_people);
    formData.append('max_people', action.max_people);
    formData.append('description', action.description);
    formData.append('state', 0);
    if (action.picture !== undefined) {
      formData.append('picture', action.picture, action.picture.name);
    }

    const response_meeting = yield call(fetch, url_meeting, {
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
  else {
    alert('올바르지 않은 인원 형식')
  }
}

export function* change_meeting_state_func(action) {
  let meeting_id = action.meeting_info.id
  const url_meeting = `http://127.0.0.1:8000/meeting/${meeting_id}/`
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
          'Authorization': `Basic ${action.hash}`,
          'Content-Type': 'application/json',
      },
      body: info_meeting,
  })
  if (response_meeting.ok) {
    console.log('PUT ok')
    window.location.reload()
  }
  else {
    if(action.new_state == 1)
      alert("모임 인원이 최소 인원을 충족하지 못했습니다")
    console.log('PUT bad')
  }
}

export function* join_meeting_func(action) {
  const url_participate = 'http://127.0.0.1:8000/participate/'
  const info_participate = JSON.stringify({ user_id: action.user_id, meeting_id: action.meeting_id });
  const response_participate = yield call(fetch, url_participate, {
      method: 'POST',
      headers: {
          'Authorization': `Basic ${action.hash}`,
          'Content-Type': 'application/json',
      },
      body: info_participate,
  })
  if (response_participate.ok) {
    console.log('Participate POST ok')
    // const participate_info = yield call([response_participate, response_participate.json])
    window.location.reload()
  }
  else
  {
    alert("참여하고자 하는 모임의 인원이 가득 찼습니다")
    console.log('Participate POST bad')
  }
}

export function* withdraw_meeting_func(action) {
  const url = `http://127.0.0.1:8000/participate/${action.user_id}/${action.meeting_id}/`
  const response = yield call(fetch, url, { method: 'GET' })
  const participate_id = yield call([response, response.json])
  const url_participate = `http://127.0.0.1:8000/participate/${participate_id}/`
  const info_participate = JSON.stringify({ user_id: action.user_id, meeting_id: action.meeting_id });
  const response_participate = yield call(fetch, url_participate, {
      method: 'DELETE',
      headers: { 'Authorization': `Basic ${action.hash}` }
  })
  if (response_participate.ok) {
    console.log('Participate DELETE ok')
    window.location.reload()
  }
  else
    console.log('Participate DELETE bad')
}

export function* change_page_num_func(action) {
  if (action.page_num != 0) {
    const pathname = window.location.pathname
    const get_token = (state) => state.snu_moyeo.mySNU_verification_token
    const token = yield select(get_token)

    if (token !== null) {
      const url = 'http://127.0.0.1:8000' + pathname + '?page=' + action.page_num

      const get_username = (state) => state.snu_moyeo.username
      const get_password = (state) => state.snu_moyeo.password
      const username = yield select(get_username)
      const password = yield select(get_password)
      const hash = new Buffer(`${username}:${password}`).toString('base64')

      const response = yield call(fetch, url, {
        method : 'GET',
        headers: { 'Authorization' : `Basic ${hash}` }
      })
      if (response.ok) {
        const meetinglist = yield call([response, response.json])
        console.log('<Fetch ' + action.page_num + 'th meeting list from back-end (by reload)>')
        console.log(meetinglist)
        yield put(actions.change_page_num_success_action(action.page_num, meetinglist))
      }
      else {
        alert('Fail to fetch ' + action.page_num + 'th meeting list from back-end')
      }
    }
  }
  else {
    alert('No page')
  }
}

export default function* () {
  yield fork(reload)
  yield fork(watchLogin)
  yield fork(watchSignup)
  yield fork(watchNew)
  yield fork(watchChangeMeetingState)
  yield fork(watchJoinMeeting)
  yield fork(watchWithdrawMeeting)
  yield fork(watchChangePageNum)
}
