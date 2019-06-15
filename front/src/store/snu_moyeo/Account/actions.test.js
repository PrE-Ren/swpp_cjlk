import * as actions from './actions'

it('test log_in action', () => {
  const username = 'test'
  const password = '1234'
  const expectedAction = {
    type : actions.LOGIN_ACTION,
    username,
    password
  }
  expect(actions.login_action(username,password)).toEqual(expectedAction)
})

it('test login_success_action',() => {
  const username = 'test'
  const password = '1234'
  const mySNU_verification_token = 'asd2231867qe'
  const phone_verification_token = 'asdsaqwe'
  const user_id = '1'
  const email = 'test@snu.ac.kr'
  const phone_number ='01012345678'
  const name = 'test1'

  const expectedAction = {
    type : actions.LOGIN_SUCCESS_ACTION,
    data : {
        username : username,
        password : password,
        mySNU_verification_token : mySNU_verification_token,
        phone_verification_token : phone_verification_token,
        user_id : user_id,
        email : email,
        phone_number : phone_number,
        name : name
    }
  }
  expect(actions.login_success_action(username, password, mySNU_verification_token, phone_verification_token, user_id, email, phone_number, name)).toEqual(expectedAction)
})

it('test logout_action', () => {
  const expectedAction = {
    type : actions.LOGOUT_ACTION
  }
  expect(actions.logout_action()).toEqual(expectedAction)
})

it('test signup_action', () => {
  const username = 'test'
  const password = '1234'
  const name = 'test1'

  const expectedAction = {
    type : actions.SIGNUP_ACTION,
    username,
    password,
    name
  }
  expect(actions.signup_action(username, password, name)).toEqual(expectedAction)
})

it('test login_auth_action', () => {
  const username = 'test'
  const password = '1234'

  const expectedAction = {
    type : actions.LOGIN_AUTH_ACTION,
    username,
    password
  }
  expect(actions.login_auth_action(username, password)).toEqual(expectedAction)
})

it('test send_email_action', () => {
  const hash = '1235asdad'
  const email = 'test@snu.ac.kr'

  const expectedAction = {
    type : actions.SEND_EMAIL_ACTION,
    hash,
    email
  }
  expect(actions.send_email_action(hash, email)).toEqual(expectedAction)
})

it('test send_phone_action', () => {
  const hash = '1235asdad'
  const phone_number = '01012345678'

  const expectedAction = {
    type : actions.SEND_PHONE_ACTION,
    hash,
    phone_number
  }
  expect(actions.send_phone_action(hash, phone_number)).toEqual(expectedAction)
})

it('test confirm_email_action', () => {
  const hash = '1235asdad'
  const email = 'test@snu.ac.kr'
  const email_code = '12345'

  const expectedAction = {
    type : actions.CONFIRM_EMAIL_ACTION,
    hash,
    email,
    email_code
  }
  expect(actions.confirm_email_action(hash, email, email_code)).toEqual(expectedAction)
})

it('test confirm_phone_action', () => {
  const hash = '1235asdad'
  const phone_number = '01012345678'
  const phone_code = '12345'

  const expectedAction = {
    type : actions.CONFIRM_PHONE_ACTION,
    hash,
    phone_number,
    phone_code
  }
  expect(actions.confirm_phone_action(hash, phone_number, phone_code)).toEqual(expectedAction)
})

it('test success_email_action', () => {
  const email = 'test@snu.ac.kr'
  const email_code = '12345'

  const expectedAction = {
    type : actions.SUCCESS_EMAIL_ACTION,
    email,
    email_code
  }
  expect(actions.success_email_action(email, email_code)).toEqual(expectedAction)
})

it('test success_phone_action', () => {
  const phone_number = '01012345678'
  const phone_code = '12345'

  const expectedAction = {
    type : actions.SUCCESS_PHONE_ACTION,
    phone_number,
    phone_code
  }
  expect(actions.success_phone_action(phone_number, phone_code)).toEqual(expectedAction)
})
