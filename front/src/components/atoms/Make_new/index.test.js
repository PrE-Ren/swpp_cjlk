import React from 'react'
import { shallow } from 'enzyme'
import Make_new from '.'

const onClick = jest.fn() 
const wrap = (props = {}) => shallow(<Make_new onClick = {onClick} {...props} />)

it('renders same text when different children, props passed in', () => {
  const wrapper = wrap({ children: 'test', id: 'foo' })
  expect(wrapper.contains('새 모임 만들기')).toBe(true)
  const wrapper2 = wrap({ children: 'foo', id: 'test' })
  expect(wrapper2.contains('새 모임 만들기')).toBe(true)
})