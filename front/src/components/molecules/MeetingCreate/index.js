import React from 'react'
import { PropTypes } from 'prop-types'
import styled, {css} from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from '../../atoms/Button'

const MeetingCreate_Box = styled.div`
  float: left;
  width: 700px;
  margin-left: 10%;
  padding-left: 20px;
  padding-top: 10px;
  display: inline-block;
  border: 2px solid black;
  border-radius: 5px;
`

const Info_Box = styled.div`
  font-size: 1.2em;
  font-weight: 600;
`

const Complete_Css = styled.div`
  float: right;
  margin-right: 5px;
  margin-bottom: 5px;
`

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

export const MeetingCreate = ({ username, password, user_id, new_click, modify_click }) => {
  const hash = new Buffer(`${username}:${password}`).toString('base64')
  const meeting_info = JSON.parse(localStorage.getItem('meeting_info'))
  let title, due, min_people, max_people, description, kind, picture

  // New
  if (meeting_info == null) {
    const datetime = get_current_datetime()
    return (
      <MeetingCreate_Box>
        <Info_Box>
          유형 :&ensp;
          <select ref={node => {kind=node;}} style={{width:'85px'}, {height:'30px'}}>
            <option value="0">음식배달</option>
            <option value="1">택시합승</option>
            <option value="2">공동구매</option>
            <option value="3">스터디</option>
            <option value="4">운동</option>
            <option value="5">미팅</option>
          </select><br />
          모집 마감 기한 : <input type="datetime-local" defaultValue={datetime} ref={node => {due=node;}} /><br />
          제목 : <input placeholder = "제목을 입력하세요." style={{width:'350px', height:'20px'}} ref={node => {title=node;}} /><br />
          최소 인원 : <input type="number" placeholder="2" ref={node => {min_people=node;}} style={{width:'45px'}} />&ensp;&ensp;
          최대 인원 : <input type="number" ref={node => {max_people=node;}} style={{width:'45px'}} /><br />
          사진(선택) : <input type="file" onChange={(e) => picture = e.target.files[0]} accept="image/*" /><br />
          내용<br /><textarea placeholder = "내용을 입력하세요." rows="20" cols="80" ref={node => {description=node;}} />
        </Info_Box>
        <Complete_Css>
          <Button type = "submit" onClick={() => new_click(hash, user_id, {
            title: title.value,
            due: due.value,
            min_people: min_people.value,
            max_people: max_people.value,
            description: description.value,
            kind: kind.value,
            leader: username,
            picture: picture
          })}>완료</Button>
        </Complete_Css>
      </MeetingCreate_Box>
    )
  }

  // Modify
  else {
    const datetime = parse_datetime(meeting_info.due)
    return (
      <MeetingCreate_Box>
        <Info_Box>
          유형 :&ensp;
          <select ref={node => {kind=node;}} style={{width:'85px'}, {height:'30px'}}>
            <option value="0">음식배달</option>
            <option value="1">택시합승</option>
            <option value="2">공동구매</option>
            <option value="3">스터디</option>
            <option value="4">운동</option>
            <option value="5">미팅</option>
          </select><br />
          모집 마감 기한 : <input type="datetime-local" defaultValue={datetime} ref={node => {due=node;}} /><br />
          제목 : <input placeholder = "제목을 입력하세요." defaultValue={meeting_info.title} style={{width:'350px', height:'20px'}} ref={node => {title=node;}} /><br />
          최소 인원 : <input type="number" defaultValue={meeting_info.min_people} ref={node => {min_people=node;}} style={{width:'45px'}} />&ensp;&ensp;
          최대 인원 : <input type="number" defaultValue={meeting_info.max_people} ref={node => {max_people=node;}} style={{width:'45px'}} /><br />
          사진(선택) : <input type="file" onChange={(e) => picture = e.target.files[0]} accept="image/*" /><br />
          내용<br /><textarea defaultValue={meeting_info.description} rows="20" cols="80" ref={node => {description=node;}} />
        </Info_Box>
        <Complete_Css>
          <Button type = "submit" onClick={() => modify_click(hash, user_id, {
            title: title.value,
            due: due.value,
            min_people: min_people.value,
            max_people: max_people.value,
            description: description.value,
            kind: kind.value,
            leader: username,
            picture: picture,
            state: meeting_info.state
          })}>수정</Button>
        </Complete_Css>
      </MeetingCreate_Box>
    )
  }
}

MeetingCreate.propTypes = {
  reverse: PropTypes.bool,
}
