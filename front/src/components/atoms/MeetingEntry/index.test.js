import React from 'react';
import configureMockStore from 'redux-mock-store';
import { mount, shallow, configure } from 'enzyme';
import MeetingEntry from '.';

const wrap = (props = {}) => shallow(<MeetingEntry {...props} />)

it('renders entry when passed in', () => {
  const wrapper = wrap({meeting_info : {id: 3, title: '미팅', created: '2019-05-10T19:00:00+09:00', leader: 'abc', min_people: 8, max_people: 10, state: 0, description: '미팅 구해요', kind: 5, due: '2019-05-16T19:00:00+09:00', picture: null, members: [1,2]}})
  expect(wrapper.contains('미팅')).toBe(true)
  expect(wrapper.contains(8)).toBe(true)
  expect(wrapper.contains(10)).toBe(true)
  expect(wrapper.contains('2019년 05월 16일 19:00:00')).toBe(true)
  expect(wrapper.contains('/')).toBe(true)
})


it('unfolded when Clicked', () => {
  const wrapper = wrap({meeting_info : {id: 3, title: '미팅', created: '2019-05-10T19:00:00+09:00', leader: 'abc', min_people: 8, max_people: 10, state: 0, description: '미팅 구해요', kind: 5, due: '2019-05-16T19:00:00+09:00', picture: null, members: [1,2]}})
  expect(wrapper.state('is_folded')).toBe(true)
  wrapper.find('div').first().simulate('click')
  expect(wrapper.state('is_folded')).toBe(false)
})
