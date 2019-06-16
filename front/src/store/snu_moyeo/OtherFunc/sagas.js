import {take, put, call, fork, select} from 'redux-saga/effects'
import * as actions from './actions'

export function* watchSearch() {
  while(true) {
    const action = yield take(actions.SEARCH_ACTION)
    yield call(load_search_func, action)
  }
}

export function* load_search_func(action) {
  const url_searchinfo = 'http://127.0.0.1:8000/shopsearch/' + action.query + '/'
  const response_searchinfo = yield call(fetch, url_searchinfo, { method : 'GET' })

  if (response_searchinfo.ok) {
    const searchinfo = yield call([response_searchinfo, response_searchinfo.json])
    sessionStorage.setItem("searchlist", JSON.stringify(searchinfo.items))              
    console.log(searchinfo)
    yield put(actions.search_success_action())                     //  검색 정보 로드 완료
  }
  else
    alert('<Fail to fetch search information>')
}

export default function* () {
  yield fork(watchSearch)
}
