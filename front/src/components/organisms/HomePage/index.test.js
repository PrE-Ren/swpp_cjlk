import React from 'react'
import { shallow } from 'enzyme'
import { HomePage } from '.'
import { Grid, Header, Icon, Container } from 'semantic-ui-react'

const wrap = (props = {}) => shallow(<HomePage {...props} />)


it('username not defined', () => {
  const wrapper = wrap({ username: null, mySNU_verification_token: null, phone_verification_token: null })
  expect(wrapper.contains('SNU Moyeo')).toBe(false)
  expect(wrapper.contains(<div></div>)).toBe(true)
})

it('token not defined', () => {
  const wrapper2 = wrap({ username: 'test1', mySNU_verification_token: null, phone_verification_token: null })
  expect(wrapper2.contains('SNU Moyeo')).toBe(false)
  expect(wrapper2.contains(<div></div>)).toBe(true)
})

it('token good', () => {
  const wrapper3 = wrap({ username: 'test1', mySNU_verification_token: '123asdas', phone_verification_token: '123asdaq' })
  expect(wrapper3.contains(<Header.Subheader> SNU web service that helps you construct and join a meeting </Header.Subheader>)).toBe(true)
})
