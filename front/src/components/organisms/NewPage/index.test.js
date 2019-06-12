import React from 'react'
import { shallow } from 'enzyme'
import { NewPage } from '.'
import MeetingCreate from '../../../containers/MeetingCreate'

const wrap = (props = {}) => shallow(<NewPage {...props} />)

it('username null', () => {
  const wrapper = wrap({ username : null })
  expect(wrapper.contains(<div></div>)).toBe(true)
})

it('username not null, token null', () => {
  const wrapper2 = wrap({ username : 'abs', mySNU_verification_token: null, phone_verification_token: null })
  expect(wrapper2.contains(<div></div>)).toBe(true)
})

it('username not null, token not null', () => {
  const wrapper3 = wrap({ username : 'abs', mySNU_verification_token: 'aqeq', phone_verification_token: 'qweaca' })
  expect(wrapper3.contains(<MeetingCreate />)).toBe(true)
})
