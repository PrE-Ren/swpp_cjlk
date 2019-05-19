import React from 'react'
import { shallow } from 'enzyme'
import { LoginPage } from '.'
import { login_action } from '../../../store/snu_moyeo/actions'


const wrap = (props = {}) => shallow(<LoginPage {...props} />)

it('renders page when passed in', () => {
  const wrapper = wrap({ token: null, login_click: login_action})
  expect(wrapper.contains(<input style={{border: "1px solid"}} ref={node => {username=node;}}/>)).toBe(true)
  expect(wrapper.contains(<input style={{border: "1px solid"}} type="password" ref={node => {password=node;}}/>)).toBe(true)
  expect(wrapper.contains('로그인')).toBe(true)
  expect(wrapper.contains('회원가입')).toBe(true)
  const wrapper2 = wrap({ token: "abc", login_click: login_action})
  expect(wrapper2.contains('로그인')).toBe(false)
  expect(wrapper2.contains(<div></div>)).toBe(true)
})
