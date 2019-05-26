import React from 'react'
import { PropTypes } from 'prop-types'

const CommentList = ({ comments }) => {
  console.log('<CommentList Rendering>')
  if (comments != null) {
    let comments = JSON.parse(comments)
    return (
      <div>
        {comments.map(comment =>
          <div key = {comment.id} >
            {comment.id}<br/>
            {comment.writer}<br/>
            {comment.content}<br/>
          </div>
        )}
      </div>
    )
  }
  else
    return <div></div>
}

export default CommentList
