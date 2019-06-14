import {take, put, call, fork, select, all} from 'redux-saga/effects'
import * as actions from './actions'

function* get_meetinglist(opt) {
  //const test = (state) => { console.log(state) }
  //const a = yield select(test)

  const get_token = (state) => state.snu_moyeo.mySNU_verification_token
  const token = yield select(get_token)  //  이메일 토큰

  // 인증된 유저
  if (token !== null) {
    let url

    // List 페이지에서 미팅 리스트를 불러오는 경우
    if (opt.includes('/list')) {
      // 검색을 한 경우
      if (opt.length >= 8) {
        const kind = opt[6]               //  미팅 유형
        const keyword = opt.substring(8)  //  검색 키워드
        url = 'http://127.0.0.1:8000/search' + kind + '/?page=1&search=' + keyword
      }
      // 일반적인 경우
      else
        url = 'http://127.0.0.1:8000' + opt + '/?page=1'
    }

    // All 페이지에서 미팅 리스트를 불러오는 경우
    else if (opt.includes('/all')) {
      const keyword = opt.substring(5)  //  검색 키워드
      url = 'http://127.0.0.1:8000/searchall/?page=1&search=' + keyword
    }
    else
      url = 'http://127.0.0.1:8000/meetinglist/' + opt

    const get_username = (state) => state.snu_moyeo.username
    const get_password = (state) => state.snu_moyeo.password
    const username = yield select(get_username)  //  유저 아이디
    const password = yield select(get_password)  //  유저 패스워드
    const hash = new Buffer(`${username}:${password}`).toString('base64')  //  유저 해시값

    // 미팅 리스트 로드
    const response = yield call(fetch, url, { method : 'GET', headers: { 'Authorization' : `Basic ${hash}` } })
    if (response.ok) {
      const meetinglist = yield call([response, response.json])
      console.log('<Fetch ' + opt + ' list from back-end (by reload)>')
      console.log(meetinglist)
      return meetinglist
    }
    else {
      alert('<Fail to fetch ' + opt + ' list from back-end>')
      return null
    }
  }

  // 인증되지 않은 유저
  else
    return null
}

export function* reload_meeting() {
  const pathname = window.location.pathname  //  "http://localhost:3000"의 뒷부분 URL

  // Home 페이지
  if (pathname == '/') {
    const meetinglist_impending = yield call(get_meetinglist, 'impending')  //  백엔드에서 미팅 리스트 로드
    const meetinglist_recent = yield call(get_meetinglist, 'recent')        //  백엔드에서 미팅 리스트 로드
    if (meetinglist_impending !== null && meetinglist_recent !== null) {
      yield put(actions.reload_action('impending', meetinglist_impending))  //  불러온 미팅 리스트를 스토어에 저장 (by reducer)
      yield put(actions.reload_action('recent', meetinglist_recent))        //  불러온 미팅 리스트를 스토어에 저장 (by reducer)
    }
  }

  // MyPage 페이지
  else if (pathname == '/mypage') {
    const meetinglist_lead = yield call(get_meetinglist, 'lead')        //  백엔드에서 미팅 리스트 로드
    const meetinglist_join = yield call(get_meetinglist, 'join')        //  백엔드에서 미팅 리스트 로드
    const meetinglist_history = yield call(get_meetinglist, 'history')  //  백엔드에서 미팅 리스트 로드
    if (meetinglist_lead !== null && meetinglist_join !== null && meetinglist_history !== null) {
      yield put(actions.reload_action('lead', meetinglist_lead))        //  불러온 미팅 리스트를 스토어에 저장 (by reducer)
      yield put(actions.reload_action('join', meetinglist_join))        //  불러온 미팅 리스트를 스토어에 저장 (by reducer)
      yield put(actions.reload_action('history', meetinglist_history))  //  불러온 미팅 리스트를 스토어에 저장 (by reducer)
    }
  }

  // List 페이지
  else if (pathname.includes('/list')) {
    const meetinglist = yield call(get_meetinglist, pathname)  //  백엔드에서 미팅 리스트 로드
    if (meetinglist !== null)
      yield put(actions.reload_action(pathname, meetinglist))  //  불러온 미팅 리스트를 스토어에 저장 (by reducer)
  }

  // All 페이지
  else if (pathname.includes('/all')) {
    const meetinglist = yield call(get_meetinglist, pathname)  //  백엔드에서 미팅 리스트 로드
    if (meetinglist !== null)
      yield put(actions.reload_action(pathname, meetinglist))  //  불러온 미팅 리스트를 스토어에 저장 (by reducer)
  }
}

export function* watchChangePageNum() {
  while(true) {
    const action = yield take(actions.CHANGE_PAGE_NUM_ACTION)
    yield call(change_page_num_func, action)
  }
}

export function* change_page_num_func(action) {
  const pathname = window.location.pathname  //  "http://localhost:3000"의 뒷부분 URL
  const get_token = (state) => state.snu_moyeo.mySNU_verification_token
  const token = yield select(get_token)  //  이메일 토큰

  // 인증된 유저
  if (token !== null) {
    let url

    // List 페이지에서 페이지를 넘기는 경우
    if (action.option == "kind") {
      // 검색을 한 경우
      if (pathname.length >= 8) {
        const kind = pathname[6]               //  미팅 유형
        const keyword = pathname.substring(8)  //  검색 키워드
        url = 'http://127.0.0.1:8000/search' + kind + '/?page=' + action.page_num + '&search=' + keyword
      }

      // 일반적인 경우
      else
        url = 'http://127.0.0.1:8000' + pathname + '/?page=' + action.page_num
    }

    // All 페이지에서 페이지를 넘기는 경우
    else if (action.option == "all") {
      const keyword = pathname.substring(5)  //  검색 키워드
      url = 'http://127.0.0.1:8000/searchall/?page=' + action.page_num + '&search=' + keyword
    }

    const get_username = (state) => state.snu_moyeo.username
    const get_password = (state) => state.snu_moyeo.password
    const username = yield select(get_username)  //  유저 아이디
    const password = yield select(get_password)  //  유저 패스워드
    const hash = new Buffer(`${username}:${password}`).toString('base64')  //  유저 해시값

    // 미팅 리스트 로드
    const response = yield call(fetch, url, { method : 'GET', headers: { 'Authorization' : `Basic ${hash}` } })
    if (response.ok) {
      const meetinglist = yield call([response, response.json])
      console.log('<Fetch ' + action.page_num + 'th meeting list from back-end (by reload)>')
      console.log(meetinglist)
      yield put(actions.change_page_num_success_action(action.option, action.page_num, meetinglist))
    }
    else {
      alert('<Fail to fetch ' + action.page_num + 'th meeting list from back-end>')
    }
  }
}

export default function* () {
  yield fork(reload_meeting)
  yield fork(watchChangePageNum)
}
