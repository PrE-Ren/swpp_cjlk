import React from 'react'
import { PropTypes } from 'prop-types'
import styled, {css} from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from '../../atoms/Button'
import { SSL_OP_SINGLE_DH_USE } from 'constants';

const Fonts = styled.div`
  font-size: 25px;
  font-weight: bold;
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
          <Fonts>
            <p></p>
            <p></p>
            &ensp;&ensp;ID &ensp;&ensp;
            <input ref={node=>{username=node;}}/>
          </Fonts>
          <Fonts>
            &ensp;&ensp;PW &ensp;
            <input ref={node=>{password=node;}}/>
          </Fonts>
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
