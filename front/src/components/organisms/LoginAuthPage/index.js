import React from 'react'
import { Button, Form, Grid, Header, Segment, Container, Icon, Modal, Dimmer, Loader } from 'semantic-ui-react'

// username : 유저 아이디 (로그인 여부 확인 및 해시값 획득을 위해 필요)
// password : 유저 패스워드 (해시값 획득을 위해 필요)
// mySNU_verification_token : 이메일 토큰
// phone_verification_token : 폰 토큰
// send_email_click : 인증번호 전송 버튼을 눌렀을 때 액션을 디스패치할 함수
// send_phone_click : 인증번호 전송 버튼을 눌렀을 때 액션을 디스패치할 함수
// confirm_email_click : 확인 버튼을 눌렀을 때 액션을 디스패치할 함수
// confirm_phone_click : 확인 버튼을 눌렀을 때 액션을 디스패치할 함수
// logout_click : 로그아웃 버튼을 눌렀을 때 액션을 디스패치할 함수
export class LoginAuthPage extends React.Component {
  state = {
    email: '', phone_number: '',  //  입력한 이메일 및 폰 번호
    email_code: 0, phone_code: 0  //  입력한 이메일 인증 번호 및 폰 인증번호
  }

  render() {
    const { username, password, point, mySNU_verification_token, phone_verification_token,
            send_email_click, send_phone_click, confirm_email_click, confirm_phone_click, logout_click, 
            email_open, phone_open, prepare_send_email_click, prepare_send_phone_click} = this.props
    const { email, phone_number, email_code, phone_code } = this.state
    const hash = new Buffer(`${username}:${password}`).toString('base64')  //  유저 해시값

    const mail_loading =
    <Modal open={this.props.email_open}>
      <Modal.Header>이메일 인증</Modal.Header>
      <Modal.Content>
        <Dimmer active inverted>
            <Loader inverted>이메일 인증 번호를 요청중입니다.</Loader>
        </Dimmer>
      </Modal.Content>
    </Modal>

    const phone_loading =
    <Modal open={this.props.phone_open}>
      <Modal.Header>휴대폰 인증</Modal.Header>
      <Modal.Content>
        <Dimmer active inverted>
            <Loader inverted>휴대폰 인증 번호를 요청중입니다.</Loader>
        </Dimmer>
      </Modal.Content>
    </Modal>

    // 이메일 및 인증번호 입력 창 (인증 미완료 시)
    const emailform =
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'> Authenticate your MySNU email </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input icon='mail' iconPosition='left' placeholder='abc@snu.ac.kr'
             onChange={(e) => this.setState({ email: e.target.value })} />
            <Form.Input icon='code' iconPosition='left' placeholder='Type your email code'
             onChange={(e) => this.setState({ email_code: e.target.value })} />
            <Grid columns={2}>
              <Grid.Column width={8}>
                <Button color='teal' fluid size='large' onClick={() => {prepare_send_email_click(); send_email_click(hash, email)}}> 인증번호 전송 </Button>
              </Grid.Column>
              <Grid.Column width={8}>
                <Button color='teal' fluid size='large' onClick={() => confirm_email_click(hash, email, email_code)}> 확인 </Button>
              </Grid.Column>
            </Grid>
          </Segment>
        </Form>
      </Grid.Column>

    // 이메일 및 인증번호 입력 창 (인증 완료 시)
    const emailform_disabled =
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'> Authenticate your MySNU email </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input icon='mail' disabled iconPosition='left' placeholder='abc@snu.ac.kr' />
            <Form.Input icon='code' disabled iconPosition='left' placeholder='Type your email code' />
            <Grid columns={1}>
              <Grid.Column width={16}>
                <Button color='teal' disabled fluid size='large'> 메일 인증 완료 </Button>
              </Grid.Column>
            </Grid>
          </Segment>
        </Form>
      </Grid.Column>

    // 폰 번호 및 인증번호 입력 창 (인증 미완료 시)
    const phoneform =
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'> Authenticate your phone </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input fluid icon='phone' iconPosition='left' placeholder='01012345678'
             onChange={(e) => this.setState({ phone_number: e.target.value })} />
            <Form.Input fluid icon='code' iconPosition='left' placeholder='Type your message code'
             onChange={(e) => this.setState({ phone_code: e.target.value })} />
            <Grid columns={2}>
              <Grid.Column width={8}>
                <Button color='teal' fluid size='large' onClick={() => {prepare_send_phone_click(); send_phone_click(hash, phone_number)}}> 인증번호 전송 </Button>
              </Grid.Column>
              <Grid.Column width={8}>
                <Button color='teal' fluid size='large' onClick={() => confirm_phone_click(hash, phone_number, phone_code)}> 확인 </Button>
              </Grid.Column>
            </Grid>
          </Segment>
        </Form>
      </Grid.Column>

    // 폰 번호 및 인증번호 입력 창 (인증 완료 시)
    const phoneform_disabled =
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'> Authenticate your phone </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input fluid icon='phone' disabled iconPosition='left' placeholder='01012345678' />
            <Form.Input fluid icon='code' disabled iconPosition='left' placeholder='Type your message code' />
            <Grid columns={1}>
              <Grid.Column width={16}>
                <Button color='teal' disabled fluid size='large'> 핸드폰 인증 완료 </Button>
              </Grid.Column>
            </Grid>
          </Segment>
        </Form>
      </Grid.Column>

    // 로그인 X : 로그인 페이지로 리다이렉트 (by saga)
    if (username == null) {
      return (<div></div>)
    }

    // 로그인 O, 벌점 10 이상 : 로그인 페이지로 리다이렉트 (by saga)
    else if (point >= 10) {
      return (<div></div>)
    }

    // 로그인 O : 인증이 완료됐다면 홈 페이지로 리다이렉트 (by saga), 아니라면 정상 출력
    else {
      return (
        <Container>
          <Grid columns={3} textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            {mySNU_verification_token == null ? emailform : emailform_disabled}
            {phone_verification_token == null ? phoneform : phoneform_disabled}
            {mail_loading}
            {phone_loading}
            <Grid.Column>
              <br /><br />
              <Button size='massive' style={{ float:'top' }} onClick={() => { window.location.href='/' }}>인증완료</Button><br /><br />
              <Button size='massive' style={{ float:'bottom' }} onClick={() => { logout_click(); window.location.href='/login' }}>로그아웃</Button><br/>
              <Icon name='question circle' /><a href='/tutorial'>홈페이지 소개</a>
            </Grid.Column>
          </Grid>
        </Container>
      )
    }
  }
}
