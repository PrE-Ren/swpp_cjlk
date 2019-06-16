import {take, put, call, fork, select, all} from 'redux-saga/effects'
import * as actions from './actions'

export function* reload_admin() {
  const pathname = window.location.pathname  //  "http://localhost:3000"의 뒷부분 URL

  // ReportAdmin 페이지
  if (pathname == '/admin') {
    const username = sessionStorage.getItem("username")

    // 로그인 X : 로그인 페이지로 리다이렉트
    if (username == null) {
      alert('잘못된 접근입니다.')
      Object.defineProperty(window.location, 'href', { writable: true, value: '/login' })
    }

    // 관리자 X : 홈 페이지로 리다이렉트
    else if (username != 'admin') {
      alert('오직 관리자만이 볼 수 있습니다.')
      Object.defineProperty(window.location, 'href', { writable: true, value: '/' })
    }

    // 관리자 O
    else {
      const password = sessionStorage.getItem("password")
      const url_report = 'http://127.0.0.1:8000/report/'
      console.log(username)
      console.log(password)
      const hash = new Buffer(`${username}:${password}`).toString('base64')  //  유저의 해시값

      //  백엔드에서 신고 리스트 로드
      const response_report = yield call(fetch, url_report, { method: 'GET', headers: { 'Authorization' : `Basic ${hash}` } })

      if (response_report.ok) {
        const response_report_data = yield call([response_report, response_report.json]);
        yield put(actions.get_report_success_action(response_report_data))  //  불러온 신고 리스트를 스토어에 저장 (by reducer)
      }
    }
  }
}

export function* watchPenalty() {
  while(true) {
    const action = yield take(actions.PENALTY_ACTION)
    yield call(penalty_func, action)
  }
}

export function* watchAccuse(){
  while(true) {
    const action = yield take(actions.ACCUSE_ACTION)
    yield call(accuse_func, action)
  }
}

export function* penalty_func(action) {
  const report_info = action.report_info
  const url_report = 'http://127.0.0.1:8000/report/' + report_info.id + '/'
  const report_info_modified = JSON.stringify({
    reason: report_info.reason,
    isHandled: action.flag,  //  관리자가 입력한 값
    point: action.point,    //  관리자가 입력한 값
    reporterid: report_info.reporterid,
    reportee: report_info.reportee,
    reporteeid: report_info.reporteeid
  })

  // Report 모델 PUT
  const response_report = yield call(fetch, url_report, {
      method: 'PUT',
      headers: {
        'Authorization': `Basic ${action.hash}`,
        'Content-Type': 'application/json',
      },
      body: report_info_modified,
  })
  if (response_report.ok) {
    console.log('REPORT PUT ok')
    window.location.reload()
  }
  else
    console.log('REPORT PUT bad')
}

export function* accuse_func(action) {
  const url_accuse = 'http://127.0.0.1:8000/report/'
  const accuse_info = JSON.stringify({
    reason: action.accuse_reason,
    reporteeid: action.member_id
  })

  // Report 모델 POST
  const response_accuse = yield call(fetch, url_accuse, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${action.hash}`,
        'Content-Type': 'application/json',
      },
      body: accuse_info,
  })
  if (response_accuse.ok)
    console.log('REPORT POST ok')
  else
    console.log('REPORT POST bad')
}

export default function* () {
  yield fork(reload_admin)
  yield fork(watchPenalty)
  yield fork(watchAccuse)
}
