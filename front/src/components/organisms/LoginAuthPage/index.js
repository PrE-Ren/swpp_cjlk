import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from '../../atoms/Button'

const LoginAuth_Box = styled.div`
  border: 2px solid black;
  width: 800px;
  padding: 40px;
  position: absolute;
  top: 47%;
  left: 47%;
  transform: translate(-50%, -50%);
  text-align: center;
`

const Font_LoginAuth = styled.h1`
  font-size: 38px;
  font-weight: bold;
`

const Font_Info = styled.div`
  font-size: 20px;
  font-weight: bold;
  display: inline-block;
`

export const LoginAuthPage = ({ username, password, token,
                                send_email_click, send_phone_click, confirm_email_click, confirm_phone_click, login_click }) => {
  const hash = new Buffer(`${username}:${password}`).toString('base64')
  let email, phone_number
  let email_code, phone_code
  console.log("ㅎㅇ")
  console.log(username)
  console.log(password)

  if (token == null) {
    return (
        <LoginAuth_Box>
          <Font_LoginAuth>계정 인증</Font_LoginAuth>
          <Font_Info>
            SNU email &nbsp;&nbsp;
            <input style={{border: "1px solid"}} size="14" ref={node => {email=node;}}/>&nbsp;@ snu.ac.kr
          </Font_Info>
          <Button type = "submit" onClick={() => send_email_click(hash, email.value+'@snu.ac.kr')}>인증번호 전송</Button>&nbsp;
          <input style={{border: "1px solid"}} size="14" ref={node => {email_code=node;}}/>&nbsp;
          <Button type = "submit" onClick={() => confirm_email_click(hash, email.value+'@snu.ac.kr', email_code.value)}>확인</Button>
          <Font_Info>
            휴대폰 번호 &nbsp;&nbsp;
            <input style={{border: "1px solid"}} size="14" ref={node => {phone_number=node;}}/>&nbsp;
          </Font_Info>
          <Button type = "submit" onClick={() => send_phone_click(hash, phone_number.value)}>인증번호 전송</Button>&nbsp;
          <input style={{border: "1px solid"}} size="14" ref={node => {phone_code=node;}}/>&nbsp;
          <Button type = "submit" onClick={() => confirm_phone_click(hash, phone_number.value, phone_code.value)}>확인</Button>
          <p></p>
          <Button type = "submit" onClick={() => login_click(username, password)}>완료</Button>
          <Button type = "submit" onClick={() => window.location.href = "/login"}>돌아가기</Button>
        </LoginAuth_Box>
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

LoginAuthPage.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}
