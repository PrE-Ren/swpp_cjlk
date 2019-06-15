import {take, put, call, fork, select, all} from 'redux-saga/effects'
import * as actions from './actions'

export function* watchLoadLeaderinfo() {
  while(true) {
    const action = yield take(actions.LOAD_LEADERINFO_ACTION)
    yield call(load_leaderinfo_func, action)
  }
}

export function* watchLoadMemberinfo() {
  while(true) {
    const action = yield take(actions.LOAD_MEMBERINFO_ACTION)
    yield call(load_memberinfo_func, action)
  }
}

export function* load_leaderinfo_func(action) {
  const url_leaderinfo = 'http://127.0.0.1:8000/user/' + action.user_id + '/'
  const response_leaderinfo = yield call(fetch, url_leaderinfo, { method : 'GET' })

  if (response_leaderinfo.ok) {
    const leaderinfo = yield call([response_leaderinfo, response_leaderinfo.json])
    sessionStorage.setItem("leader.name", leaderinfo.name)                  //  리더 이름(닉네임) 로드 후 세션 스토리지에 저장
    sessionStorage.setItem("leader.email", leaderinfo.email)                //  리더 이메일 로드 후 세션 스토리지에 저장
    sessionStorage.setItem("leader.phone_number", leaderinfo.phone_number)  //  리더 폰 번호 로드 후 세션 스토리지에 저장
    yield put(actions.load_leaderinfo_success_action())                     //  리더 정보 로드 완료
  }
  else
    alert('<Fail to fetch leader information>')
}

export function* load_memberinfo_func(action) {
  let url = new Array();
  let response_memberinfo
  let memberinfo
  let memberinfo_list = new Array();
  let i = 0, j = 0, x = 0
  action.members.map((member_id) =>
  {
    url[i] = 'http://127.0.0.1:8000/user/' + member_id + '/',
    i = i + 1;
  })

  while (j < i) {
    response_memberinfo = yield call(fetch, url[j], { method : 'GET' })
    memberinfo_list[x] = new Array();
    if (response_memberinfo.ok) {
      memberinfo = yield call([response_memberinfo, response_memberinfo.json])
      memberinfo_list[x][0] = memberinfo.username
      memberinfo_list[x][1] = memberinfo.name
      memberinfo_list[x][2] = memberinfo.email
      memberinfo_list[x][3] = memberinfo.phone_number
      x = x + 1;
    }
    else
      alert('<Fail to fetch member information>')
    j = j + 1;
  }

  sessionStorage.setItem("member_list", JSON.stringify(memberinfo_list))  //  참여 멤버 정보 로드 후 세션 스토리지에 저장
  yield put(actions.load_memberinfo_success_action(memberinfo_list))      //  참여 멤버 정보 로드 완료
}

export default function* () {
  yield fork(watchLoadLeaderinfo)
  yield fork(watchLoadMemberinfo)
}
