import React from 'react'
import { shallow } from 'enzyme'
import { KindList } from '.'

const wrap = (props = {}) => shallow(<KindList {...props} />)

it('renders same text when different children, props passed in', () => {
  const wrapper = wrap({meetinglist_list : JSON.stringify({results: [{id: 3, title: '미팅', created: '2019-05-10T19:00:00+09:00', leader: 'abc', min_people: 8, max_people: 10, state: 0, description: '미팅 구해요', kind: 5, due: '2019-05-16T19:00:00+09:00', picture: null, members: [1,2]}]})})
  expect(wrapper.contains('모집 중인 모임')).toBe(true)
  const wrapper2 = wrap({meetinglist_list : JSON.stringify({results: [{id: 3, title: '미팅', created: '2019-05-10T19:00:00+09:00', leader: 'abc', min_people: 8, max_people: 10, state: 0, description: '미팅 구해요', kind: 5, due: '2019-05-16T19:00:00+09:00', picture: null, members: [1,2]}]})})
  expect(wrapper2.contains('모집 중인 모임')).toBe(true)
})

it('renders nothing when null', () => {
  const wrapper = wrap({meetinglist_list : null})
  expect(wrapper.contains('모집 중인 모임')).toBe(false)
})