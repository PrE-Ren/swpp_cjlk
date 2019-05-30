import React from 'react'
import { Button, Form, Grid, Header, Segment, Container } from 'semantic-ui-react'

// login_click -> logout_click
export const LoginAuthPage = ({ username, password, mySNU_verification_token, phone_verification_token,
                                send_email_click, send_phone_click, confirm_email_click, confirm_phone_click, logout_click }) => {
  const hash = new Buffer(`${username}:${password}`).toString('base64')
  let email, phone_number
  let email_code, phone_code
  
  const emailform = 
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        Authenticate your MySNU email
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input icon='mail' iconPosition='left' placeholder='abc@snu.ac.kr' onChange={(e) => email = e.target.value} />
          <Form.Input icon='code' iconPosition='left' placeholder='Type your email code' onChange={(e) => email_code = e.target.value} />
          <Grid columns={2}>
            <Grid.Column width={8}>
              <Button color='teal' fluid size='large' onClick={() => send_email_click(hash, email)}>인증번호 전송</Button>
            </Grid.Column>
            <Grid.Column width={8}>
              <Button color='teal' fluid size='large' onClick={() => confirm_email_click(hash, email, email_code)}>확인</Button>
            </Grid.Column>
          </Grid>
        </Segment>
      </Form>
    </Grid.Column>

  const emailfin = 
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        Authenticate your MySNU email
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input icon='mail' disabled iconPosition='left' placeholder='abc@snu.ac.kr' onChange={(e) => email = e.target.value} />
          <Form.Input icon='code' disabled iconPosition='left' placeholder='Type your email code' onChange={(e) => email_code = e.target.value} />
          <Grid columns={1}>
            <Grid.Column width={16}>
              <Button color='teal' disabled fluid size='large'>메일 인증 완료</Button>
            </Grid.Column>
          </Grid>
        </Segment>
      </Form>
    </Grid.Column>
  
  const phoneform = 
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        Authenticate your phone
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input fluid icon='phone' iconPosition='left' placeholder='01012345678' onChange={(e) => phone_number = e.target.value} />
          <Form.Input fluid icon='code' iconPosition='left' placeholder='Type your message code' onChange={(e) => phone_code = e.target.value} />
          <Grid columns={2}>
            <Grid.Column width={8}>
              <Button color='teal' fluid size='large' onClick={() => send_phone_click(hash, phone_number)}>인증번호 전송</Button>
            </Grid.Column>
            <Grid.Column width={8}>
              <Button color='teal' fluid size='large' onClick={() => confirm_phone_click(hash, phone_number, phone_code)}>확인</Button>
            </Grid.Column>
          </Grid>
        </Segment>
      </Form>
    </Grid.Column>

  const phonefin = 
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        Authenticate your phone
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input fluid icon='phone' disabled iconPosition='left' placeholder='01012345678' onChange={(e) => phone_number = e.target.value} />
          <Form.Input fluid icon='code' disabled iconPosition='left' placeholder='Type your message code' onChange={(e) => phone_code = e.target.value} />
          <Grid columns={1}>
            <Grid.Column width={16}>
              <Button color='teal' disabled fluid size='large'>핸드폰 인증 완료</Button>
            </Grid.Column>
          </Grid>
        </Segment>
      </Form>
    </Grid.Column>
  
  if(username == null){
    return (<div></div>)
  }
  else{
    return (
      <Container>
        <Grid columns={3} textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          {mySNU_verification_token == null ? emailform : emailfin}
          {phone_verification_token == null ? phoneform : phonefin}
          <Grid.Column>
            <br /><br />
            <Button size='massive' style={{ float:'top' }} onClick={() => Object.defineProperty(window.location, 'href', {writable: true, value: '/'})}>인증완료</Button><br /><br />
            {/* onClick 속성에 새로 가져온 logout_click을 설정 */}
            <Button size='massive' style={{ float:'bottom' }} onClick={() => {logout_click(); Object.defineProperty(window.location, 'href', {writable: true, value: '/login'});}}>로그아웃</Button>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}
