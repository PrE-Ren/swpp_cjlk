import React from 'react'
import { shallow } from 'enzyme'
import LoginPage from '.'
import styled, {css} from 'styled-components'
//import { initialState } from '../../../store/snu_moyeo/selectors'
import { getLoginData } from '../../../store/snu_moyeo/actions'

const initialState = {
  user_id : null,
  username: null,
  password: null,
  name : null,
  email : null,
  point : null,
  mySNU_verified : null,
  mySNU_verification_token: null,
  meetings : null,

  meeting_list : null
};

const state1 = {...initialState, mySNU_verification_token : "abc"}

const wrap = (props = {}) => shallow(<LoginPage {...props} />)

it('renders page when passed in', () => {
  const wrapper = wrap({ state: initialState, loginReq: getLoginData})
  expect(wrapper.contains(<input ref={node=>{username=node;}}/>)).toBe(true)
  expect(wrapper.contains(<input ref={node=>{password=node;}}/>)).toBe(true)
  expect(wrapper.contains('로그인')).toBe(true)
  expect(wrapper.contains('회원가입')).toBe(true)
  const wrapper2 = wrap({ state: state1, loginReq: getLoginData})
  expect(wrapper2.contains(<input ref={node=>{username=node;}}/>)).toBe(false)
  expect(wrapper2.contains(<input ref={node=>{password=node;}}/>)).toBe(false)
  expect(wrapper2.contains('로그인')).toBe(false)
  expect(wrapper2.contains('회원가입')).toBe(false)
})
