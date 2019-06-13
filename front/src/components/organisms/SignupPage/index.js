import React from 'react'
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react'

// username_store : 유저 아이디 (로그인 여부 확인을 위해 필요)
// mySNU_verification_token : 이메일 토큰 (인증 여부 확인을 위해 필요)
// phone_verification_token : 폰 토큰 (인증 여부 확인을 위해 필요)
// signup_click : 회원가입 버튼을 눌렀을 때 액션을 디스패치할 함수
export const SignupPage = ({ username_store, mySNU_verification_token, phone_verification_token, signup_click }) => {
  let username  //  입력한 유저 아이디
  let password  //  입력한 유저 패스워드
  let nickname  //  입력한 이름(닉네임)

  // 로그인 X : 정상 출력
  if (username_store == null) {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h1' color='teal' textAlign='center'> Sign up your account </Header>
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

  // 로그인 O, 인증 X : 인증 페이지로 리다이렉트
  else if (mySNU_verification_token == null || phone_verification_token == null) {
    Object.defineProperty(window.location, 'href', { writable: true, value: '/auth' });
    return (<div></div>)
  }

  // 로그인 O, 인증 O : 홈 페이지로 리다이렉트
  else {
    Object.defineProperty(window.location, 'href', { writable: true, value: '/' });
    return (<div></div>)
  }
}
