import React from 'react'
import { shallow } from 'enzyme'
import Right_sidebar from '.'
import Make_new from '../../atoms/Make_new'
import Logout from '../../../containers/Logout'

const wrap = (props = {}) => shallow(<Right_sidebar {...props} />)

it('renders same sidebar when different childern, props passed in', () => {
  const wrapper = wrap({ children: 'test', id: 'foo' })
  expect(wrapper.find('ToMyPage')).toHaveLength(1)
  expect(wrapper.contains(<Logout/>)).toBe(true)
  expect(wrapper.contains(<Make_new/>)).toBe(true)
  expect(wrapper.find('Join_chatroom')).toHaveLength(1)
  const wrapper2 = wrap({ children: 'foo', id: 'test' })
  expect(wrapper2.find('ToMyPage')).toHaveLength(1)
  expect(wrapper2.contains(<Logout/>)).toBe(true)
  expect(wrapper2.contains(<Make_new/>)).toBe(true)
  expect(wrapper2.find('Join_chatroom')).toHaveLength(1)
})

