import {take, put, call, fork, select, all} from 'redux-saga/effects'
import * as actions from './actions'

export function* reload_auth() {
  const pathname = window.location.pathname  //  "http://localhost:3000"의 뒷부분 URL

  // LoginAuth 페이지
  if (pathname == '/auth') {
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
      const response_user_data = yield call([response_user, response_user.json]);

      // 인증 O, 벌점 10점 이상 : 로그인 페이지로 리다이렉트
      if (response_user_data.point >= 10) {
        alert('벌점 10점 이상으로 접근이 불가합니다. 운영자에게 연락하십시오.')
        Object.defineProperty(window.location, 'href', { writable: true, value: '/login' });
      }

      // 인증 O : 홈 페이지로 리다이렉트
      else if (response_user.ok) {
        alert('이미 인증을 완료한 유저입니다.')
        Object.defineProperty(window.location, 'href', { writable: true, value: '/' });
      }

      // 인증 X
      else {
        const mySNU_verification_token = response_user_data.mySNU_verified ? response_user_data.mySNU_verification_token : null
        const phone_verification_token = response_user_data.phone_verified ? response_user_data.phone_verification_token : null
        const email = response_user_data.mySNU_verified ? response_user_data.email : null
        const phone_number = response_user_data.phone_verified ? response_user_data.phone_number : null
        yield put(actions.login_success_action(  //  <인증 페이지에서 이미 인증된 필드의 유무 판단을 위한 정보 스토어에 저장>
          username,                              //  유저 아이디 (로그인이 성공 시 설정해주기 때문에 불필요)
          password,                              //  유저 패스워드 (로그인 성공 시 설정해주기 때문에 불필요)
          mySNU_verification_token,              //  이메일 토큰 : 이걸 설정하는 게 진짜 목적 (그래야 활성화 혹은 비활성화 가능)
          phone_verification_token,              //  폰 토큰 : 이걸 설정하는 게 진짜 목적 (그래야 활성화 혹은 비활성화 가능)
          response_user_data.user_id,            //  고유값 : 꼭 필요 (설정 안 해주면 평생 고유값은 스토어에 저장이 안 됨)
          email,                                 //  이메일 : 꼭 필요 (설정 안 해주면 평생 이메일은 스토어에 저장 안 될 수도 있음)
          phone_number,                          //  폰 번호 : 꼭 필요  (설정 안 해주면 평생 폰 번호는 스토어에 저장 안 될 수도 있음)
          response_user_data.name,               //  이름(닉네임) : 꼭 필요 (설정 안 해주면 평생 이름는 스토어에 저장이 안 됨)
          response_user_data.point               //  벌점 : 꼭 필요 (설정 안 해주면 평생 벌점은 스토어에 저장이 안 됨)
        ))
      }
    }
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
      console.log(response_user_data)
      if(response_user_data.point >= 10)
      {
        alert('벌점 10점 이상으로 로그인이 불가하니 관리자에게 문의하십시오.')
      }
      else
      {
        yield put(actions.login_success_action(         //  <로그인 성공 : 유저 정보 스토어에 저장>
          username,                                     //  유저 아이디
          password,                                     //  유저 패스워드
          response_user_data.mySNU_verification_token,  //  이메일 토큰
          response_user_data.phone_verification_token,  //  폰 토큰
          response_user_data.user_id,                   //  고유값
          response_user_data.email,                     //  이메일
          response_user_data.phone_number,              //  폰 번호
          response_user_data.name,                      //  이름(닉네임)
          response_user_data.point                      //  벌점
        ))
        Object.defineProperty(window.location, 'href', { writable: true, value: '/' })
      }
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
console.log(info)
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

  if (response_email.ok) {  //  해당 유저의 이메일 토큰 필드 설정 (by BACK-END)
    alert('이메일로 인증번호가 전송되었습니다.')
    yield put(actions.require_email_action())
  }
  else
    alert('인증번호 전송 실패 : 운영자(010-4007-9493)에게 문의 바랍니다.')
}

export function* send_phone_func(action) {
  const url_send_phone = 'http://127.0.0.1:8000/send_phone/' + action.phone_number + '/'
  const response_phone = yield call(fetch, url_send_phone, { method: 'GET', headers: { 'Authorization' : `Basic ${action.hash}` } })

  if (response_phone.ok){  //  해당 유저의 폰 토큰 필드 설정 (by BACK-END)
    alert('휴대폰으로 인증번호가 전송되었습니다.')
    yield put(actions.require_phone_action())
  }
  else
    alert('인증번호 전송 실패 : 운영자(010-4007-9493)에게 문의 바랍니다.')
}

export function* confirm_email_func(action) {
  const url_send_email = 'http://127.0.0.1:8000/email_auth/' + action.email + '/' + action.email_code + '/'
  const response_email = yield call(fetch, url_send_email, { method: 'GET', headers: { 'Authorization' : `Basic ${action.hash}` } })

  if (response_email.ok) {  //  해당 유저의 이메일 및 이메일 인증 여부 필드 설정 (by BACK-END)
    alert('인증 완료')
    yield put(actions.success_email_action(action.email, action.email_code))  //  이메일 및 이메일 토큰 설정 (-> 인증 페이지 리렌더링)
  }
  else
    alert('인증번호가 틀렸습니다. : 문제가 있을 시 운영자(010-4007-9493)에게 문의 바랍니다.')
}

export function* confirm_phone_func(action) {
  const url_send_phone = 'http://127.0.0.1:8000/phone_auth/' + action.phone_number + '/' + action.phone_code + '/'
  const response_phone = yield call(fetch, url_send_phone, { method: 'GET', headers: { 'Authorization' : `Basic ${action.hash}` } })

  if (response_phone.ok) {  //  해당 유저의 폰 번호 및 폰 인증 여부 필드 설정 (by BACK-END)
    alert('인증 완료')
    yield put(actions.success_phone_action(action.phone_number, action.phone_code))  //  폰 번호 및 폰 토큰 설정 (-> 인증 페이지 리렌더링)
  }
  else
    alert('인증번호가 틀렸습니다. : 문제가 있을 시 운영자(010-4007-9493)에게 문의 바랍니다.')
}

export default function* () {
  yield fork(reload_auth)
  yield fork(watchLogin)
  yield fork(watchSignup)
  yield fork(watchSendEmail)
  yield fork(watchSendPhone)
  yield fork(watchConfirmEmail)
  yield fork(watchConfirmPhone)
}
