import React from 'react'
import { shallow } from 'enzyme'
import Right_sidebar from '.'

const wrap = (props = {}) => shallow(<Right_sidebar {...props} />)

it('renders props when passed in', () => {
  const wrapper = wrap({ id: 'foo' })
  expect(wrapper.find({ id: 'foo' })).toHaveLength(1)
})
