import React from 'react'
import { shallow } from 'enzyme'
import { ModifyButton, CloseButton, BreakUpButton, ReOpenButton, ReCloseButton, JoinButton, WithdrawButton } from '.'

const onClick = jest.fn()
const wrap = (props = {}) => shallow(<ModifyButton {...props} />)
const wrap2 = (props = {}) => shallow(<CloseButton {...props} />)
const wrap3 = (props = {}) => shallow(<BreakUpButton {...props} />)
const wrap4 = (props = {}) => shallow(<ReOpenButton {...props} />)
const wrap5 = (props = {}) => shallow(<ReCloseButton {...props} />)
const wrap6 = (props = {}) => shallow(<JoinButton {...props} />)
const wrap7 = (props = {}) => shallow(<WithdrawButton {...props} />)

const meeting = {id: 3, title: '미팅', created: '2019-06-02T19:00:00+09:00', leader: 'abc', min_people: 2, max_people: 4, state: 0, description: '미팅 구해요', kind: 5, due: '2019-07-16T19:00:00+09:00', picture: null, members: [1]}
const meeting2 = {id: 3, title: '미팅', created: '2019-06-02T19:00:00+09:00', leader: 'abc', min_people: 2, max_people: 4, state: 0, description: '미팅 구해요', kind: 5, due: '2019-07-16T19:00:00+09:00', picture: null, members: [1,2]}
const meeting3 = {id: 3, title: '미팅', created: '2019-06-02T19:00:00+09:00', leader: 'abc', min_people: 2, max_people: 4, state: 0, description: '미팅 구해요', kind: 5, due: '2019-07-16T19:00:00+09:00', picture: null, members: [1,2,3,4]}
const hash = "abcd"

//ModifyButton : If modifiable
it('renders same text, calls onClick when Clicked', () => {
  onClick.mockClear()
  const wrapper = wrap({meeting_info: meeting, f: onClick})
  expect(wrapper.contains('수정')).toBe(true)
  expect(onClick).not.toBeCalled()
  wrapper.simulate('click')
  expect(onClick).toBeCalled()
})

//ModifyButton : If not modifiable
it('renders same text, not calls onClick when Clicked', () => {
  onClick.mockClear()
  const wrapper = wrap({meeting_info: meeting2, f: onClick})
  expect(wrapper.contains('수정')).toBe(true)
  expect(onClick).not.toBeCalled()
  wrapper.simulate('click')
  expect(onClick).not.toBeCalled()
})

//CloseButton : If not closeable
it('renders same text, not calls onClick when Clicked', () => {
  onClick.mockClear()
  const wrapper = wrap2({meeting_info: meeting, f: onClick, hash: hash})
  expect(wrapper.contains('마감')).toBe(true)
  expect(onClick).not.toBeCalled()
  wrapper.simulate('click')
  expect(onClick).not.toBeCalled()
})

//CloseButton : If closeable
it('renders same text, calls onClick when Clicked', () => {
  onClick.mockClear()
  const wrapper = wrap2({meeting_info: meeting2, f: onClick, hash: hash})
  expect(wrapper.contains('마감')).toBe(true)
  expect(onClick).not.toBeCalled()
  wrapper.simulate('click')
  expect(onClick).toBeCalled()
})

//BreakUpButton
it('renders same text, calls onClick when Clicked', () => {
  onClick.mockClear()
  const wrapper = wrap3({meeting_info: meeting, f: onClick, hash: hash})
  expect(wrapper.contains('해산')).toBe(true)
  expect(onClick).not.toBeCalled()
  wrapper.simulate('click')
  expect(onClick).toBeCalled()
})

//ReOpenButton
it('renders same text, calls onClick when Clicked', () => {
  onClick.mockClear()
  const wrapper = wrap4({meeting_info: meeting, f: onClick, hash: hash})
  expect(wrapper.contains('추가 모집 시작')).toBe(true)
  expect(onClick).not.toBeCalled()
  wrapper.simulate('click')
  expect(onClick).toBeCalled()
})

//ReCloseButton
it('renders same text, calls onClick when Clicked', () => {
  onClick.mockClear()
  const wrapper = wrap5({meeting_info: meeting, f: onClick, hash: hash})
  expect(wrapper.contains('추가 모집 중단')).toBe(true)
  expect(onClick).not.toBeCalled()
  wrapper.simulate('click')
  expect(onClick).toBeCalled()
})

//JoinButton : If joinable
it('renders same text, calls onClick when Clicked', () => {
  onClick.mockClear()
  const wrapper = wrap6({meeting_info: meeting, f: onClick, hash: hash})
  expect(wrapper.contains('참가')).toBe(true)
  expect(onClick).not.toBeCalled()
  wrapper.simulate('click')
  expect(onClick).toBeCalled()
})

//JoinButton : If not joinable
it('renders same text, calls onClick when Clicked', () => {
  onClick.mockClear()
  const wrapper = wrap6({meeting_info: meeting3, f: onClick, hash: hash})
  expect(wrapper.contains('참가')).toBe(true)
  expect(onClick).not.toBeCalled()
  wrapper.simulate('click')
  expect(onClick).not.toBeCalled()
})

//WithdrawButton
it('renders same text, calls onClick when Clicked', () => {
  onClick.mockClear()
  const wrapper = wrap7({meeting_info: meeting, f: onClick, hash: hash})
  expect(wrapper.contains('탈퇴')).toBe(true)
  expect(onClick).not.toBeCalled()
  wrapper.simulate('click')
  expect(onClick).toBeCalled()
})

