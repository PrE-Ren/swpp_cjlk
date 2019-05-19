import React from 'react'
import { shallow } from 'enzyme'
import { SignupPage } from '.'
import { signup_action } from '../../../store/snu_moyeo/actions'


const wrap = (props = {}) => shallow(<SignupPage {...props} />)

it('renders page when passed in', () => {
  const wrapper = wrap({ token: null, signup_click: signup_action})
  expect(wrapper.contains(<input style={{border: "1px solid"}} size="23" ref={node => {username=node;}}/>)).toBe(true)
  expect(wrapper.contains(<input style={{border: "1px solid"}} size="23" ref={node => {password=node;}}/>)).toBe(true)
  expect(wrapper.contains(<input style={{border: "1px solid"}} size="23" ref={node => {name=node;}}/>)).toBe(true)
  expect(wrapper.contains(<input style={{border: "1px solid"}} size="14" ref={node => {email=node;}}/>)).toBe(true)
  expect(wrapper.contains('회원가입')).toBe(true)
  expect(wrapper.contains('돌아가기')).toBe(true)
  const wrapper2 = wrap({ token: "abc", signup_click: signup_action})
  expect(wrapper2.contains('회원가입')).toBe(false)
})
