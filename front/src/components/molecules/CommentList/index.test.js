import React from 'react'
import { shallow } from 'enzyme'
import { CommentList } from '.'

const wrap = (props = {}) => shallow(<CommentList {...props} />)
const comments = JSON.stringify([{id: 2, created: '2019-05-10T19:00:00+09:00', writer: 'alice0123', writerid: 1, meetingid: 3, content: "hey"}])
const onClick = jest.fn()
const onClick2 = jest.fn()
const onClick3 = jest.fn()

it('renders same text, calls Onclick when clicked', () => {
  onClick.mockClear()
  onClick2.mockClear()
  onClick3.mockClear()
  const wrapper = wrap({ username: 'alice0123', password: '0123', comments: comments, meeting_id: 3, add_comment_click: onClick, edit_comment_click: onClick2, delete_comment_click: onClick3})
  expect(wrapper.contains('관련 댓글')).toBe(true)
  expect(wrapper.contains('댓글 수정')).toBe(true)
  expect(wrapper.contains('취소')).toBe(true)
  expect(wrapper.contains('댓글 삭제')).toBe(true)
  expect(wrapper.contains('정말로 이 댓글을 삭제하시겠습니까?')).toBe(true)
  expect(wrapper.contains('아니오')).toBe(true)
  expect(onClick2).not.toBeCalled()
  wrapper.find('Button').first().simulate('click')
  expect(onClick2).toBeCalled()
  expect(onClick3).not.toBeCalled()
  wrapper.find('Button').at(2).simulate('click')
  expect(onClick3).toBeCalled()
  expect(onClick).not.toBeCalled()
  wrapper.find('Button').at(4).simulate('click')
  expect(onClick).toBeCalled()
})