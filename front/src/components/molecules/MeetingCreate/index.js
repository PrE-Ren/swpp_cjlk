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

export const MeetingCreate = ({ username, password, user_id, new_click }) => {
  let kind, title, due, min_people, max_people, description, picture
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
        모집 마감 기한 : <input type="datetime-local" defaultValue="2019-05-01T13:00" ref={node => {due=node;}} /><br />
        제목 : <input placeholder = "제목을 입력하세요." style={{width:'350px', height:'20px'}} ref={node => {title=node;}} /><br />
        최소 인원 : <input type="number" defaultValue="2" ref={node => {min_people = node;}} style={{width:'45px'}} />&ensp;&ensp;
        최대 인원 : <input type="number" defaultValue="2" ref={node => {max_people = node;}} style={{width:'45px'}} /><br />
        사진(선택) : <input type="file" onChange={(e)=> picture = e.target.files[0]} accept="image/*" /><br />
        내용<br /><textarea placeholder = "내용을 입력하세요." rows="20" cols="80" ref={node => {description=node;}} />
      </Info_Box>
      <Complete_Css>
        <Button type = "submit" onClick={() => new_click(username, password, user_id, title.value, due.value, min_people.value, max_people.value, description.value, kind.value, username, picture)}>완료</Button>
      </Complete_Css>
    </MeetingCreate_Box>
  )
}

MeetingCreate.propTypes = {
  reverse: PropTypes.bool,
}
