import React from 'react'
import { shallow } from 'enzyme'
import { MeetingCreate } from '.'

const wrap = (props = {}) => shallow(<MeetingCreate {...props} />)

const onClick = jest.fn()
const onClick2 = jest.fn()

// New
it('new meeting create', () => {
  //onClick.mockClear()
  const wrapper = wrap({ username: 'a', password: '1234', user_id: 0, new_click: onClick, modify_click: onClick2 })
  expect(wrapper.contains('완료')).toBe(true)
  /*
  expect(onClick).not.toBeCalled()
  wrapper.find('#Button').first().simulate('click')
  expect(onClick).toBeCalled()
  */
})

// Modify
it('modify meeting', () => {
  //onClick2.mockClear()
  sessionStorage.setItem('meeting_info', JSON.stringify({id: 3, title: '미팅', created: '2019-05-10T19:00:00+09:00', leader: 'abc', min_people: 8, max_people: 10, state: 0, description: '미팅 구해요', kind: 5, due: '2019-05-16T19:00:00+09:00', picture: null, members: [1,2]}))
  const wrapper = wrap({ username: 'a', password: '1234', user_id: 0, new_click: onClick, modify_click: onClick2 })
  expect(wrapper.contains('수정')).toBe(true)
  /*
  expect(onClick2).not.toBeCalled()
  wrapper.find('#Button').first().simulate('click')
  expect(onClick2).toBeCalled()
  */
})