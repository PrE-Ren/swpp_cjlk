import React from 'react'
import { shallow } from 'enzyme'
import { CommentEntry } from '.'

const wrap = (props = {}) => shallow(<CommentEntry {...props} />)

const comment_info = {id: 1, created: '2019-05-10T19:00:00+09:00', writer: 'alice', content: 'bobisafool'}

const onClick = jest.fn()
const onClick2 = jest.fn()

it('renders children when passed in', () => {
  const wrapper = wrap({ comment_info: comment_info, username: 'alice', password: '0123', meeting_id: 1, edit_comment_click: onClick, delete_comment_click: onClick2 })
  onClick.mockClear()
  onClick2.mockClear()
  expect(wrapper.contains('수정')).toBe(true)
  expect(wrapper.contains('댓글 수정')).toBe(true)
  expect(wrapper.contains('취소')).toBe(true)
  expect(wrapper.contains('댓글 삭제')).toBe(true)
  expect(wrapper.contains('정말로 이 댓글을 삭제하시겠습니까?')).toBe(true)
  expect(wrapper.contains('아니오')).toBe(true)
  expect(onClick).not.toBeCalled()
  wrapper.find('Button').first().simulate('click')
  expect(onClick).toBeCalled()
  expect(onClick2).not.toBeCalled()
  wrapper.find('Button').at(2).simulate('click')
  expect(onClick2).toBeCalled()
})
