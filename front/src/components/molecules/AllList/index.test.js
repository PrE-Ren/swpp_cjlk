import React from 'react'
import { shallow } from 'enzyme'
import { AllList } from '.'

const wrap = (props = {}) => shallow(<AllList {...props} />)

it('renders same text when different children, props passed in', () => {
  const wrapper = wrap({meetinglist_all : JSON.stringify({results: [{id: 3, title: '미팅', created: '2019-05-10T19:00:00+09:00', leader: 'abc', min_people: 8, max_people: 10, state: 0, description: '미팅 구해요', kind: 5, due: '2019-05-16T19:00:00+09:00', picture: null, members: [1,2]}]})})
  expect(wrapper.contains('All')).toBe(true)
  expect(wrapper.contains('전체 검색 결과')).toBe(true)
  const wrapper2 = wrap({meetinglist_all : JSON.stringify({results:[{id: 4, title: '미팅아님', created: '2019-05-10T19:00:00+09:00', leader: 'abc', min_people: 8, max_people: 10, state: 0, description: '미팅 구해요', kind: 5, due: '2019-05-16T19:00:00+09:00', picture: null, members: [1,2]}]})})
  expect(wrapper.contains('All')).toBe(true)
  expect(wrapper2.contains('전체 검색 결과')).toBe(true)
})

it('renders nothing when null', () => {
  const wrapper = wrap({meetinglist_all : null})
  expect(wrapper.contains('All')).toBe(false)
  expect(wrapper.contains('전체 검색 결과')).toBe(false)
})
