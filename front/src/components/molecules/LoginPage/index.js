import React from 'react'
import { PropTypes } from 'prop-types'
import styled, {css} from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from '../../atoms/Button'
import { SSL_OP_SINGLE_DH_USE } from 'constants';

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`
let rgb = [255, 240, 240]

let styles = {
  border: '3px solid darkslategray',
  margin: '10px',
  padding: '20px 20px 0px 10px',
  display: 'inline-block',
  backgroundColor: 'lavenderblush'
}

export const LoginPage = ({ state, loginReq }) => {
  let username, password
  if (state.mySNU_verification_token == null) {
    return (
        <div>
          <div>
            <h1>&ensp;로그인</h1>
            <h2>&ensp;&ensp;ID</h2>
            &ensp;&ensp;<input ref={node=>{username=node;}}/>
          </div>
          <div>
            <h2>&ensp;&ensp;PW</h2>
            &ensp;&ensp;<input ref={node=>{password=node;}}/>
          </div>
          <br/>
          &ensp;&ensp;<Button type = "submit" onClick={() => loginReq(username.value, password.value)}> 로그인 </Button>
          &ensp;&ensp;<Button type = "submit" onClick={() => window.location.href = "/signup"}> 회원가입 </Button>
        </div>
    )
  }
  else {
    window.location.href = "/"
    return <div></div>
  }
}

LoginPage.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}

export default LoginPage
