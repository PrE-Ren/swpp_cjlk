import React from 'react'
import { shallow } from 'enzyme'
import ToHome from '.'

const wrap = (props = {}) => shallow(<ToHome {...props} />)

it('not renders wrong thing when passed in', () => {
  const wrapper = wrap()
  expect(wrapper.contains('trashdb')).toBe(false)
})