import React from 'react'
import { shallow } from 'enzyme'
import Right_sidebar from '.'
import Join_chatroom from '../../atoms/Join_chatroom'

const wrap = (props = {}) => shallow(<Right_sidebar {...props} />)

it('renders compoenents properly', () => {
  const wrapper = wrap()
  expect(wrapper.contains(<Join_chatroom />)).toBe(true)
})

