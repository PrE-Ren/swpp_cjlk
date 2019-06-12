import React from 'react'
import { shallow } from 'enzyme'
import { SignupPage } from '.'
import { signup_action } from '../../../store/snu_moyeo/actions'
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react'

const wrap = (props = {}) => shallow(<SignupPage {...props} />)

it('username null', () => {
  const wrapper = wrap({ username_store: null, signup_click: signup_action})
  expect(wrapper.contains('Sign up your account')).toBe(true)
  expect(wrapper.contains(<Message><a href='/login'>돌아가기</a></Message>)).toBe(true)
})

it('username not null, token null', () => {
  let username
  const wrapper2 = wrap({ username_store: 'asqe', mySNU_verification_token: null, phone_verification_token: null, signup_click: signup_action})
  expect(wrapper2.contains(<Form.Input fluid icon='user' iconPosition='left' placeholder='Username' onChange={(e) => username = e.target.value}/>)).toBe(false)
  expect(wrapper2.contains('Sign up your account')).toBe(false)
  expect(wrapper2.contains(<div></div>)).toBe(true)
})

it('username not null, token not null', () => {
  const wrapper3 = wrap({ username_store: 'asqe', mySNU_verification_token: null, phone_verification_token: null, signup_click: signup_action})
  expect(wrapper3.contains('Sign up your account')).toBe(false)
  expect(wrapper3.contains(<div></div>)).toBe(true)
})
