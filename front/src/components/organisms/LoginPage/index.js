import React from 'react'
import { PropTypes } from 'prop-types'
import styled, {css} from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from '../../atoms/Button'

const Fonts = styled.div`
  font-size: 25px;
  font-weight: bold;
`
const H1 = styled.h1`
  font-size: 38px;
  font-weight: bold;
`
const LoginBox = styled.div`
  width: 300px;
  padding: 40px;
  position: absolute;
  top: 47%;
  left: 47%;
  transform: translate(-50%,-50%);
  text-align: center;
`

export const LoginPage = ({ token, login_click }) => {
  let username, password
  if (token == null) {
    return (
        <LoginBox>
          <H1>로그인</H1>
          <Fonts>
            <p></p>
            ID &ensp;&ensp;
            <input ref={node=>{username=node;}}/>
          </Fonts>
          <Fonts>
            PW &ensp;
            <input type="password" ref={node=>{password=node;}}/>
          </Fonts>
          <br/>
          <Button type = "submit" onClick={() => login_click(username.value, password.value)}>로그인</Button>
          &ensp;&ensp;&ensp;<Button type = "submit" onClick={() => window.location.href = "/signup"}>회원가입</Button>
        </LoginBox>
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
