import React from 'react'
import { PropTypes } from 'prop-types'
import styled, {css} from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from '../../atoms/Button'

const Login_Box = styled.div`
  border: 2px solid black;
  border-radius: 5px;
  width: 300px;
  padding: 40px;
  position: absolute;
  top: 47%;
  left: 47%;
  transform: translate(-50%, -50%);
  text-align: center;
`

const Font_Login = styled.h1`
  font-size: 38px;
  font-weight: bold;
`

const Font_IDPW = styled.div`
  font-size: 25px;
  font-weight: bold;
`

export const LoginPage = ({ token, login_click }) => {
  let username, password
  function auto_login(event){
    if(event.key == 'Enter'){
      login_click(username.value, password.value)
    }
  }
  if (token == null) {
    return (
        <Login_Box>
          <Font_Login>로그인</Font_Login>
          <Font_IDPW>
            <p></p>
            ID &ensp;&ensp;
            <input style={{border: "1px solid"}} ref={node => {username=node;}}/>
          </Font_IDPW>
          <Font_IDPW>
            PW &ensp;
            <input style={{border: "1px solid"}} type="password" onKeyPress = {auto_login} ref={node => {password=node;}} />
          </Font_IDPW>
          <br/>        
          <Button type = "submit" onClick={() => login_click(username.value, password.value)}>로그인</Button>
          &ensp;&ensp;&ensp;
          <Button type = "submit" onClick={() => window.location.href = "/signup"}>회원가입</Button>
        </Login_Box>
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

LoginPage.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}
