import React from 'react'
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react'

export const SignupPage = ({ username_store, mySNU_verification_token, phone_verification_token, signup_click }) => {
  let username, password, nickname
  // 1. 로그인 X (username == null) : 정상 출력
  // 2. 로그인 O, 인증 X (username != null && (mySNU_verification_token == null || phone_verification_token == null)): To 인증 페이지
  // 3. 로그인 O, 인증 O (else) : To Home
  if (username_store == null) {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h1' color='teal' textAlign='center'>
            Sign up your account
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' onChange={(e) => username = e.target.value}/>
              <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' onChange={(e) => password = e.target.value} type='password' />
              <Form.Input fluid icon='signup' iconPosition='left' placeholder='nickname' onChange={(e) => nickname = e.target.value} />
              <Button color='teal' fluid size='large' onClick={() => signup_click(username, password, nickname)}>회원가입</Button>
            </Segment>
          </Form>
          <Message><a href='/login'>돌아가기</a></Message>
        </Grid.Column>
      </Grid>
    )
  }
  else if (mySNU_verification_token == null || phone_verification_token == null) {
    Object.defineProperty(window.location, 'href', {
      writable: true,
      value: '/auth'
    });
    return (<div></div>)
  }
  else {
    Object.defineProperty(window.location, 'href', {
      writable: true,
      value: '/'
    });
    return (<div></div>)
  }
}
