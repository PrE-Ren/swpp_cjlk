import React from 'react'
import { PropTypes } from 'prop-types'
import { Button, Comment, Form, Header } from 'semantic-ui-react'

export const CommentList = ({ username, password, comments, meeting_id, add_comment_click }) => {
  console.log('<CommentList Rendering>')
  const hash = new Buffer(`${username}:${password}`).toString('base64')

  if (comments != null) {
    let comment_list = JSON.parse(comments)
    let description
    return (
      <Comment.Group style={{ marginLeft:'20px' }}>
        <Header as='h3' dividing>Comments</Header>
        {comment_list.map(comment =>
          <Comment key = {comment.id} >
            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
            <Comment.Content>
              <Comment.Author as='a'>{comment.writer}</Comment.Author>
              <Comment.Metadata><div>{comment.created}</div></Comment.Metadata>
              <Comment.Text>{comment.content}</Comment.Text>
              <Comment.Actions><Comment.Action>Reply</Comment.Action></Comment.Actions>
            </Comment.Content>
          </Comment>)}
        <Form reply>
          <Form.TextArea placeholder='Comment on this meeting...' onChange={(e) => { description = e.target.value }}/>
          <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={() => add_comment_click(hash, description, meeting_id)}/>
        </Form>
      </Comment.Group>)
  }
  else
    return <div></div>
}

CommentList.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}
