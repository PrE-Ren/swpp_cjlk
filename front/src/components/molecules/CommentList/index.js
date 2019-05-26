import React from 'react'
import { PropTypes } from 'prop-types'
import { Button, Comment, Form, Header, Modal } from 'semantic-ui-react'

export const CommentList = ({ username, password, comments, meeting_id,
                              add_comment_click, edit_comment_click, delete_comment_click }) => {
  console.log('<CommentList Rendering>')
  const hash = new Buffer(`${username}:${password}`).toString('base64')

  if (comments != null) {
    let comment_list = JSON.parse(comments)
    let content, new_content

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
              <Comment.Actions>
                <Modal size='small' trigger={ (username == comment.writer) ? <Comment.Action>Edit</Comment.Action> : <div></div> }>
                  <Modal.Header>Edit Your Comment</Modal.Header>
                  <Form reply style={{ margin: '10px' }}>
                    <Form.TextArea defaultValue={comment.content} onChange={(e) => { new_content = e.target.value }}/>
                  </Form>
                  <Modal.Actions>
                    <Button positive icon='checkmark' labelPosition='right' content='Edit' onClick={() => edit_comment_click(hash, comment.id, meeting_id, localStorage.getItem("user_id"), (new_content !== undefined) ? new_content : comment.content)}/>
                    <Button negative>Cancle</Button>
                  </Modal.Actions>
                </Modal>
                <Modal size='small' trigger={ (username == comment.writer) ? <Comment.Action>Delete</Comment.Action> : <div></div>}>
                  <Modal.Header>Delete Your Comment</Modal.Header>
                  <Modal.Content><p>Do you want to delete this comment?</p></Modal.Content>
                  <Modal.Actions>
                    <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={() => delete_comment_click(hash, comment.id)}/>
                    <Button negative>No</Button>
                  </Modal.Actions>
                </Modal>
              </Comment.Actions>
            </Comment.Content>
          </Comment>)}
        <Form reply>
          <Form.TextArea placeholder='Comment on this meeting...' onChange={(e) => { content = e.target.value }}/>
          <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={() => add_comment_click(hash, content, meeting_id)}/>
        </Form>
      </Comment.Group>)
  }
  else
    return <div></div>
}
