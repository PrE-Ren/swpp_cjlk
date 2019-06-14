import {take, put, call, fork, select, all} from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function* watchChangePageNum() {
  while(true) {
    const action = yield take(actions.CHANGE_PAGE_NUM_ACTION)
    yield call(change_page_num_func, action)
  }
}

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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

export function* watchEditComment() {
  while(true) {
    const action = yield take(actions.EDIT_COMMENT_ACTION)
    yield call(edit_comment_func, action)
  }
}

export function* watchDeleteComment() {
  while(true) {
    const action = yield take(actions.DELETE_COMMENT_ACTION)
    yield call(delete_comment_func, action)
  }
}

export function* watchPenalty() {
  while(true) {
    const action = yield take(actions.PENALTY_ACTION)
    yield call(penalty_func, action)
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function* get_meetinglist(opt) {
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

export function* reload() {
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

  // LoginAuth 페이지
  else if (pathname == '/auth') {
    const username = sessionStorage.getItem("username")  //  로그인 페이지에서 넘어올 때 혹은 회원가입 직후 스토어에 저장됨

    // 로그인 X : 로그인 페이지로 리다이렉트
    if (username == null) {
      alert('잘못된 접근입니다.')
      Object.defineProperty(window.location, 'href', { writable: true, value: '/login' })
    }

    // 로그인 O
    else {
      const password = sessionStorage.getItem("password")  //  로그인 페이지에서 넘어올 때 혹은 회원가입 직후 스토어에 저장됨
      const url_user = 'http://127.0.0.1:8000/log_in/'
      const hash = new Buffer(`${username}:${password}`).toString('base64')
      const response_user = yield call(fetch, url_user, { method: 'GET', headers: { 'Authorization' : `Basic ${hash}` } })

      // 인증 O : 홈 페이지로 리다이렉트
      if (response_user.ok) {
        alert('이미 인증을 완료한 유저입니다.')
        Object.defineProperty(window.location, 'href', { writable: true, value: '/' });
      }

      // 인증 X
      else {
        const response_user_data = yield call([response_user, response_user.json]);
        const mySNU_verification_token = response_user_data.mySNU_verified ? response_user_data.mySNU_verification_token : null
        const phone_verification_token = response_user_data.phone_verified ? response_user_data.phone_verification_token : null
        const email = response_user_data.mySNU_verified ? response_user_data.email : null
        const phone_number = response_user_data.phone_verified ? response_user_data.phone_number : null
        yield put(actions.login_success_action(  //  <인증 페이지에서 이미 인증된 필드의 유무 판단을 위한 정보 스토어에 저장>
          username,                              //  유저 아이디
          password,                              //  유저 패스워드
          mySNU_verification_token,              //  이메일 토큰 : 이걸 설정하는 게 진짜 목적 (나머진 사실 불필요)
          phone_verification_token,              //  폰 토큰 : 이걸 설정하는 게 진짜 목적 (나머진 사실 불필요)
          response_user_data.user_id,            //  고유값
          email,                                 //  이메일
          phone_number,                          //  폰 번호
          response_user_data.name                //  이름(닉네임)
        ))
      }
    }
  }

  // ReportAdmin 페이지
  else if (pathname == '/admin') {
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

export function* login_func(action) {
  const username = action.username  //  입력한 유저 아이디
  const password = action.password  //  입력한 유저 패스워드
  const url_token = 'http://127.0.0.1:8000/get_auth_token/'
  const url_user = 'http://127.0.0.1:8000/log_in/'
  const info = JSON.stringify({ username: username, password: password })

  const response_token = yield call(fetch, url_token, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: info,
  })

  // 회원가입된 계정 O
  if (response_token.ok) {
    const hash = new Buffer(`${username}:${password}`).toString('base64')  //  유저의 해시값
    const response_user = yield call(fetch, url_user, { method: 'GET', headers: { 'Authorization' : `Basic ${hash}` } })

    // 인증 O : 홈 페이지로 리다이렉트
    if (response_user.ok) {
      const response_user_data = yield call([response_user, response_user.json]);
      yield put(actions.login_success_action(         //  <로그인 성공 : 유저 정보 스토어에 저장>
        username,                                     //  유저 아이디
        password,                                     //  유저 패스워드
        response_user_data.mySNU_verification_token,  //  이메일 토큰
        response_user_data.phone_verification_token,  //  폰 토큰
        response_user_data.user_id,                   //  고유값
        response_user_data.email,                     //  이메일
        response_user_data.phone_number,              //  폰 번호
        response_user_data.name                       //  이름(닉네임)
      ))
      Object.defineProperty(window.location, 'href', { writable: true, value: '/' })
    }

    // 인증 X : 인증 페이지로 리다이렉트
    else {
      alert('인증 절차가 필요합니다.')
      yield put(actions.login_auth_action(username, password))  //  유저 아이디와 유저 패스워드 스토어에 저장 (인증 페이지에서 필요한 정보)
      Object.defineProperty(window.location, 'href', { writable: true, value: '/auth' })
    }
  }

  // 회원가입된 계정 X
  else
    alert("로그인 실패 : 존재하지 않는 ID나 비밀번호입니다.")
}

export function* signup_func(action) {
  let uid = action.username  //  입력한 유저 아이디
  let upw = action.password  //  입력한 유저 패스워드
  let name = action.name     //  입력한 이름(닉네임)
  const url = 'http://127.0.0.1:8000/sign_up/'
  const info = JSON.stringify({ username: uid, password: upw, name: name});

  // 새로운 SnuUser 객체 생성 (POST)
  const response = yield call(fetch, url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: info
  })

  // 회원가입 성공 : 인증 페이지로 리다이렉트
  if (response.ok) {
    alert("회원가입 성공 : 서비스를 이용하려면 이메일 인증과 휴대폰 인증을 완료해야 합니다.")
    yield put(actions.login_auth_action(uid, upw))  //  유저 아이디와 유저 패스워드 스토어에 저장 (인증 페이지에서 필요한 정보)
    Object.defineProperty(window.location, 'href', { writable: true, value: '/auth' })
  }

  // 회원가입 실패
  else
    alert("회원가입 실패 : 정보를 바르게 입력하세요.")
}

export function* send_email_func(action) {
  const url_send_email = 'http://127.0.0.1:8000/send_email/' + action.email + '/'
  const response_email = yield call(fetch, url_send_email, { method: 'GET', headers: { 'Authorization' : `Basic ${action.hash}` } })

  if (response_email.ok)  //  해당 유저의 이메일 토큰 필드 설정 (by BACK-END)
    alert('이메일로 인증번호가 전송되었습니다.')
  else
    alert('인증번호 전송 실패')
}

export function* send_phone_func(action) {
  const url_send_phone = 'http://127.0.0.1:8000/send_phone/' + action.phone_number + '/'
  const response_phone = yield call(fetch, url_send_phone, { method: 'GET', headers: { 'Authorization' : `Basic ${action.hash}` } })

  if (response_phone.ok)  //  해당 유저의 폰 토큰 필드 설정 (by BACK-END)
    alert('휴대폰으로 인증번호가 전송되었습니다.')
  else
    alert('인증번호 전송 실패')
}

export function* confirm_email_func(action) {
  const url_send_email = 'http://127.0.0.1:8000/email_auth/' + action.email + '/' + action.email_code + '/'
  const response_email = yield call(fetch, url_send_email, { method: 'GET', headers: { 'Authorization' : `Basic ${action.hash}` } })

  if (response_email.ok) {  //  해당 유저의 이메일 및 이메일 인증 여부 필드 설정 (by BACK-END)
    alert('인증 완료')
    yield put(actions.success_email_action(action.email, action.email_code))  //  이메일 및 이메일 토큰 설정 (-> 인증 페이지 리렌더링)
  }
  else
    alert('인증번호가 틀렸습니다.')
}

export function* confirm_phone_func(action) {
  const url_send_phone = 'http://127.0.0.1:8000/phone_auth/' + action.phone_number + '/' + action.phone_code + '/'
  const response_phone = yield call(fetch, url_send_phone, { method: 'GET', headers: { 'Authorization' : `Basic ${action.hash}` } })

  if (response_phone.ok) {  //  해당 유저의 폰 번호 및 폰 인증 여부 필드 설정 (by BACK-END)
    alert('인증 완료')
    yield put(actions.success_phone_action(action.phone_number, action.phone_code))  //  폰 번호 및 폰 토큰 설정 (-> 인증 페이지 리렌더링)
  }
  else
    alert('인증번호가 틀렸습니다.')
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function* new_func(action) {
  const url_meeting = 'http://127.0.0.1:8000/meeting/'
  const url_participate = 'http://127.0.0.1:8000/participate/'
  const formData = new FormData();

  formData.append('title', action.meeting_info.title);              //  제목 (입력)
  formData.append('due', action.meeting_info.due);                  //  마감 기한 (입력)
  formData.append('min_people', action.meeting_info.min_people);    //  최소 인원 (입력)
  formData.append('max_people', action.meeting_info.max_people);    //  최대 인원 (입력)
  formData.append('description', action.meeting_info.description);  //  본문 (입력)
  formData.append('state', 0);                                      //  상태 (자동 입력)
  formData.append('kind', action.meeting_info.kind);                //  유형 (입력)

  // 위도 및 경도 (지도를 클릭할 때 세션 스토리지에 저장)
  // 지도를 한 번도 안 클릭하면 null 값으로 되어 있기 때문에 이때는 기본값으로 설정
  if (sessionStorage.getItem("lat") != null) formData.append('latitude', sessionStorage.getItem("lat"))
  else                                       formData.append('latitude', 37.4615299)
  if (sessionStorage.getItem("lng") != null) formData.append('longitude', sessionStorage.getItem("lng"))
  else                                       formData.append('longitude', 126.9519267)

  // 사진을 지정해주지 않으면 undefined 값이 넘어오므로 이때는 null 값으로 설정
  if (action.meeting_info.picture !== undefined) formData.append('picture', action.meeting_info.picture, action.meeting_info.picture.name);
  else                                           formData.append('picture', null, null)

  // Meeting 모델 POST
  const response_meeting = yield call(fetch, url_meeting, {
      method: 'POST',
      headers: { 'Authorization': `Basic ${action.hash}` },
      body: formData,
  })

  const response_meeting_data = yield call([response_meeting, response_meeting.json]);  //  POST된 Meeting 객체의 정보

  if (response_meeting.ok) {
    console.log('Meeting POST ok')
    const meeting_id = response_meeting_data.id  //  POST된 Meeting 모델의 고유값
    const info_participate = JSON.stringify({ user_id: action.user_id, meeting_id: meeting_id });  //  POST할 Participate 객체의 정보

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
      Object.defineProperty(window.location, 'href', { writable: true, value: '/' })
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

export function* modify_func(action) {
  const meeting_info = JSON.parse(sessionStorage.getItem("meeting_info"))
  const url_meeting = `http://127.0.0.1:8000/meeting/${meeting_info.id}/`
  const formData = new FormData();

  formData.append('title', action.meeting_info.title);              //  제목 (새로 입력)
  formData.append('due', action.meeting_info.due);                  //  마감 기한 (기존 값)
  formData.append('min_people', action.meeting_info.min_people);    //  최소 인원 (기존 값)
  formData.append('max_people', action.meeting_info.max_people);    //  최대 인원 (기존 값)
  formData.append('description', action.meeting_info.description);  //  본문 (새로 입력)
  formData.append('state', action.meeting_info.state);              //  상태 (기존 값)
  formData.append('kind', action.meeting_info.kind);                //  유형 (기존 값)

  // 위도 및 경도 (지도를 클릭할 때 세션 스토리지에 저장)
  // 지도를 한 번도 안 클릭하면 null 값으로 되어 있기 때문에 이때는 기존 값으로 설정
  if (sessionStorage.getItem("lat") != null) formData.append('latitude', sessionStorage.getItem("lat"))
  else                                       formData.append('latitude', 37.4615299)
  if (sessionStorage.getItem("lng") != null) formData.append('longitude', sessionStorage.getItem("lng"))
  else                                       formData.append('longitude', 126.9519267)

  // 사진을 지정해주지 않으면 undefined 값이 넘어오므로 이때는 null 값으로 설정
  if (action.meeting_info.picture !== undefined) formData.append('picture', action.meeting_info.picture, action.meeting_info.picture.name);
  else                                           formData.append('picture', null, null)

  // Meeting 모델 PUT
  const response_meeting = yield call(fetch, url_meeting, {
      method: 'PUT',
      headers: { 'Authorization': `Basic ${action.hash}` },
      body: formData,
  })
  if (response_meeting.ok) {
    console.log('Meeting PUT ok')
    sessionStorage.removeItem('meeting_info')  //  사실 불필요한 것 같음
    window.location.href = '/'
  }
  else {
    alert('올바르지 않은 모임 형식입니다.')
    console.log('Meeting PUT bad')
  }
}

export function* change_meeting_state_func(action) {
  let meeting_id = action.meeting_info.id
  const url_meeting = `http://127.0.0.1:8000/meeting/${meeting_id}/`
  const formData = new FormData();
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
  sessionStorage.setItem("meeting_info", meeting_info)
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

export function* load_leaderinfo_func(action) {
  const url_leaderinfo = 'http://127.0.0.1:8000/user/' + action.user_id + '/'
  const response_leaderinfo = yield call(fetch, url_leaderinfo, { method : 'GET' })

  if (response_leaderinfo.ok) {
    const leaderinfo = yield call([response_leaderinfo, response_leaderinfo.json])
    sessionStorage.setItem("leader.name", action.leader_name)                  //  리더 이름(닉네임) 로드 후 세션 스토리지에 저장
    sessionStorage.setItem("leader.email", action.leader_email)                //  리더 이메일 로드 후 세션 스토리지에 저장
    sessionStorage.setItem("leader.phone_number", action.leader_phone_number)  //  리더 폰 번호 로드 후 세션 스토리지에 저장
    yield put(actions.load_leaderinfo_success_action())                        //  리더 정보 로드 완료
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

export function* load_comments_func(action) {
  const url_comments = 'http://127.0.0.1:8000/comment/meeting/' + action.meeting_id + '/'
  const response_comments = yield call(fetch, url_comments, { method : 'GET' })

  if (response_comments.ok) {
    const comments = yield call([response_comments, response_comments.json])
    console.log('<Fetch comments of this meeting>')
    console.log(comments)
    sessionStorage.setItem("comments", JSON.stringify(comments))  //  댓글 목록 로드 후 세션 스토리지에 저장
    yield put(actions.load_comments_success_action())             //  댓글 목록 로드 완료
  }
  else
    alert('<Fail to fetch comments of this meeting>')
}

export function* add_comment_func(action) {
  const url_comment = 'http://127.0.0.1:8000/comment/'
  const info_comment = JSON.stringify({ meetingid: action.meeting_id, content: action.content})
  const response_comment = yield call(fetch, url_comment, {
      method: 'POST',
      headers: {
          'Authorization': `Basic ${action.hash}`,
          'Content-Type': 'application/json',
      },
      body: info_comment,
  })

  // 댓글 작성
  if (response_comment.ok) {
    console.log('Comment POST ok')
    const load_action = { type : 'LOAD_COMMENTS_ACTION', meeting_id : action.meeting_id }
    yield call(load_comments_func, load_action)  //  새로 댓글 리스트를 로드하여 리렌더링
  }
  else {
    alert('댓글을 입력해주세요.')
    console.log('Comment POST bad')
  }
}

export function* edit_comment_func(action) {
  const url_comment = 'http://127.0.0.1:8000/comment/' + action.comment_id + '/'
  const info_comment = JSON.stringify({ meetingid: action.meeting_id, writerid: action.writer_id, content: action.content })
  const response_comment = yield call(fetch, url_comment, {
      method: 'PUT',
      headers: {
          'Authorization': `Basic ${action.hash}`,
          'Content-Type': 'application/json',
      },
      body: info_comment,
  })

  // 댓글 수정
  if (response_comment.ok) {
    console.log('Comment PUT ok')
    const load_action = { type : 'LOAD_COMMENTS_ACTION', meeting_id : action.meeting_id }
    yield call(load_comments_func, load_action)  //  새로 댓글 리스트를 로드하여 리렌더링
  }
  else {
    alert('댓글을 입력해주세요.')
    console.log('Comment PUT bad')
  }
}

export function* delete_comment_func(action) {
  const url_comment = 'http://127.0.0.1:8000/comment/' + action.comment_id + '/'
  const response_comment = yield call(fetch, url_comment, {
      method: 'DELETE',
      headers: { 'Authorization': `Basic ${action.hash}` },
  })

  // 댓글 삭제
  if (response_comment.ok) {
    console.log('Comment DELETE ok')
    const load_action = { type : 'LOAD_COMMENTS_ACTION', meeting_id : action.meeting_id }
    yield call(load_comments_func, load_action)  //  새로 댓글 리스트를 로드하여 리렌더링
  }
  else
    console.log('Comment DELETE bad')
}

export function* penalty_func(action) {
  const report_info = action.report_info
  const url_confirm_report = 'http://127.0.0.1:8000/report/' + report_info.id + '/'
  console.log(report_info)
  const report_info_modified = JSON.stringify({ reason: report_info.reason, isHandled: action.flag, point: action.points, reporterid: report_info.reporterid, reportee: report_info.reportee, reporteeid: report_info.reporteeid})
  const response_report = yield call(fetch, url_confirm_report, {
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
  yield fork(watchLoadLeaderinfo)
  yield fork(watchLoadMemberinfo)
  yield fork(watchLoadComments)
  yield fork(watchAddComment)
  yield fork(watchEditComment)
  yield fork(watchDeleteComment)
  yield fork(watchPenalty)
}
