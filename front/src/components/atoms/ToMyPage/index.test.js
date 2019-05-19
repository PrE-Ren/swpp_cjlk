import React from 'react'
import { shallow } from 'enzyme'
import ToMyPage from '.'

const wrap = (props = {}) => shallow(<ToMyPage {...props} />)

it('not renders wrong thing when passed in', () => {
  const wrapper = wrap()
  expect(wrapper.contains('trashdb')).toBe(false)
})