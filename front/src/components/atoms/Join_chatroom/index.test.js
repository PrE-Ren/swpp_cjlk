import React from 'react'
import { shallow } from 'enzyme'
import Join_chatroom from '.'
import jest from 'jest'

const wrap = (props = {}) => shallow(<Join_chatroom {...props} />)

it('renders same text when different children, props passed in', () => {
  const wrapper = wrap({ children: 'test', id: 'foo' })
  expect(wrapper.contains('채팅방 빠른입장')).toBe(true)
  const wrapper2 = wrap({ children: 'foo', id: 'test' })
  expect(wrapper2.contains('채팅방 빠른입장')).toBe(true)
})
