import React from 'react'
import { shallow } from 'enzyme'
import { CommentList } from '.'

const wrap = (props = {}) => shallow(<CommentList {...props} />)
const comments = JSON.stringify([{id: 2, created: '2019-05-10T19:00:00+09:00', writer: 'alice0123', writerid: 1, meetingid: 3, content: "hey"}])

it('renders text when loaded, calls Onclick when clicked', () => {
  sessionStorage.setItem("comments", comments)
  const wrapper = wrap({ username: 'alice0123', password: '0123', is_comment_loaded: true, comments: comments, meeting_id: 3})
  expect(wrapper.contains('관련 댓글')).toBe(true)
})

it('renders loader when loading', () => {
  const wrapper = wrap({ username: 'alice0123', password: '0123', is_comment_loaded: false, comments: comments, meeting_id: 3})
  expect(wrapper.contains('관련 댓글')).toBe(false)
  expect(wrapper.find('Loader')).toHaveLength(1)
})