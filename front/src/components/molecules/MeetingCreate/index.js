import React from 'react'
import { PropTypes } from 'prop-types'
import styled, {css} from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from '../../atoms/Button'

const MeetingCreateCss = styled.div`
  position: relative;
  top: 100px;
  left: 13%;
  width: 700px;
  margin-left: 120px;
  border: 2px solid black;
  font-size: 1.2em;
  font-weight: 600;
  line-height: 180%
`

const ButtonCss = styled.div`
  float: right;
  margin-top: 280px;
  margin-right: 5px;
  margin-bottom: 5px;
`

export const MeetingCreate = ({ username, password, user_id, new_click }) => {
  let kind, title, due, min_people, max_people, description, picture
  return (
    <MeetingCreateCss>
      유형 :&ensp;
      <select ref={node => {kind=node;}} style={{width:'85px'},{height:'30px'}}>
        <option value="0">음식배달</option>
        <option value="1">택시합승</option>
        <option value="2">공동구매</option>
        <option value="3">스터디</option>
        <option value="4">운동</option>
        <option value="5">미팅</option>
        <option value="6">기타</option>
      </select>
      <br />
      모집 마감 기한 : <input type="datetime-local" ref={node => {due=node;}} />
      <br />
      제목 : <input placeholder = "제목을 입력하세요" style={{width:'350px', height:'20px'}} ref={node => {title=node;}} />
      <br />
      최소 인원 :&ensp;
      <input type="number" ref={node => {min_people = node;}} style={{width:'45px'}}/>
      &ensp;&ensp;최대 인원 :&ensp;
      <input type="number" ref={node => {max_people = node;}} style={{width:'45px'}} />
      <br />
      사진(선택) :&ensp;
      <input type="file" onChange={(e)=> picture = e.target.files[0]} accept="image/*" />
      <div>내용 :</div>
      <textarea placeholder = "내용을 입력하세요." rows="20" cols="80" ref={node => {description=node;}} />
      <ButtonCss>
        <Button type = "submit" onClick={() => new_click(username, password, user_id, title.value, due.value, min_people.value, max_people.value, description.value, kind.value, username, picture)}>제출</Button>
      </ButtonCss>
    </MeetingCreateCss>
  )
}

MeetingCreate.propTypes = {
  reverse: PropTypes.bool,
}
