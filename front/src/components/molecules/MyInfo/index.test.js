import React from 'react'
import { shallow } from 'enzyme'
import MyInfo from '.'
import MeetingEntry from '../../atoms/MeetingEntry'


const entry1 = {
  id : 0,
  title : '미팅',
  created : '2019-05-10T19:00:00+09:00',
  due : '2019-05-16T19:00:00+09:00',
  min_people : 8,
  max_people : 10,
  state : 0,
  description : '미팅합시다',
  kind : 5,
  leader : '이종민'
}

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

  meeting_list : JSON.stringify([entry1])
};

//const state1 = {...initialState, mySNU_verification_token : "abc"}

const wrap = (props = {}) => shallow(<MyInfo {...props} />)

it('renders page when passed in', () => {
  const wrapper = wrap({ state: initialState})
  expect(wrapper.contains(<MeetingEntry {...entry1} />)).toBe(true)
  /*
  const wrapper2 = wrap({ state: state1, signupReq: postSignupData})
  expect(wrapper2.contains(<input ref={node=>{username=node;}}/>)).toBe(false)
  expect(wrapper2.contains(<input ref={node=>{password=node;}}/>)).toBe(false)
  expect(wrapper2.contains(<input ref={node=>{name=node;}}/>)).toBe(false)
  expect(wrapper2.contains(<input ref={node=>{email=node;}}/>)).toBe(false)
  */
})
