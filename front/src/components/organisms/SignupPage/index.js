import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from '../../atoms/Button'

const Signup_Box = styled.div`
  border: 2px solid black;
  width: 600px;
  padding: 40px;
  position: absolute;
  top: 47%;
  left: 47%;
  transform: translate(-50%, -50%);
  text-align: center;
`

const Font_Signup = styled.h1`
  font-size: 38px;
  font-weight: bold;
`

const Font_Info = styled.div`
  font-size: 20px;
  font-weight: bold;
`

export const SignupPage = ({ token, signup_click }) => {
  let username, password, name, email

  if (token == null) {
    return (
        <Signup_Box>
          <Font_Signup>회원가입</Font_Signup>
          <Font_Info>
            <p></p>
            ID &nbsp;&nbsp;&nbsp;&nbsp;
            <input style={{border: "1px solid"}} size="23" ref={node => {username=node;}}/>
            <p></p>
            PW &nbsp;&nbsp;&nbsp;
            <input style={{border: "1px solid"}} size="23" ref={node => {password=node;}}/>
            <p></p>
            이름 &nbsp;&nbsp;
            <input style={{border: "1px solid"}} size="23" ref={node => {name=node;}}/>
            <p></p>
            SNU email &nbsp;&nbsp;
            <input style={{border: "1px solid"}} size="14" ref={node => {email=node;}}/>&nbsp;
            @ snu.ac.kr
          </Font_Info>
          <h4>&ensp;&ensp;메일 발송에 다소 시간이 걸릴 수 있으니 버튼을 누르고 기다려 주십시오.</h4>
          <Button type = "submit" onClick={() => signup_click(username.value, password.value, name.value, email.value)}>제출</Button>
          &ensp;&ensp;
          <Button type = "submit" onClick={() => window.location.href = "/login"}>돌아가기</Button>
        </Signup_Box>
    )
  }
  else {
    Object.defineProperty(window.location, 'href', {
      writable: true,
      value: '/'
    });
    return (<div></div>)
  }
}

SignupPage.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}
