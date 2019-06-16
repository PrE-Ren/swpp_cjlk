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

const onClick = jest.fn()
const onClick2 = jest.fn()
const onClick3 = jest.fn()
const onClick4 = jest.fn()
const onClick5 = jest.fn()
const onClick6 = jest.fn()
const onClick7 = jest.fn()
const onClick8 = jest.fn()
const onClick9 = jest.fn()

const state1 = {...initialState, username : 'abc', email : 'hello@snu.ac.kr', user_id : 1}
const state2 = {...initialState, username : 'abc', email : 'hello@snu.ac.kr', user_id : 3}

const meeting = {id: 3, title: '미팅', created: '2019-05-10T19:00:00+09:00', leader: 'abc', min_people: 8, max_people: 10, state: 0, description: '미팅 구해요', kind: 5, due: '2019-05-16T19:00:00+09:00', picture: null, members: [1,2], leaderid: 1}
const meeting2 = {id: 3, title: '미팅', created: '2019-05-10T19:00:00+09:00', leader: 'abc', min_people: 8, max_people: 10, state: 1, description: '미팅 구해요', kind: 5, due: '2019-05-16T19:00:00+09:00', picture: null, members: [1,2], leaderid: 1}
const meeting3 = {id: 3, title: '미팅', created: '2019-05-10T19:00:00+09:00', leader: 'abc', min_people: 8, max_people: 10, state: 2, description: '미팅 구해요', kind: 5, due: '2019-05-16T19:00:00+09:00', picture: null, members: [1,2], leaderid: 1}
const meeting4 = {id: 3, title: '미팅', created: '2019-05-10T19:00:00+09:00', leader: 'abc', min_people: 8, max_people: 10, state: 3, description: '미팅 구해요', kind: 5, due: '2019-05-16T19:00:00+09:00', picture: null, members: [1,2], leaderid: 1}
const meeting5 = {id: 3, title: '미팅', created: '2019-05-10T19:00:00+09:00', leader: 'abc', min_people: 8, max_people: 10, state: 4, description: '미팅 구해요', kind: 5, due: '2019-05-16T19:00:00+09:00', picture: null, members: [1,2], leaderid: 1}
const meeting6 = {id: 4, title: '미팅', created: '2019-05-10T19:00:00+09:00', leader: 'def', min_people: 8, max_people: 10, state: 0, description: '미팅 구해요', kind: 5, due: '2019-05-16T19:00:00+09:00', picture: null, members: [1,2], leaderid: 1}
const meeting7 = {id: 4, title: '미팅', created: '2019-05-10T19:00:00+09:00', leader: 'def', min_people: 2, max_people: 4, state: 4, description: '미팅 구해요', kind: 5, due: '2019-05-16T19:00:00+09:00', picture: null, members: [1,2,7], leaderid: 1}


