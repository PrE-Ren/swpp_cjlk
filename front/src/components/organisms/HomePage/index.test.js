import React from 'react'
import { shallow } from 'enzyme'
import HomePage from '.'
import { logoutRequest } from '../../../store/snu_moyeo/actions'

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

const wrap = (props = {}) => shallow(<HomePage {...props} />)

it('renders page when passed in', () => {
  const wrapper = wrap({ state: state1, logoutReq: logoutRequest})
  expect(wrapper.contains('To Home')).toBe(true)
  expect(wrapper.contains('My Page')).toBe(true)
  expect(wrapper.contains('로그아웃')).toBe(true)
  const wrapper2 = wrap({ state: initialState, logoutReq: logoutRequest})
  expect(wrapper2.contains('To Home')).toBe(false)
  expect(wrapper2.contains('My Page')).toBe(false)
  expect(wrapper2.contains('로그아웃')).toBe(false)
})
