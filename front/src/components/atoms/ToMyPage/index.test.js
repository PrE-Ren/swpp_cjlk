import React from 'react'
import { shallow } from 'enzyme'
import ToMyPage from '.'

const wrap = (props = {}) => shallow(<ToMyPage {...props} />)

it('renders same text when different children, props passed in', () => {
  const wrapper = wrap({ children: 'test', id: 'foo' })
  expect(wrapper.contains('내 정보')).toBe(true)
  const wrapper2 = wrap({ children: 'foo', id: 'test' })
  expect(wrapper2.contains('내 정보')).toBe(true)
})