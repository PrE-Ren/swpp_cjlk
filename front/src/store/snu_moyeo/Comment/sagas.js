import {take, put, call, fork, select, all} from 'redux-saga/effects'
import * as actions from './actions'

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

export function* load_comments_func(action) {
  const url_comments = 'http://127.0.0.1:8000/comment/meeting/' + action.meeting_id + '/'
  const response_comments = yield call(fetch, url_comments, { method : 'GET' })

  if (response_comments.ok) {
    const comments = yield call([response_comments, response_comments.json])
    console.log('<Fetch comments of this meeting>')
    console.log(comments)
    sessionStorage.setItem("comments", JSON.stringify(comments))  //  댓글 목록 로드 후 세션 스토리지에 저장
    yield put(actions.load_comments_success_action(comments))     //  댓글 목록 로드 완료 (댓글 목록까지 스토어에 저장하여 CommentList 리렌더링)
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
    if(action.content.length > 400)
      alert('400자 이내로 입력해주세요.')
    else
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
    if(action.content.length > 400)
      alert('400자 이내로 입력해주세요.')
    else
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

export default function* () {
  yield fork(watchLoadComments)
  yield fork(watchAddComment)
  yield fork(watchEditComment)
  yield fork(watchDeleteComment)
}
