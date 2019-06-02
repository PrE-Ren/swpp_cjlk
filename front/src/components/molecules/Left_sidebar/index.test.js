import React from 'react'
import { shallow } from 'enzyme'
import Left_sidebar from '.'

const wrap = (props = {}) => shallow(<Left_sidebar {...props} />)

it('renders same sidebar when different childern, props passed in', () => {
  const wrapper = wrap({ children: 'test', id: 'foo' })
  expect(wrapper.contains('To Home')).toBe(true)
  expect(wrapper.contains('모임 분류')).toBe(true)
  expect(wrapper.contains('음식배달')).toBe(true)
  expect(wrapper.contains('택시합승')).toBe(true)
  expect(wrapper.contains('스터디')).toBe(true)
  expect(wrapper.contains('운동')).toBe(true)
  expect(wrapper.contains('미팅')).toBe(true)
  const wrapper2 = wrap({ children: 'foo', id: 'test' })
  expect(wrapper2.contains('To Home')).toBe(true)
  expect(wrapper2.contains('모임 분류')).toBe(true)
  expect(wrapper2.contains('음식배달')).toBe(true)
  expect(wrapper2.contains('택시합승')).toBe(true)
  expect(wrapper2.contains('스터디')).toBe(true)
  expect(wrapper2.contains('운동')).toBe(true)
  expect(wrapper2.contains('미팅')).toBe(true)

})

