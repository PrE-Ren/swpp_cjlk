import {take, put, call, fork, select} from 'redux-saga/effects'
import * as actions from './actions'

export function* watchSearch() {
  while(true) {
    const action = yield take(actions.SEARCH_ACTION)
    yield call(load_search_func, action)
  }
}

export function* watchLoadCaptcha() {
  while(true) {
    const action = yield take(actions.LOAD_CAPTCHA_ACTION)
    yield call(load_captcha_func, action)
  }
}

export function* watchConfirmCaptcha() {
  while(true) {
    const action = yield take(actions.CONFIRM_CAPTCHA_ACTION)
    yield call(confirm_captcha_func, action)
  }
}

export function* load_search_func(action) {
  const url_search = 'http://127.0.0.1:8000/shopsearch/' + action.query + '/'
  const response_search = yield call(fetch, url_search, { method : 'GET' })

  if (response_search.ok) {
    const search_list = yield call([response_search, response_search.json])
    sessionStorage.setItem("search_list", JSON.stringify(search_list.items))
    yield put(actions.search_success_action())  //  검색 정보 로드 완료
  }
  else
    alert('<Fail to fetch search information>')
}

export function* load_captcha_func(action) {
  const url_captcha = 'http://127.0.0.1:8000/captcha/'
  const response_captcha = yield call(fetch, url_captcha, { method : 'GET' })

  if (response_captcha.ok) {
    const captcha_info = yield call([response_captcha, response_captcha.json])
    sessionStorage.setItem("captcha_image", captcha_info.image)
    sessionStorage.setItem("captcha_key", captcha_info.key)
    yield put(actions.load_captcha_success_action())  //  캡챠 로드 완료
  }
  else {
    alert('캡챠 이미지 로드 실패')
  }
}

export function* confirm_captcha_func(action) {
  const url_confirm_captcha = 'http://127.0.0.1:8000/captcha_verify/' + action.key + '/' + action.value + '/'
  const response_confirm_captcha = yield call(fetch, url_confirm_captcha, { method : 'GET' })

  if (response_confirm_captcha.ok) {
    const result = (yield call([response_confirm_captcha, response_confirm_captcha.json])).result

    // 인증 성공 시 입력 란 비활성화를 위해 플래그를 바꿔줌
    if (result == true) {
      yield put(actions.confirm_captcha_success_action())
    }

    // 인증 실패 시 자동으로 새로고침이 되어야 함
    else if (result == false) {
      alert('인증에 실패했습니다. 다시 시도해주세요.')
      yield put(actions.prepare_load_captcha_action())
      yield put(actions.load_captcha_action())
    }
  }
  else {
    alert('캡챠 인증 에러')
  }
}

export default function* () {
  yield fork(watchSearch)
  yield fork(watchLoadCaptcha)
  yield fork(watchConfirmCaptcha)
}
