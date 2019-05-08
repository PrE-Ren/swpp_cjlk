import React from 'react'
import { shallow } from 'enzyme'
import SignupPage from '.'
import { postSignupData } from '../../../store/snu_moyeo/actions'

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

const wrap = (props = {}) => shallow(<SignupPage {...props} />)

it('renders page when passed in', () => {
  const wrapper = wrap({ state: initialState, signupReq: postSignupData})
  expect(wrapper.contains(<input ref={node=>{username=node;}}/>)).toBe(true)
  expect(wrapper.contains(<input ref={node=>{password=node;}}/>)).toBe(true)
  expect(wrapper.contains(<input ref={node=>{name=node;}}/>)).toBe(true)
  expect(wrapper.contains(<input ref={node=>{email=node;}}/>)).toBe(true)
  expect(wrapper.contains('돌아가기')).toBe(true)
  expect(wrapper.contains('제출')).toBe(true)
  const wrapper2 = wrap({ state: state1, signupReq: postSignupData})
  expect(wrapper2.contains(<input ref={node=>{username=node;}}/>)).toBe(false)
  expect(wrapper2.contains(<input ref={node=>{password=node;}}/>)).toBe(false)
  expect(wrapper2.contains(<input ref={node=>{name=node;}}/>)).toBe(false)
  expect(wrapper2.contains(<input ref={node=>{email=node;}}/>)).toBe(false)
  expect(wrapper2.contains('돌아가기')).toBe(false)
  expect(wrapper2.contains('제출')).toBe(false)
})