it('renders page when leader access', () => {
  const wrapper = wrap({ state: state1, meeting_info : meeting, change_meeting_state_click: onClick, join_meeting_click: onClick2, withdraw_meeting_click: onClick3, change_meeting_info_click: onClick4, load_leaderinfo_click: onClick5, prepare_load_leaderinfo_click: onClick6, prepare_load_memberinfo_click: onClick7, load_memberinfo_click: onClick8, accuse_click: onClick9})
  expect(wrapper.find('CloseButton')).toHaveLength(1)
  expect(wrapper.find('BreakUpButton')).toHaveLength(1)
  expect(wrapper.find('ModifyButton')).toHaveLength(1)

  onClick5.mockClear()
  onClick6.mockClear()
  expect(onClick5).not.toBeCalled()
  expect(onClick6).not.toBeCalled()
  wrapper.find('Dropdown').first().simulate('click')
  expect(onClick5).toBeCalled()
  expect(onClick6).toBeCalled()

  const wrapper2 = wrap({ state: state1, meeting_info : meeting2, change_meeting_state_click: onClick, join_meeting_click: onClick2, withdraw_meeting_click: onClick3, change_meeting_info_click: onClick4, load_leaderinfo_click: onClick5, prepare_load_leaderinfo_click: onClick6, prepare_load_memberinfo_click: onClick7, load_memberinfo_click: onClick8, accuse_click: onClick9})
  expect(wrapper2.find('ReOpenButton')).toHaveLength(1)
  expect(wrapper2.find('BreakUpButton')).toHaveLength(1)
  expect(wrapper2.find('ModifyButton')).toHaveLength(1)

  onClick5.mockClear()
  onClick6.mockClear()
  expect(onClick5).not.toBeCalled()
  expect(onClick6).not.toBeCalled()
  wrapper.find('Dropdown').first().simulate('click')
  expect(onClick5).toBeCalled()
  expect(onClick6).toBeCalled()

  const wrapper3 = wrap({ state: state1, meeting_info : meeting3, change_meeting_state_click: onClick, join_meeting_click: onClick2, withdraw_meeting_click: onClick3, change_meeting_info_click: onClick4, load_leaderinfo_click: onClick5, prepare_load_leaderinfo_click: onClick6, prepare_load_memberinfo_click: onClick7, load_memberinfo_click: onClick8, accuse_click: onClick9})
  expect(wrapper3.find('ReCloseButton')).toHaveLength(1)
  expect(wrapper3.find('BreakUpButton')).toHaveLength(1)
  expect(wrapper3.find('ModifyButton')).toHaveLength(1)

  onClick5.mockClear()
  onClick6.mockClear()
  expect(onClick5).not.toBeCalled()
  expect(onClick6).not.toBeCalled()
  wrapper.find('Dropdown').first().simulate('click')
  expect(onClick5).toBeCalled()
  expect(onClick6).toBeCalled()

  const wrapper4 = wrap({ state: state1, meeting_info : meeting4, change_meeting_state_click: onClick, join_meeting_click: onClick2, withdraw_meeting_click: onClick3, change_meeting_info_click: onClick4, load_leaderinfo_click: onClick5, prepare_load_leaderinfo_click: onClick6, prepare_load_memberinfo_click: onClick7, load_memberinfo_click: onClick8, accuse_click: onClick9})
  expect(wrapper4.find('BreakUpButton')).toHaveLength(1)
  expect(wrapper4.find('ModifyButton')).toHaveLength(1)

  onClick5.mockClear()
  onClick6.mockClear()
  expect(onClick5).not.toBeCalled()
  expect(onClick6).not.toBeCalled()
  wrapper.find('Dropdown').first().simulate('click')
  expect(onClick5).toBeCalled()
  expect(onClick6).toBeCalled()

  const wrapper5 = wrap({ state: state1, meeting_info : meeting5, change_meeting_state_click: onClick, join_meeting_click: onClick2, withdraw_meeting_click: onClick3, change_meeting_info_click: onClick4, load_leaderinfo_click: onClick5, prepare_load_leaderinfo_click: onClick6, prepare_load_memberinfo_click: onClick7, load_memberinfo_click: onClick8, accuse_click: onClick9})
  expect(wrapper5.find('CloseButton')).toHaveLength(0)
  expect(wrapper5.find('ReOpenButton')).toHaveLength(0)
  expect(wrapper5.find('ReCloseButton')).toHaveLength(0)
  expect(wrapper5.find('BreakUpButton')).toHaveLength(0)
  expect(wrapper5.find('ModifyButton')).toHaveLength(0)

  onClick5.mockClear()
  onClick6.mockClear()
  expect(onClick5).not.toBeCalled()
  expect(onClick6).not.toBeCalled()
  wrapper.find('Dropdown').first().simulate('click')
  expect(onClick5).toBeCalled()
  expect(onClick6).toBeCalled()
})

it('renders page when others access', () => {
  const wrapper = wrap({ state: state1, meeting_info : meeting7, change_meeting_state_click: onClick, join_meeting_click: onClick2, withdraw_meeting_click: onClick3, change_meeting_info_click: onClick4, load_leaderinfo_click: onClick5, prepare_load_leaderinfo_click: onClick6, prepare_load_memberinfo_click: onClick7, load_memberinfo_click: onClick8, accuse_click: onClick9})
  expect(wrapper.find('WithdrawButton')).toHaveLength(0)

  onClick5.mockClear()
  onClick6.mockClear()
  expect(onClick5).not.toBeCalled()
  expect(onClick6).not.toBeCalled()
  wrapper.find('Dropdown').first().simulate('click')
  expect(onClick5).toBeCalled()
  expect(onClick6).toBeCalled()

  const wrapper2 = wrap({ state: state1, meeting_info : meeting6, change_meeting_state_click: onClick, join_meeting_click: onClick2, withdraw_meeting_click: onClick3, change_meeting_info_click: onClick4, load_leaderinfo_click: onClick5, prepare_load_leaderinfo_click: onClick6, prepare_load_memberinfo_click: onClick7, load_memberinfo_click: onClick8, accuse_click: onClick9})
  expect(wrapper2.find('WithdrawButton')).toHaveLength(1)

  onClick5.mockClear()
  onClick6.mockClear()
  expect(onClick5).not.toBeCalled()
  expect(onClick6).not.toBeCalled()
  wrapper.find('Dropdown').first().simulate('click')
  expect(onClick5).toBeCalled()
  expect(onClick6).toBeCalled()

  const wrapper3 = wrap({ state: state2, meeting_info : meeting6, change_meeting_state_click: onClick, join_meeting_click: onClick2, withdraw_meeting_click: onClick3, change_meeting_info_click: onClick4, load_leaderinfo_click: onClick5, prepare_load_leaderinfo_click: onClick6, prepare_load_memberinfo_click: onClick7, load_memberinfo_click: onClick8, accuse_click: onClick9})
  expect(wrapper3.find('JoinButton')).toHaveLength(1)

  onClick5.mockClear()
  onClick6.mockClear()
  expect(onClick5).not.toBeCalled()
  expect(onClick6).not.toBeCalled()
  wrapper.find('Dropdown').first().simulate('click')
  expect(onClick5).toBeCalled()
  expect(onClick6).toBeCalled()
})