import React from 'react'
import Map from '../../../containers/Map'
import { Form  } from 'semantic-ui-react'

// 모임 유형 상수
const options = [
  { key: 0, text: '음식배달', value: 0 },
  { key: 1, text: '택시합승', value: 1 },
  { key: 2, text: '공동구매', value: 2 },
  { key: 3, text: '스터디', value: 3 },
  { key: 4, text: '운동', value: 4 },
  { key: 5, text: '미팅', value: 5 },
]

// Form 형식에 맞게 현재 시간 얻기
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

// 날짜를 Form 형식에 맞게 수정
const parse_datetime = (date) => {
  const year = date.split("-")[0]
  const month = date.split("-")[1]
  let temp = date.split("-")[2]  //  시간 때문에 임시로 쓴 변수
  const day = temp.split("T")[0]
  temp = temp.split("T")[1]
  const hour = temp.split(":")[0]
  const min = temp.split(":")[1]
  const datetime = year + "-" + month + "-" + day + "T" + hour + ":" + min
  return datetime
}

// 입력할 제목, 마감 기한, 최소 인원, 최대 인원, 본문, 유형, 사진
let title, due, min_people, max_people, kakao_link, description, kind, picture

// 위의 변수와 각 입력 Form을 바운드
const handle_title = (e) => { title = e.target.value }
const handle_due = (e, { value }) => { due = value }
const handle_min_people = (e) => { min_people = e.target.value }
const handle_max_people = (e) => { max_people = e.target.value }
const handle_kakao_link = (e) => { kakao_link = e.target.value }
const handle_description = (e) => { description = e.target.value }
const handle_picture = (e) => { picture = e.target.files[0] }
const handle_kind = (e, { value }) => { kind = value }

// username : 유저 아이디 (해시값 획득을 위해 필요)
// password : 유저 패스워드 (해시값 획득을 위해 필요)
// user_id : 유저 고유값 (모임 생성 시 Participate 모델의 POST를 위해 필요)
// new_click : 생성 완료 버튼을 눌렀을 때 액션을 디스패치할 함수 (Meeting 모델 POST)
// modify_click : 수정 완료 버튼을 눌렀을 때 액션을 디스패치할 함수 (Meeting 모델 PUT)
export const MeetingCreate = ({ username, password, user_id, new_click, modify_click }) => {
  const hash = new Buffer(`${username}:${password}`).toString('base64')    //  유저의 해시값
  const meeting_info = JSON.parse(sessionStorage.getItem('meeting_info'))  //  세션 스토리지에 저장된 미팅 정보

  // New (새 모임 만들기 버튼을 누르면 세션 스토리지에 저장된 미팅 정보가 삭제됨)
  if (meeting_info == null) {
    const datetime = get_current_datetime()  //  현재 시간
    return (
      <Form>
        <Form.Input fluid label='제목' placeholder='Title' onChange={handle_title}/>
        <Form.Group widths='equal'>
          <Form.Select fluid label='모임 유형' options={options} placeholder='Meeting Type' width={6} onChange={handle_kind} />
          <Form.Input fluid label='모집 마감 기한' type="datetime-local" defaultValue={datetime} width={6} onChange={handle_due} />
          <Form.Input fluid label='최소인원' placeholder='2' type="number" width={2} onChange={handle_min_people} />
          <Form.Input fluid label='최대인원' placeholder='2' type="number" width={2} onChange={handle_max_people} />
        </Form.Group>
        <Form.Input fluid label='오픈채팅방 링크' placeholder='https://open.kakao.com/' onChange={handle_kakao_link} />
        <Form.Input fluid label='사진' type="file" width={6} onChange={handle_picture} accept="image/*" />
        <div><Map meeting_info = {null} write = {true} /></div>
        <Form.TextArea label='내용' placeholder='About this meeting...' onChange={handle_description} />
        <Form.Button onClick={() => new_click(hash, user_id, {
          title: title,              //  제목 (입력)
          due: due,                  //  마감 기한 (입력)
          min_people: min_people,    //  최소 인원 (입력)
          max_people: max_people,    //  최대 인원 (입력)
          description: description,  //  본문 (입력)
          kind: kind,                //  유형 (입력)
          leader: username,          //  주최자 아이디 (자동 입력)
          picture: picture           //  사진 (입력)
        })}> 완료 </Form.Button>
      </Form>
    )
  }

  // Modify (수정 버튼을 누르면 세션 스토리지에 해당 미팅 정보가 저장됨)
  else {
    const datetime = parse_datetime(meeting_info.due)  //  기존 마감 기한
    return (
      <Form>
        <Form.Input fluid label='제목' placeholder='Title' defaultValue={meeting_info.title} onChange={handle_title}/>
        <Form.Group widths='equal'>
          <Form.Select disabled fluid label='모임 유형' options={options} placeholder='Meeting Type' width={6} defaultValue={meeting_info.kind} />
          <Form.Input disabled fluid label='모집 마감 기한' type="datetime-local" defaultValue={datetime} width={6} />
          <Form.Input disabled fluid label='최소인원' placeholder='2' type="number" width={2} defaultValue={meeting_info.min_people}  />
          <Form.Input disabled fluid label='최대인원' placeholder='2' type="number" width={2} defaultValue={meeting_info.max_people}  />
        </Form.Group>
        <Form.Input fluid label='사진' type="file" width={6} onChange={handle_picture} accept="image/*" />
        <div><Map meeting_info = {meeting_info} write = {true} /></div>
        <Form.TextArea label='내용' placeholder='About this meeting...' defaultValue={meeting_info.description} onChange={handle_description} />
        <Form.Button onClick={() => modify_click(hash, {
          title: (title !== undefined) ? title : meeting_info.title,                          // 수정 가능 (안 바꿨으면 기존 값 사용)
          due: meeting_info.due,                                                              // 수정 불가능 (기존 값 사용)
          min_people: meeting_info.min_people,                                                // 수정 불가능 (기존 값 사용)
          max_people: meeting_info.min_people,                                                // 수정 불가능 (기존 값 사용)
          description: (description !== undefined) ? description : meeting_info.description,  // 수정 가능 (안 바꿨으면 기존 값 사용)
          kind: meeting_info.kind,                                                            // 수정 불가능 (기존 값 사용)
          leader: username,                                                                   // 수정 불가능 (기존 값 사용)
          picture: picture,                                                                   // 수정 가능 (새로 지정 안 하면 undefined 넘어감)
          state: meeting_info.state                                                           // 수정 불가능 (기존 값 사용)
        })}> 수정 </Form.Button>
      </Form>
    )
  }
}
