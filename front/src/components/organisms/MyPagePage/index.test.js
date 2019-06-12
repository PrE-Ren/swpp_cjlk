import React from 'react'
import { shallow } from 'enzyme'
import { MyPagePage } from '.'
import MyInfo from '../../../containers/MyInfo'
import Left_sidebar from '../../molecules/Left_sidebar'

const wrap = (props = {}) => shallow(<MyPagePage {...props} />)

it('username null', () => {
  const wrapper = wrap({ username: null })
  expect(wrapper.contains(<div></div>)).toBe(true)
})

it('username not null, token null', () => {
  const wrapper2 = wrap({ username: 'asca', mySNU_verification_token: null, phone_verification_token: null })
  expect(wrapper2.contains(<div></div>)).toBe(true)
})

it('username not null, token not null', () => {
  const wrapper3 = wrap({ username: 'asca', mySNU_verification_token: 'asvasa', phone_verification_token: 'qweas' })
  expect(wrapper3.contains(<Left_sidebar />)).toBe(true)
  expect(wrapper3.contains(<MyInfo />)).toBe(true)
  expect(wrapper3.contains('SNU Moyeo')).toBe(true)
})
