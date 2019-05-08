import React from 'react'
import { PropTypes } from 'prop-types'
import styled, {css} from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from '../../atoms/Button'


const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

const NewPage = ({ state, NewReq }) => {
  let kind, title, due, min_people, max_people, description
  console.log(state.username)
  console.log(state.password)
  if(state.mySNU_verification_token == null){
    window.location.href = "/"
    return (
      <div>
      </div>
    )
  }
  else{
    return (
      <div>
        유형: <input ref={node => {kind=node;}}/>
        <br />
        제목: <input ref={node => {title=node;}}/>
        <br />
        모집 마감 기한 <input type="datetime-local" ref={node => {due=node;}} />
        <br />
        최소 인원: <input ref={node => {min_people=node;}}/>
        <br />
        최대 인원: <input ref={node => {max_people=node;}}/>
        <br />
        내용: <textarea rows="30" cols="100" ref={node => {description=node;}} />
        <br />
        <Button type = "submit" onClick={() => NewReq(state.username,state.password,kind.value, state.username, title.value, due.value, min_people.value, max_people.value, description.value)}>제출</Button>
      </div>
    )
  }
}

NewPage.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}

export default NewPage
