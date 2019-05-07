import React from 'react'
import { shallow } from 'enzyme'
import MyPagePage from '.'

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

const wrap = (props = {}) => shallow(<MyPagePage {...props} />)

it('does not render wrong thing when passed in', () => {
  const wrapper = wrap({ state: state1 })
  expect(wrapper.contains('최덕경')).toBe(false)
})
