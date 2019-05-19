import React from 'react'
import { shallow } from 'enzyme'
import { MyPagePage } from '.'
import MyInfo from '../../../containers/MyInfo'

const wrap = (props = {}) => shallow(<MyPagePage {...props} />)

it('renders page when passed in', () => {
  const wrapper = wrap({ token: null })
  expect(wrapper.contains('SNU Moyeo')).toBe(false)
  expect(wrapper.contains(<div></div>)).toBe(true)
  const wrapper2 = wrap({ token: "abc"})
  expect(wrapper2.contains('SNU Moyeo')).toBe(true)
  expect(wrapper2.contains(<MyInfo />)).toBe(true)
})
