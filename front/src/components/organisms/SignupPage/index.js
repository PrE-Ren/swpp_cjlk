import React from 'react'
import Captcha from '../../../containers/Captcha'
import { Button, Form, Grid, Header, Segment, Message, Icon } from 'semantic-ui-react'
import styled from 'styled-components'

const Font_Red = styled.div`
  color: red;
  font-size: 13px;
  padding-bottom: 10px;
  padding-left: 5px;
  text-align: left;
`

const Font_Green = styled.div`
  color: skyblue;
  font-size: 13px;
  padding-bottom: 10px;
  padding-left: 5px;
  text-align: left;
`

// 입력한 내용이 올바른 형식인지 체크
const is_valid_form = (username, password, password_confirm, nickname, is_captcha_verified) => {
  const pattern1 = /[0-9]/;
  const pattern2 = /[a-zA-Z]/;
  const pattern3 = /[~!@\#$%<>^&*]/;
  const pw_msg = "";

  if (username.length == 0) {
    alert("아이디를 입력해주세요.")
    return false
  }
  if (password.length == 0) {
    alert("패스워드를 입력해주세요.")
    return false
  }
  else if (password != password_confirm) {
    alert("패스워드를 확인해주세요.")
    return false
  }
  if (!pattern1.test(password) ||
      !pattern2.test(password) ||
      !pattern3.test(password) ||
      password.length < 8 ||
      password.length > 50) {
    alert("패스워드는 영문+숫자+특수기호 8자리 이상으로 구성해야 합니다.");
    return false;
  }
  if (password.indexOf(username) > -1) {
    alert("비밀번호는 아이디를 포함할 수 없습니다.")
    return false
  }
  if (nickname.length == 0) {
    alert("이름(닉네임)을 입력해주세요.")
    return false
  }
  if (is_captcha_verified == false) {
    alert("보안문자 인증을 완료해주세요.")
    return false
  }
  return true
}

// username_store : 유저 아이디 (로그인 여부 확인을 위해 필요)
// mySNU_verification_token : 이메일 토큰 (인증 여부 확인을 위해 필요)
// phone_verification_token : 폰 토큰 (인증 여부 확인을 위해 필요)
// is_captcha_verified : 보안문자 인증 완료 여부
// signup_click : 회원가입 버튼을 눌렀을 때 액션을 디스패치할 함수
export class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username : "",  //  입력한 유저 아이디
      password : "",  //  입력한 유저 패스워드
      password_confirm : "",  //  입력한 확인용 유저 패스워드
      nickname : "",  //  입력한 이름(닉네임)
      is_confirmed : false   //  패스워드 일치 여부
    };
  }

  render() {
    const { username_store, mySNU_verification_token, phone_verification_token, is_captcha_verified, signup_click } = this.props

    //  패스워드 일치 여부 메시지
    let confirm_message =
    (this.state.is_confirmed)
    ? <Font_Green> 패스워드가 일치합니다. </Font_Green>
    : <Font_Red> 패스워드가 일치하지 않습니다. </Font_Red>

    // 로그인 X : 정상 출력
    if (username_store == null) {
      return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h1' color='teal' textAlign='center'> Sign up your account </Header>
            <Form size='large'>
              <Segment stacked>

                {/* 유저 아이디 입력 */}
                <Form.Input fluid icon='user' iconPosition='left' placeholder='Username'
                onChange={(e) => this.setState({ username: e.target.value })} />

                {/* 유저 패스워드 입력 */}
                <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password'
                onChange={(e) => {
                  this.setState({ password: e.target.value })
                  if (this.state.password_confirm == e.target.value) { this.setState({ is_confirmed : true }) }
                  else                                               { this.setState({ is_confirmed : false }) }
                }} type='password' />

                {/* 유저 패스워드 다시 입력 (확인) */}
                <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password Confirm'
                onChange={(e) => {
                  this.setState({ password_confirm: e.target.value })
                  if (this.state.password == e.target.value) { this.setState({ is_confirmed : true }) }
                  else                                       { this.setState({ is_confirmed : false }) }
                }} type='password' />

                {/* 패스워드 일치 여부  */}
                {confirm_message}

                {/* 유저 이름(닉네임) 입력 */}
                <Form.Input fluid icon='signup' iconPosition='left' placeholder='name'
                onChange={(e) => this.setState({ nickname: e.target.value })} />

                {/* 보안문자 입력 */}
                <Captcha />

                {/* 회원가입 완료 버튼 */}
                <Button color='teal' fluid size='large'
                onClick={() => {
                  if (is_valid_form(this.state.username, this.state.password, this.state.password_confirm, this.state.nickname, is_captcha_verified))
                    signup_click(this.state.username, this.state.password, this.state.nickname)
                }}> 회원가입 </Button>

              </Segment>
            </Form>
            <Message><a href='/login'> 돌아가기 </a></Message>
            <Icon name='question circle' /><a href='/tutorial'>홈페이지 소개</a>
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
}
