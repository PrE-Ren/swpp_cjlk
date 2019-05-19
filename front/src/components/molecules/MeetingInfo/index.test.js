import React from 'react'
import { shallow } from 'enzyme'
import { MeetingInfo } from '.'

const wrap = (props = {}) => shallow(<MeetingInfo {...props} />)

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
};

const state1 = {...initialState, username : 'abc', email : 'hello@snu.ac.kr', user_id : 1}
const state2 = {...initialState, username : 'abc', email : 'hello@snu.ac.kr', user_id : 3}

const meeting = {id: 3, title: '미팅', created: '2019-05-10T19:00:00+09:00', leader: 'abc', min_people: 8, max_people: 10, state: 0, description: '미팅 구해요', kind: 5, due: '2019-05-16T19:00:00+09:00', picture: null, members: [1,2]}
const meeting2 = {id: 3, title: '미팅', created: '2019-05-10T19:00:00+09:00', leader: 'abc', min_people: 8, max_people: 10, state: 1, description: '미팅 구해요', kind: 5, due: '2019-05-16T19:00:00+09:00', picture: null, members: [1,2]}
const meeting3 = {id: 3, title: '미팅', created: '2019-05-10T19:00:00+09:00', leader: 'abc', min_people: 8, max_people: 10, state: 2, description: '미팅 구해요', kind: 5, due: '2019-05-16T19:00:00+09:00', picture: null, members: [1,2]}
const meeting4 = {id: 3, title: '미팅', created: '2019-05-10T19:00:00+09:00', leader: 'abc', min_people: 8, max_people: 10, state: 3, description: '미팅 구해요', kind: 5, due: '2019-05-16T19:00:00+09:00', picture: null, members: [1,2]}
const meeting5 = {id: 3, title: '미팅', created: '2019-05-10T19:00:00+09:00', leader: 'abc', min_people: 8, max_people: 10, state: 4, description: '미팅 구해요', kind: 5, due: '2019-05-16T19:00:00+09:00', picture: null, members: [1,2]}
const meeting6 = {id: 4, title: '미팅', created: '2019-05-10T19:00:00+09:00', leader: 'def', min_people: 8, max_people: 10, state: 0, description: '미팅 구해요', kind: 5, due: '2019-05-16T19:00:00+09:00', picture: null, members: [1,2]}
const meeting7 = {id: 4, title: '미팅', created: '2019-05-10T19:00:00+09:00', leader: 'def', min_people: 2, max_people: 3, state: 0, description: '미팅 구해요', kind: 5, due: '2019-05-16T19:00:00+09:00', picture: null, members: [1,2,7]}


it('renders page when leader access', () => {
  const wrapper = wrap({ state: state1, meeting_info : meeting})
  expect(wrapper.contains('마감')).toBe(true)
  expect(wrapper.contains('해산')).toBe(true)
  const wrapper2 = wrap({ state: state1, meeting_info : meeting2})
  expect(wrapper2.contains('추가 모집 시작')).toBe(true)
  expect(wrapper2.contains('해산')).toBe(true)
  const wrapper3 = wrap({ state: state1, meeting_info : meeting3})
  expect(wrapper3.contains('추가 모집 중단')).toBe(true)
  expect(wrapper3.contains('해산')).toBe(true)
  const wrapper4 = wrap({ state: state1, meeting_info : meeting4})
  expect(wrapper4.contains('해산')).toBe(true)
  const wrapper5 = wrap({ state: state1, meeting_info : meeting5})
  expect(wrapper5.contains('마감')).toBe(false)
  expect(wrapper5.contains('추감 모집 시작')).toBe(false)
  expect(wrapper5.contains('추가 모집 중단')).toBe(false)
})

it('renders page when others access', () => {
  const wrapper = wrap({ state: state1, meeting_info : meeting6})
  expect(wrapper.contains('탈퇴')).toBe(true)
  const wrapper2 = wrap({ state: state2, meeting_info : meeting6})
  expect(wrapper2.contains('참가')).toBe(true)
  const wrapper3 = wrap({ state: state2, meeting_info : meeting7})
  expect(wrapper3.contains('FULL')).toBe(true)
})