import React from 'react'
import { shallow } from 'enzyme'
import { TutorialPage } from '.'
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react'

const wrap = (props = {}) => shallow(<TutorialPage {...props} />)

it('tutorial test', () => {
  const wrapper = wrap({})
  expect(wrapper.contains('To Home')).toBe(true)
  expect(wrapper.contains('0. SNU Moyeo에 온 것을 환영합니다.')).toBe(true)
})
