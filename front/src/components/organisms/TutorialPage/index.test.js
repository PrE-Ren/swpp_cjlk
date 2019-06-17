import React from 'react'
import { shallow } from 'enzyme'
import { TutorialPage } from '.'
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react'

const wrap = (props = {}) => shallow(<TutorialPage {...props} />)

it('username null', () => {
  const wrapper = wrap({ username: null})
  expect(wrapper.contains('SNU Moyeo')).toBe(false)
  expect(wrapper.contains(<div></div>)).toBe(true)
})

it('username not null, token null', () => {
  let username
  const wrapper2 = wrap({ username: 'asqe', mySNU_verification_token: null, phone_verification_token: null})
  expect(wrapper2.contains('SNU Moyeo')).toBe(false)
  expect(wrapper2.contains(<div></div>)).toBe(true)
})

it('username not null, token not null', () => {
  const wrapper3 = wrap({ username: 'asqe', mySNU_verification_token: 'asdasd', phone_verification_token: 'asdasd'})
  expect(wrapper3.contains('0. 스누모여에 온 것을 환영합니다.')).toBe(true)
  expect(wrapper3.contains(<div></div>)).toBe(false)
})
