import React from 'react'
import { shallow } from 'enzyme'
import MyInfo from '.'

const wrap = (props = {}) => shallow(<MyInfo {...props} />)

it('renders props when passed in', () => {
  const wrapper = wrap({ id: 'foo' })
  expect(wrapper.find({ id: 'foo' })).toHaveLength(1)
})
