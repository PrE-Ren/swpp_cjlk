import React from 'react'
import { shallow } from 'enzyme'
import { MyInfo } from '.'
import LeadList from '../../../containers/LeadList'
import JoinList from '../../../containers/JoinList'
import HistoryList from '../../../containers/HistoryList'

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

const state1 = {...initialState, name : 'hello', email : 'hello@snu.ac.kr'}

const wrap = (props = {}) => shallow(<MyInfo {...props} />)

it('renders page when passed in', () => {
  const wrapper = wrap({ state: initialState})
  expect(wrapper.contains(<LeadList/>)).toBe(true)
  expect(wrapper.contains(<JoinList/>)).toBe(true)
  expect(wrapper.contains(<HistoryList/>)).toBe(true)
  expect(wrapper.contains('My Information')).toBe(true)
  expect(wrapper.contains('내 정보')).toBe(true)
  expect(wrapper.contains('아이디 : ')).toBe(true)
  expect(wrapper.contains('이름 : ')).toBe(true)
  expect(wrapper.contains('이메일 : ')).toBe(true)
  expect(wrapper.contains('핸드폰 : ')).toBe(true)   
  const wrapper2 = wrap({ state: state1})
  expect(wrapper2.contains(<LeadList/>)).toBe(true)
  expect(wrapper2.contains(<JoinList/>)).toBe(true)
  expect(wrapper2.contains(<HistoryList/>)).toBe(true)
  expect(wrapper2.contains('My Information')).toBe(true)
  expect(wrapper2.contains('내 정보')).toBe(true)
  expect(wrapper2.contains('아이디 : ')).toBe(true)
  expect(wrapper2.contains('이름 : ')).toBe(true)
  expect(wrapper2.contains('이메일 : ')).toBe(true)
  expect(wrapper2.contains('핸드폰 : ')).toBe(true) 
})
