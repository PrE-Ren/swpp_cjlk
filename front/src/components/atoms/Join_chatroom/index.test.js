import React from 'react'
import { shallow } from 'enzyme'
import { Join_chatroom } from '.'

const wrap = (props = {}) => shallow(<Join_chatroom {...props} />)

it('have meetinglist join', () => {
  const wrapper = wrap({meetinglist_join : JSON.stringify([{id: 3, title: '미팅', created: '2019-05-10T19:00:00+09:00', leader: 'abc', min_people: 8, max_people: 10, state: 0, description: '미팅 구해요', kind: 5, due: '2019-05-16T19:00:00+09:00', picture: null, members: [1,2]}])})
  expect(wrapper.contains('채팅방 빠른 입장')).toBe(true)
  const wrapper2 = wrap({meetinglist_join : JSON.stringify([{id: 4, title: '미팅아님', created: '2019-05-10T19:00:00+09:00', leader: 'abc', min_people: 8, max_people: 10, state: 0, description: '미팅 구해요', kind: 5, due: '2019-05-16T19:00:00+09:00', picture: null, members: [1,2]}])})
  expect(wrapper2.contains('채팅방 빠른 입장')).toBe(true)
})

it('not have meetinglist join'), () => {
  const wrapper = wrap({meetinglist_join : null})
  expect(wrapper.contains('채팅방 빠른 입장')).toBe(false)
}
