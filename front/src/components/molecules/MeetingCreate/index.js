import React from 'react'
import { PropTypes } from 'prop-types'
import { Container, Form, Ref } from 'semantic-ui-react'

const options = [
  { key: 0, text: '음식배달', value: 0 },
  { key: 1, text: '택시합승', value: 1 },
  { key: 2, text: '공동구매', value: 2 },
  { key: 3, text: '스터디', value: 3 },
  { key: 4, text: '운동', value: 4 },
  { key: 5, text: '미팅', value: 5 },
]

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

const parse_datetime = (date) => {
  const year = date.split("-")[0]
  const month = date.split("-")[1]
  let temp = date.split("-")[2] // 시간 때문에 임시로 쓴 변수
  const day = temp.split("T")[0]
  temp = temp.split("T")[1]
  const hour = temp.split(":")[0]
  const min = temp.split(":")[1]
  const datetime = year + "-" + month + "-" + day + "T" + hour + ":" + min
  return datetime
}

let title, due, min_people, max_people, description, kind, picture

const handle_title = (e) => { title = e.target.value }
const handle_due = (e, { value }) => { due = value }
const handle_min_people = (e) => { min_people = e.target.value }
const handle_max_people = (e) => { max_people = e.target.value }
const handle_description = (e) => { description = e.target.value }
const handle_picture = (e) => { picture = e.target.files[0] }
const handle_kind = (e, { value }) => { kind = value }

export const MeetingCreate = ({ username, password, user_id, new_click, modify_click }) => {
  const hash = new Buffer(`${username}:${password}`).toString('base64')
  const meeting_info = JSON.parse(localStorage.getItem('meeting_info'))

  // New
  if (meeting_info == null) {
    const datetime = get_current_datetime()
    return (
      <Form>
        <Form.Input fluid label='제목' placeholder='Title' onChange={handle_title}/>
        <Form.Group widths='equal'>
          <Form.Select fluid label='모임 유형' options={options} placeholder='Meeting Type' width={6} onChange={handle_kind} />
          <Form.Input fluid label='모집 마감 기한' type="datetime-local" defaultValue={datetime} width={6} onChange={handle_due} />
          <Form.Input fluid label='최소인원' placeholder='2' type="number" width={2} onChange={handle_min_people} />
          <Form.Input fluid label='최대인원' placeholder='2' type="number" width={2} onChange={handle_max_people} />
        </Form.Group>
        <Form.Input fluid label='사진' type="file" width={6} onChange={handle_picture} accept="image/*" />
        <Form.TextArea label='내용' placeholder='About this meeting...' onChange={handle_description} />
        <Form.Button onClick={() => new_click(hash, user_id, {
          title: title,
          due: due,
          min_people: min_people,
          max_people: max_people,
          description: description,
          kind: kind,
          leader: username,
          picture: picture
        })}>완료</Form.Button>
      </Form>
    )
  }

  // Modify
  else {
    const datetime = parse_datetime(meeting_info.due)
    return (
      <Form>
        <Form.Input fluid label='제목' placeholder='Title' defaultValue={meeting_info.title} onChange={handle_title}/>
        <Form.Group widths='equal'>
          <Form.Select fluid label='모임 유형' options={options} placeholder='Meeting Type' width={6} defaultValue={meeting_info.kind} onChange={handle_kind} />
          <Form.Input fluid label='모집 마감 기한' type="datetime-local" defaultValue={datetime} width={6} onChange={handle_due} />
          <Form.Input fluid label='최소인원' placeholder='2' type="number" width={2} defaultValue={meeting_info.min_people} onChange={handle_min_people} />
          <Form.Input fluid label='최대인원' placeholder='2' type="number" width={2} defaultValue={meeting_info.max_people} onChange={handle_max_people} />
        </Form.Group>
        <Form.Input fluid label='사진' type="file" width={6} onChange={handle_picture} accept="image/*" />
        <Form.TextArea label='내용' placeholder='About this meeting...' defaultValue={meeting_info.description} onChange={handle_description} />
        <Form.Button onClick={() => modify_click(hash, user_id, {
          title: (title !== undefined) ? title : meeting_info.title,
          due: (due !== undefined) ? due : meeting_info.due,
          min_people: (min_people !== undefined) ? min_people : meeting_info.min_people,
          max_people: (max_people !== undefined) ? max_people : meeting_info.min_people,
          description: (description !== undefined) ? description : meeting_info.description,
          kind: (kind !== undefined) ? kind : meeting_info.kind,
          leader: username,
          picture: picture,
          state: meeting_info.state
        })}>수정</Form.Button>
      </Form>
    )
  }
}

MeetingCreate.propTypes = {
  reverse: PropTypes.bool,
}
