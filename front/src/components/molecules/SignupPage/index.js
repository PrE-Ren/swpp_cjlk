import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from '../../atoms/Button'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

const SignupPage = ({state, signupReq}) => {
  let userid,password,name,email

  if(state.mySNU_verification_token == null) {
    return (
        <div>
          <div>
            <h1>&ensp;회원가입</h1>
            <h2>&ensp;&ensp;ID</h2>
            &ensp;&ensp;<input ref={node=>{userid=node;}}/>
          </div>
          <div>
            <h2>&ensp;&ensp;PW</h2>
            &ensp;&ensp;<input ref={node=>{password=node;}}/>
          </div>
          <div>
            <h2>&ensp;&ensp;이름</h2>
            &ensp;&ensp;<input ref={node=>{name=node;}}/>
          </div>
          <div>
            <h2>&ensp;&ensp;SNU email</h2>
            &ensp;&ensp;<input ref={node=>{email=node;}}/>
          </div>
          <div>
            <h4>&ensp;&ensp;메일 발송에 다소 시간이 걸릴 수 있으니 버튼을 누르고 기다려 주십시오</h4>
          </div>
          &ensp;&ensp;<Button type = "submit" onClick={() =>signupReq(userid.value, password.value, name.value, email.value)}> 제출 </Button>
          &ensp;&ensp;<Button type = "submit" onClick={() =>window.location.href = "/login"}> 돌아가기 </Button>
        </div>
    )
  } 
  else{
    window.location.href = "/"
  } 
}

SignupPage.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}

export default SignupPage
