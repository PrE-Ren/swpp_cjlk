import React from 'react'
import { shallow } from 'enzyme'
import { Logout } from '.'

const onClick = jest.fn()
const wrap = (props = {}) => shallow(<Logout {...props} />)

it('renders same text when different childern, props passed in', () => {
  const wrapper = wrap({logout_click : onClick})
  expect(wrapper.contains('로그아웃')).toBe(true)
})

it('calls onClick when Clicked', () => {
  onClick.mockClear()
  const wrapper = wrap({logout_click : onClick})
  expect(onClick).not.toBeCalled()
  wrapper.simulate('click')
  expect(onClick).toBeCalled()
})