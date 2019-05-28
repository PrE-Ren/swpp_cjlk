import React from 'react'
import { Button, Form, Grid, Header, Segment, Container } from 'semantic-ui-react'

export const LoginAuthPage = ({ username, password, token,
                                send_email_click, send_phone_click, confirm_email_click, confirm_phone_click, login_click }) => {
  const hash = new Buffer(`${username}:${password}`).toString('base64')
  let email, phone_number
  let email_code, phone_code

  if (token == null) {
    return (
      <Container>
        <Grid columns={3} textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Authenticate your MySNU email
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input icon='mail' iconPosition='left' placeholder='abc@snu.ac.kr' onChange={(e) => email = e.target.value} />
                <Form.Input icon='code' iconPosition='left' placeholder='Type your message code' onChange={(e) => email_code = e.target.value} />
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

          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Authenticate your phone
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input fluid icon='phone' iconPosition='left' placeholder='01012345678' onChange={(e) => phone_number = e.target.value} />
                <Form.Input fluid icon='code' iconPosition='left' placeholder='Type your email code' onChange={(e) => phone_code = e.target.value} />
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

          <Grid.Column>
            <br /><br />
            <Button size='massive' style={{ float:'top' }} onClick={() => login_click(username, password)}>인증완료</Button><br /><br />
            <Button size='massive' style={{ float:'bottom' }} onClick={() => window.location.href = "/login"}>돌아가기</Button>
          </Grid.Column>
        </Grid>
      </Container>
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
