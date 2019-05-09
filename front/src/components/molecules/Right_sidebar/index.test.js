import React from 'react'
import { shallow } from 'enzyme'
import Right_sidebar from '.'

const wrap = (props = {}) => shallow(<Right_sidebar {...props} />)

it('renders same sidebar when different childern, props passed in', () => {
  const wrapper = wrap({ children: 'test', id: 'foo' })
  expect(wrapper.contains('새 모임 만들기')).toBe(true)
  const wrapper2 = wrap({ children: 'foo', id: 'test' })
  expect(wrapper.contains('새 모임 만들기')).toBe(true)

})

