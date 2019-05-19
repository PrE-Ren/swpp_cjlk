import React from 'react'
import { shallow } from 'enzyme'
import { NewPage } from '.'
import MeetingCreate from '../../../containers/MeetingCreate'

const wrap = (props = {}) => shallow(<NewPage {...props} />)

it('does not render wrong thing when passed in', () => {
  const wrapper = wrap({ token : "abc" })
  expect(wrapper.contains('SNU Moyeo')).toBe(true)
  expect(wrapper.contains(<MeetingCreate />)).toBe(true)
  const wrapper2 = wrap({ token : null })
  expect(wrapper2.contains(<MeetingCreate />)).toBe(false)
})
