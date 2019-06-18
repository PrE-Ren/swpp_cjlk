import {take, put, call, fork, select, all} from 'redux-saga/effects'
import * as actions from './actions'

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

export function* new_func(action) {
  const url_meeting = 'http://18.223.163.91:8000/meeting/'
  const url_participate = 'http://18.223.163.91:8000/participate/'
  const formData = new FormData()

  const get_current_datetime = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)
    const day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate()
    const hour = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours()
    const min = date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes()
    const datetime = year + "-" + month + "-" + day + "T" + hour + ":" + min
    return datetime
  }

  if (action.meeting_info.title == undefined || action.meeting_info.title == '') alert('제목을 입력해주세요')
  else if (action.meeting_info.kind == undefined) alert('모임 유형을 설정해주세요')
  else if (action.meeting_info.due == undefined || action.meeting_info.due == '') alert('시간을 입력해주세요')
  else if (action.meeting_info.due < get_current_datetime() ) alert('현재시간보다 빠르면 안됩니다.')
  else if (action.meeting_info.min_people == undefined || action.meeting_info.min_people == '') alert('최소인원을 입력해주세요')
  else if (action.meeting_info.max_people == undefined || action.meeting_info.max_people == '') alert('최대인원을 입력해주세요')
  else if (action.meeting_info.description == undefined || action.meeting_info.description == '' ) alert('본문을 입력해주세요')
  else {
    formData.append('title', action.meeting_info.title)               //  제목 (직접 입력)
    formData.append('due', action.meeting_info.due)                   //  마감 기한 (직접 입력)
    formData.append('min_people', action.meeting_info.min_people)     //  최소 인원 (직접 입력)
    formData.append('max_people', action.meeting_info.max_people)     //  최대 인원 (직접 입력)
    formData.append('description', action.meeting_info.description)   //  본문 (직접 입력)
    formData.append('state', 0)                                       //  상태 (자동 입력)
    formData.append('kind', action.meeting_info.kind)                 //  유형 (직접 입력)
    formData.append('latitude', sessionStorage.getItem("lat"))        //  위도 (클릭 입력) : 세션 스토리지. 클릭 안 하면 기본 위도 값
    formData.append('longitude', sessionStorage.getItem("lng"))       //  경도 (클릭 입력) : 세션 스토리지. 클릭 안 하면 기본 경도 값

    // 사진 (직접 입력) : 입력 안 하면 null
    if (action.meeting_info.picture !== undefined) formData.append('picture', action.meeting_info.picture, action.meeting_info.picture.name);
    else                                           formData.append('picture', null, null)

    // 카카오 링크 (직접 입력) : 입력 안 하면 빈 문자열
    if (action.meeting_info.kakao_link !== undefined) formData.append('kakao_link', action.meeting_info.kakao_link);
    else                                              formData.append('kakao_link', "")

    // Meeting 모델 POST
    const response_meeting = yield call(fetch, url_meeting, {
        method: 'POST',
        headers: { 'Authorization': `Basic ${action.hash}` },
        body: formData,
    })

    const response_meeting_data = yield call([response_meeting, response_meeting.json])  //  POST된 Meeting 객체의 정보

    if (response_meeting.ok) {
      console.log('Meeting POST ok')
      const meeting_id = response_meeting_data.id  //  POST된 Meeting 모델의 고유값
      const info_participate = JSON.stringify({ user_id: action.user_id, meeting_id: meeting_id })  //  POST할 Participate 객체의 정보

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
}

export function* modify_func(action) {
  const meeting_info = JSON.parse(sessionStorage.getItem("meeting_info"))
  const url_meeting = `http://18.223.163.91:8000/meeting/${meeting_info.id}/`
  const formData = new FormData()

  if (action.meeting_info.title == undefined || action.meeting_info.title == '') alert('제목을 입력해주세요')
  else if (action.meeting_info.description == undefined || action.meeting_info.description == '' ) alert('본문을 입력해주세요')
  else{
    formData.append('title', action.meeting_info.title)              //  제목 (새로 입력) : 안 바꾸면 기존 값
    formData.append('due', action.meeting_info.due)                  //  마감 기한 (기존 값)
    formData.append('min_people', action.meeting_info.min_people)    //  최소 인원 (기존 값)
    formData.append('max_people', action.meeting_info.max_people)    //  최대 인원 (기존 값)
    formData.append('description', action.meeting_info.description)  //  본문 (새로 입력) : 안 바꾸면 기존 값
    formData.append('state', action.meeting_info.state)              //  상태 (기존 값)
    formData.append('kind', action.meeting_info.kind)                //  유형 (기존 값)
    formData.append('latitude', sessionStorage.getItem("lat"))       //  위도 (새로 입력) : 안 바꾸면 기존 값
    formData.append('longitude', sessionStorage.getItem("lng"))      //  경도 (새로 입력) : 안 바꾸면 기존 값
    formData.append('kakao_link', action.meeting_info.kakao_link)    //  카카오 링크 (직접 입력) : 안 바꾸면 기존 값

    // 사진 (새로 입력) : 입력 안 하면 null 값
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
}

export function* change_meeting_state_func(action) {
  let meeting_id = action.meeting_info.id
  const url_meeting = `http://18.223.163.91:8000/meeting/${meeting_id}/`
  const formData = new FormData()

  formData.append('title', action.meeting_info.title)              //  제목 (기존값)
  formData.append('due', action.meeting_info.due)                  //  마감 기한 (기존 값)
  formData.append('min_people', action.meeting_info.min_people)    //  최소 인원 (기존 값)
  formData.append('max_people', action.meeting_info.max_people)    //  최대 인원 (기존 값)
  formData.append('description', action.meeting_info.description)  //  본문 (기존 값)
  formData.append('state', action.new_state)                       //  새로운 상태 값
  formData.append('kind', action.meeting_info.kind)                //  유형 (기존 값)
  formData.append('kakao_link', action.meeting_info.kakao_link)    //  카카오 링크 (기존 값)

  // 사진 (기존 값)
  if (action.meeting_info.picture !== null) formData.append('picture', action.meeting_info.picture, action.meeting_info.picture.name)
  else                                      formData.append('picture', null, null)

  // Meeting 모델 PUT
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
  const meeting_info = JSON.stringify(action.meeting_info)  //  수정하려는 미팅 정보를
  sessionStorage.setItem("meeting_info", meeting_info)      //  세션 스토리지에 저장하고
  window.location.href = "/new"                             //  New 페이지로 리다이렉트
}

export default function* () {
  yield fork(watchNew)
  yield fork(watchModify)
  yield fork(watchChangeMeetingState)
  yield fork(watchChangeMeetingInfo)
}
