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

export function* watchSendEmail() {
  while(true) {
    const action = yield take(actions.SEND_EMAIL_ACTION)
    yield call(send_email_func, action)
  }
}

export function* watchSendPhone() {
  while(true) {
    const action = yield take(actions.SEND_PHONE_ACTION)
    yield call(send_phone_func, action)
  }
}

export function* watchConfirmEmail() {
  while(true) {
    const action = yield take(actions.CONFIRM_EMAIL_ACTION)
    yield call(confirm_email_func, action)
  }
}

export function* watchConfirmPhone() {
  while(true) {
    const action = yield take(actions.CONFIRM_PHONE_ACTION)
    yield call(confirm_phone_func, action)
  }
}

export function* watchNew() {
  while(true) {
    const action = yield take(actions.NEW_ACTION)
    yield call(new_func, action)
  }
}

export function* watchModify() {
  while(true) {
    const action = yield take(actions.MODIFY_ACTION)
    yield call(modify_func, action)
  }
}

export function* watchChangeMeetingState() {
  while(true) {
    const action = yield take(actions.CHANGE_MEETING_STATE_ACTION)
    yield call(change_meeting_state_func, action)
  }
}

export function* watchChangeMeetingInfo() {
  while(true) {
    const action = yield take(actions.CHANGE_MEETING_INFO_ACTION)
    yield call(change_meeting_info_func, action)
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

export function* watchLoadComments() {
  while(true) {
    const action = yield take(actions.LOAD_COMMENTS_ACTION)
    yield call(load_comments_func, action)
  }
}

export function* watchAddComment() {
  while(true) {
    const action = yield take(actions.ADD_COMMENT_ACTION)
    yield call(add_comment_func, action)
  }
}

function* get_meetinglist(type) {
  const get_token = (state) => state.snu_moyeo.mySNU_verification_token
  const token = yield select(get_token)

  if (token !== null) {
    let url
    if (type.includes('/list'))
      url = 'http://127.0.0.1:8000' + type + '/?page=1'
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
    const meetinglist_impending = yield call(get_meetinglist, 'impending')
    const meetinglist_recent = yield call(get_meetinglist, 'recent')
    if (meetinglist_impending !== null && meetinglist_recent !== null) {
      console.log('<Dispatch reload_action>')
      yield put(actions.reload_action('impending', meetinglist_impending))
      yield put(actions.reload_action('recent', meetinglist_recent))
    }
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
    // 홈 페이지로 (인증 완료)
    if (response_user.ok) {
      alert('로그인 성공')
      const response_user_data = yield call([response_user, response_user.json]);
      yield put(actions.login_success_action(username, password, response_user_data.mySNU_verification_token, response_user_data.user_id, response_user_data.email, response_user_data.phone_number, response_user_data.name))
      Object.defineProperty(window.location, 'href', {
        writable: true,
        value: '/'
      });
    }
    // 인증 페이지로 (인증 미완료)
    else{
      alert('인증 필요')
      yield put(actions.login_auth_action(username, password))
      Object.defineProperty(window.location, 'href', {
        writable: true,
        value: '/auth'
      });
    }
  }
  // 회원가입된 계정 X
  else
    alert("로그인 실패 : 존재하지 않는 ID나 비밀번호입니다.")
}

export function* signup_func(action) {
  let uid = action.username
  let upw = action.password
  let name = action.name
  const url = 'http://127.0.0.1:8000/sign_up/'
  const info = JSON.stringify({ username: uid, password: upw, name: name});
  const response = yield call(fetch, url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: info,
  })
  if (response.ok) {
    alert("회원가입 성공 : 서비스를 이용하려면 이메일 인증과 휴대폰 인증을 완료해야 합니다.")
    yield put(actions.login_auth_action(uid, upw))
    Object.defineProperty(window.location, 'href', {
      writable: true,
      value: '/auth'
    });
  }
  else
    alert("회원가입 실패 : 정보를 바르게 입력하세요.")
}

export function* send_email_func(action) {
  const url_send_email = 'http://127.0.0.1:8000/send_email/' + action.email + '/'
  const response_email = yield call(fetch, url_send_email, {
    method: 'GET',
    headers: { 'Authorization' : `Basic ${action.hash}` }
  })
  if (response_email.ok) {
    alert('이메일로 인증번호가 전송되었습니다.')
  }
  else {
    alert('인증번호 전송 실패')
  }
}

export function* send_phone_func(action) {
  const url_send_phone = 'http://127.0.0.1:8000/send_phone/' + action.phone_number + '/'
  const response_phone = yield call(fetch, url_send_phone, {
    method: 'GET',
    headers: { 'Authorization' : `Basic ${action.hash}` }
  })
  if (response_phone.ok) {
    alert('휴대폰으로 인증번호가 전송되었습니다.')
  }
  else {
    alert('인증번호 전송 실패')
  }
}

export function* confirm_email_func(action) {
  const url_send_email = 'http://127.0.0.1:8000/email_auth/' + action.email + '/' + action.email_code + '/'
  const response_email = yield call(fetch, url_send_email, {
    method: 'GET',
    headers: { 'Authorization' : `Basic ${action.hash}` }
  })
  if (response_email.ok) {
    alert('인증 완료')
  }
  else {
    alert('인증번호가 틀렸습니다.')
  }
}

export function* confirm_phone_func(action) {
  const url_send_phone = 'http://127.0.0.1:8000/phone_auth/' + action.phone_number + '/' + action.phone_code + '/'
  const response_phone = yield call(fetch, url_send_phone, {
    method: 'GET',
    headers: { 'Authorization' : `Basic ${action.hash}` }
  })
  if (response_phone.ok) {
    alert('인증 완료')
  }
  else {
    alert('인증번호가 틀렸습니다.')
  }
}

export function* new_func(action) {
  const url_meeting = 'http://127.0.0.1:8000/meeting/'
  const url_participate = 'http://127.0.0.1:8000/participate/'
  const formData = new FormData();

  if (action.meeting_info.min_people > 1 && action.meeting_info.max_people > 1) {
    formData.append('title', action.meeting_info.title);
    formData.append('due', action.meeting_info.due);
    formData.append('min_people', action.meeting_info.min_people);
    formData.append('max_people', action.meeting_info.max_people);
    formData.append('description', action.meeting_info.description);
    formData.append('state', 0);
    formData.append('kind', action.meeting_info.kind);
    if (action.meeting_info.picture !== undefined)  //  사진을 지정해주지 않으면(undefined) null 값으로 설정
      formData.append('picture', action.meeting_info.picture, action.meeting_info.picture.name);
    else
      formData.append('picture', null, null)

    const response_meeting = yield call(fetch, url_meeting, {
        method: 'POST',
        headers: { 'Authorization': `Basic ${action.hash}` },
        body: formData,
    })

    const response_meeting_data = yield call([response_meeting, response_meeting.json]);
    if (response_meeting.ok) {
      console.log('Meeting POST ok')
      const meeting_id = response_meeting_data.id
      const info_participate = JSON.stringify({ user_id: action.user_id, meeting_id: meeting_id });
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
      if (response_meeting_data.non_field_errors == "You can not participate more than 5")
        alert('인당 5개 이상의 열린 모임을 가질 수 없습니다.')
      else
        alert('올바르지 않은 모임 형식입니다.')
    }
  }
  else {
    alert('최소 인원과 최대 인원은 모두 2명 이상이어야 합니다.')
  }
}

export function* modify_func(action) {
  const meeting_info = JSON.parse(localStorage.getItem("meeting_info"))
  const url_meeting = `http://127.0.0.1:8000/meeting/${meeting_info.id}/`
  const formData = new FormData();

  if (action.meeting_info.min_people > 1 && action.meeting_info.max_people > 1) {
    formData.append('title', action.meeting_info.title);
    formData.append('due', action.meeting_info.due);
    formData.append('min_people', action.meeting_info.min_people);
    formData.append('max_people', action.meeting_info.max_people);
    formData.append('description', action.meeting_info.description);
    formData.append('state', action.meeting_info.state);
    formData.append('kind', action.meeting_info.kind);

    if (action.meeting_info.picture !== undefined)  //  사진을 지정해주지 않으면(undefined) null 값으로 설정
      formData.append('picture', action.meeting_info.picture, action.meeting_info.picture.name);
    else
      formData.append('picture', null, null)

    const response_meeting = yield call(fetch, url_meeting, {
        method: 'PUT',
        headers: { 'Authorization': `Basic ${action.hash}` },
        body: formData,
    })
    if (response_meeting.ok) {
      console.log('Meeting PUT ok')
      localStorage.removeItem('meeting_info')
      window.location.href = '/'
    }
    else {
      console.log('Meeting PUT bad')
    }
  }
  else {
    alert('최소 인원과 최대 인원은 모두 2명 이상이어야 합니다.')
  }
}

export function* change_meeting_state_func(action) {
  let meeting_id = action.meeting_info.id
  const url_meeting = `http://127.0.0.1:8000/meeting/${meeting_id}/`
  const formData = new FormData();
  console.log(action)
  formData.append('title', action.meeting_info.title);
  formData.append('due', action.meeting_info.due);
  formData.append('min_people', action.meeting_info.min_people);
  formData.append('max_people', action.meeting_info.max_people);
  formData.append('description', action.meeting_info.description);
  formData.append('state', action.new_state);
  formData.append('kind', action.meeting_info.kind);

  if (action.meeting_info.picture !== null)
    formData.append('picture', action.meeting_info.picture, action.meeting_info.picture.name)
  else
    formData.append('picture', null, null)

  const response_meeting = yield call(fetch, url_meeting, {
      method: 'PUT',
      headers: { 'Authorization': `Basic ${action.hash}` },
      body: formData,
  })
  if (response_meeting.ok) {
    console.log('PUT ok')
    window.location.reload()
  }
  else {
    if (action.new_state == 1)
      alert("모임 인원이 최소 인원을 충족하지 못했습니다")
    console.log('PUT bad')
  }
}

export function* change_meeting_info_func(action) {
  const meeting_info = JSON.stringify(action.meeting_info)
  localStorage.setItem("meeting_info", meeting_info)
  window.location.href = "/new"
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
  if (action.page_num > 0) {
    const pathname = window.location.pathname
    const get_token = (state) => state.snu_moyeo.mySNU_verification_token
    const token = yield select(get_token)

    if (token !== null) {
      const url = 'http://127.0.0.1:8000' + pathname + '/?page=' + action.page_num

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

export function* load_comments_func(action) {
  const url_comments = 'http://127.0.0.1:8000/comment/meeting/' + action.meeting_id + '/'
  const response_comments = yield call(fetch, url_comments, { method : 'GET' })

  if (response_comments.ok) {
    const comments = yield call([response_comments, response_comments.json])
    console.log('<Fetch comments of this meeting>')
    console.log(comments)
    yield put(actions.load_comments_success_action(comments))
  }
  else
    alert('<Fail to fetch comments of this meeting>')
}

export function* add_comment_func(action) {
  const url_comment = 'http://127.0.0.1:8000/comment/'
  const info_comment = JSON.stringify({ meeting: action.meeting_id, content: action.description})
  const response_comment = yield call(fetch, url_comment, {
      method: 'POST',
      headers: {
          'Authorization': `Basic ${action.hash}`,
          'Content-Type': 'application/json',
      },
      body: info_comment,
  })

  if (response_comment.ok) {
    console.log('Comment POST ok')
    window.location.reload()  // 창 안 꺼지게 어떻게 하지
  }
  else
    console.log('Comment POST bad')
}

export default function* () {
  yield fork(reload)
  yield fork(watchLogin)
  yield fork(watchSignup)
  yield fork(watchSendEmail)
  yield fork(watchSendPhone)
  yield fork(watchConfirmEmail)
  yield fork(watchConfirmPhone)
  yield fork(watchNew)
  yield fork(watchModify)
  yield fork(watchChangeMeetingState)
  yield fork(watchChangeMeetingInfo)
  yield fork(watchJoinMeeting)
  yield fork(watchWithdrawMeeting)
  yield fork(watchChangePageNum)
  yield fork(watchLoadComments)
  yield fork(watchAddComment)
}
