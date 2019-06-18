import {take, put, call, fork, select, all} from 'redux-saga/effects'
import * as actions from './actions'

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

export function* join_meeting_func(action) {
  const url_participate = 'http://127.0.0.1:8000/participate/'
  const info_participate = JSON.stringify({ user_id: action.user_id, meeting_id: action.meeting_id });  //  POST할 Participate 객체 정보

  // Participate 모델 POST
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
    window.location.reload()
  }
  else {
    alert("인당 5개 이상의 열린 모임을 가질 수 없습니다.")
    console.log('Participate POST bad')
  }
}

export function* withdraw_meeting_func(action) {
  const url = `http://127.0.0.1:8000/participate/${action.user_id}/${action.meeting_id}/`
  const response = yield call(fetch, url, { method: 'GET' })
  const participate_id = yield call([response, response.json])  //  DELETE할 Participate 객체의 고유값
  const url_participate = `http://127.0.0.1:8000/participate/${participate_id}/`

  // Participate 모델 DELETE
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

export default function* () {
  yield fork(watchJoinMeeting)
  yield fork(watchWithdrawMeeting)
}
