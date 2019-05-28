import React from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

export const LoginPage = ({ token, login_click }) => {
  let username, password
  if (token == null) {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h1' color='teal' textAlign='center'>
            Log in to your account
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' onChange={(e) => username = e.target.value}/>
              <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' onChange={(e) => password = e.target.value} type='password' />
              <Button color='teal' fluid size='large' onClick={() => login_click(username, password)}>로그인</Button>
            </Segment>
          </Form>
          <Message><a href='/signup'>회원가입</a></Message>
        </Grid.Column>
      </Grid>
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
