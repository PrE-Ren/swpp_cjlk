import React from 'react'
import { shallow } from 'enzyme'
import { RecentList } from '.'

const wrap = (props = {}) => shallow(<RecentList {...props} />)

it('renders same text when different children, props passed in', () => {
  const wrapper = wrap({meetinglist_recent : JSON.stringify([{id: 3, title: '미팅', created: '2019-05-10T19:00:00+09:00', leader: 'abc', min_people: 8, max_people: 10, state: 0, description: '미팅 구해요', kind: 5, due: '2019-05-16T19:00:00+09:00', picture: null, members: [1,2]}])})
  expect(wrapper.contains('New!')).toBe(true)
  expect(wrapper.contains('따끈따끈 방금 올라온 모임')).toBe(true)
  const wrapper2 = wrap({meetinglist_recent : JSON.stringify([{id: 4, title: '미팅아님', created: '2019-05-10T19:00:00+09:00', leader: 'abc', min_people: 8, max_people: 10, state: 0, description: '미팅 구해요', kind: 5, due: '2019-05-16T19:00:00+09:00', picture: null, members: [1,2]}])})
  expect(wrapper.contains('New!')).toBe(true)
  expect(wrapper2.contains('따끈따끈 방금 올라온 모임')).toBe(true)
})

it('renders nothing when null', () => {
  const wrapper = wrap({meetinglist_recent : null})
  expect(wrapper.contains('New!')).toBe(false)
  expect(wrapper.contains('따끈따끈 방금 올라온 모임')).toBe(false)
})