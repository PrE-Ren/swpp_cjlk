export const LOAD_COMMENTS_ACTION = 'LOAD_COMMENTS_ACTION'
export const LOAD_COMMENTS_SUCCESS_ACTION = 'LOAD_COMMENTS_SUCCESS_ACTION'
export const ADD_COMMENT_ACTION = 'ADD_COMMENT_ACTION'
export const EDIT_COMMENT_ACTION = 'EDIT_COMMENT_ACTION'
export const DELETE_COMMENT_ACTION = 'DELETE_COMMENT_ACTION'

export const load_comments_action = (meeting_id) => {
  return {
    type : LOAD_COMMENTS_ACTION,
    meeting_id
  }
}

export const load_comments_success_action = (comments) => {
  return {
    type : LOAD_COMMENTS_SUCCESS_ACTION,
    comments,
  }
}

export const add_comment_action = (hash, content, meeting_id) => {
  return {
    type : ADD_COMMENT_ACTION,
    hash,
    content,
    meeting_id
  }
}

export const edit_comment_action = (hash, comment_id, meeting_id, writer_id, content) => {
  return {
    type : EDIT_COMMENT_ACTION,
    hash,
    comment_id,
    meeting_id,
    writer_id,
    content
  }
}

export const delete_comment_action = (hash, comment_id, meeting_id) => {
  return {
    type : DELETE_COMMENT_ACTION,
    hash,
    comment_id,
    meeting_id
  }
}
