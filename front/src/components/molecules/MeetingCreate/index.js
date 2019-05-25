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

export const MeetingCreate = ({ username, password, user_id, new_click, modify_click }) => {
  let kind, title, due, min_people, max_people, description, picture
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)
  let day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate()
  let hour = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours()
  let min = date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes()
  let datetime = year + "-" + month + "-" + day + "T" + hour + ":" + min
  let meeting_info = localStorage.getItem('meeting_info')
  meeting_info = JSON.parse(meeting_info)
  if(meeting_info == null)
  {
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
          최소 인원 : <input type="number" placeholder="2" ref={node => {min_people = node;}} style={{width:'45px'}} />&ensp;&ensp;
          최대 인원 : <input type="number" ref={node => {max_people = node;}} style={{width:'45px'}} /><br />
          사진(선택) : <input type="file" onChange={(e)=> picture = e.target.files[0]} accept="image/*" /><br />
          내용<br /><textarea placeholder = "내용을 입력하세요." rows="20" cols="80" ref={node => {description=node;}} />
        </Info_Box>
        <Complete_Css>
          <Button type = "submit" onClick={() => new_click(username, password, user_id, title.value, due.value, min_people.value, max_people.value, description.value, kind.value, username, picture)}>완료</Button>
        </Complete_Css>
      </MeetingCreate_Box>
    )
  }
  else {
    date = meeting_info.due
    year = date.split("-")[0]
    month = date.split("-")[1]
    let temp = date.split("-")[2] //시간 때문에 임시로 쓴 변수
    day = temp.split("T")[0]
    temp = temp.split("T")[1]
    hour = temp.split(":")[0]
    min = temp.split(":")[1]
    datetime = year + "-" + month + "-" + day + "T" + hour + ":" + min
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
          최소 인원 : <input type="number" defaultValue={meeting_info.min_people} ref={node => {min_people = node;}} style={{width:'45px'}} />&ensp;&ensp;
          최대 인원 : <input type="number" defaultValue={meeting_info.max_people} ref={node => {max_people = node;}} style={{width:'45px'}} /><br />
          사진(선택) : <input type="file" onChange={(e)=> picture = e.target.files[0]} accept="image/*" /><br />
          내용<br /><textarea defaultValue={meeting_info.description} rows="20" cols="80" ref={node => {description=node;}} />
        </Info_Box>
        <Complete_Css>
          <Button type = "submit" onClick={() => modify_click(username, password, user_id, title.value, due.value, min_people.value, max_people.value, description.value, kind.value, username, picture)}>수정</Button>
        </Complete_Css>
      </MeetingCreate_Box>
    )
  }
}

MeetingCreate.propTypes = {
  reverse: PropTypes.bool,
}
