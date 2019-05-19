import React from 'react'
import { shallow } from 'enzyme'
import { HomePage } from '.'

const wrap = (props = {}) => shallow(<HomePage {...props} />)

it('renders page when passed in', () => {
  const wrapper = wrap({ token: "abc" })
  expect(wrapper.contains('SNU Moyeo')).toBe(true)
  expect(wrapper.find('ToHome')).toHaveLength(1)
  const wrapper2 = wrap({ token: null })
  expect(wrapper2.contains('SNU Moyeo')).toBe(false)
})
