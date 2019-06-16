import React from 'react'
import { shallow } from 'enzyme'
import { LeadList } from '.'

const wrap = (props = {}) => shallow(<LeadList {...props} />)

it('renders same text when different children, props passed in', () => {
  const wrapper = wrap({meetinglist_lead : JSON.stringify([{id: 3, title: '미팅', created: '2019-05-10T19:00:00+09:00', leader: 'abc', min_people: 8, max_people: 10, state: 0, description: '미팅 구해요', kind: 5, due: '2019-05-16T19:00:00+09:00', picture: null, members: [1,2]}])})
  expect(wrapper.contains('I am leader!')).toBe(true)
  expect(wrapper.contains('내가 만든 모임')).toBe(true)
  const wrapper2 = wrap({meetinglist_lead : JSON.stringify([{id: 4, title: '미팅아님', created: '2019-05-10T19:00:00+09:00', leader: 'abc', min_people: 8, max_people: 10, state: 0, description: '미팅 구해요', kind: 5, due: '2019-05-16T19:00:00+09:00', picture: null, members: [1,2]}])})
  expect(wrapper.contains('I am leader!')).toBe(true)
  expect(wrapper2.contains('내가 만든 모임')).toBe(true)
})

it('renders nothing when null', () => {
  const wrapper = wrap({meetinglist_lead : null})
  expect(wrapper.contains('I am leader!')).toBe(false)
  expect(wrapper.contains('내가 만든 모임')).toBe(false)
})