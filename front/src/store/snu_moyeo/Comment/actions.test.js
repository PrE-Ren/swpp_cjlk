import * as actions from './actions'

it('test load_comments_action', () => {
  const meeting_id = '1'

  const expectedAction = {
    type: actions.LOAD_COMMENTS_ACTION,
    meeting_id
  }
  expect(actions.load_comments_action(meeting_id)).toEqual(expectedAction)
})

it('test load_comments_success_action', () => {
  const comments = '[]'

  const expectedAction = {
    type: actions.LOAD_COMMENTS_SUCCESS_ACTION,
    comments
  }
  expect(actions.load_comments_success_action(comments)).toEqual(expectedAction)
})

it('test add_comment_action', () => {
  const hash = '123sad'
  const content = '[]'
  const meeting_id = '1'

  const expectedAction = {
    type: actions.ADD_COMMENT_ACTION,
    hash,
    content,
    meeting_id
  }
  expect(actions.add_comment_action(hash, content, meeting_id)).toEqual(expectedAction)
})

it('test edit_comment_action', () => {
  const hash = '123sad'
  const comment_id = '2'
  const meeting_id = '1'
  const writer_id = '3'
  const content = '[]'

  const expectedAction = {
    type: actions.EDIT_COMMENT_ACTION,
    hash,
    comment_id,
    meeting_id,
    writer_id,
    content
  }
  expect(actions.edit_comment_action(hash, comment_id, meeting_id, writer_id, content)).toEqual(expectedAction)
})

it('test delete_comment_action', () => {
  const hash = '123sad'
  const comment_id = '1'
  const meeting_id = '1'
  const expectedAction = {
    type: actions.DELETE_COMMENT_ACTION,
    hash,
    comment_id,
    meeting_id
  }
  expect(actions.delete_comment_action(hash, comment_id, meeting_id)).toEqual(expectedAction)
})
