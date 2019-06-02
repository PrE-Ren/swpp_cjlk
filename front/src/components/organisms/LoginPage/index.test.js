import React from 'react'
import { shallow } from 'enzyme'
import { LoginPage } from '.'
import { login_action } from '../../../store/snu_moyeo/actions'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'


const wrap = (props = {}) => shallow(<LoginPage {...props} />)

it('username null', () => {
  const wrapper = wrap({ username_store: null, mySNU_verification_token: null, phone_verification_token: null, login_click: login_action})
  expect(wrapper.contains('Log in to your account')).toBe(true)
  expect(wrapper.contains(<Message><a href='/signup'>회원가입</a></Message>)).toBe(true)
})

it('username not null, token null', () => {
  const wrapper2 = wrap({ username_store: 'abcs', mySNU_verification_token: null, phone_verification_token: null, login_click: login_action})
  expect(wrapper2.contains('Log in to your account')).toBe(false)
  expect(wrapper2.contains(<Message><a href='/signup'>회원가입</a></Message>)).toBe(false)
  expect(wrapper2.contains(<div></div>)).toBe(true)
})


it('username not null, token not null', () => {
  const wrapper3 = wrap({ username_store: 'abcs', mySNU_verification_token: 'asdas', phone_verification_token: 'asdaq', login_click: login_action})
  expect(wrapper3.contains('Log in to your account')).toBe(false)
  expect(wrapper3.contains(<Message><a href='/signup'>회원가입</a></Message>)).toBe(false)
  expect(wrapper3.contains(<div></div>)).toBe(true)
})
