import React from 'react'
import { Button, Comment, Form, Header, Modal } from 'semantic-ui-react'

export const CommentList = ({ username, password, comments, meeting_id,
                              add_comment_click, edit_comment_click, delete_comment_click }) => {
  console.log('<CommentList Rendering>')
  const hash = new Buffer(`${username}:${password}`).toString('base64')

  function change_date(str){
    return str.substring(0,10) + " " + str.substring(11,19)
  }

  if (comments != null) {
    let comment_list = JSON.parse(comments)
    let content, new_content

    return (
      <Comment.Group style={{ marginLeft:'20px' }}>
        <Header as='h3' dividing>관련 댓글</Header>
        {comment_list.map(comment =>
          <Comment key = {comment.id} >
            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
            <Comment.Content>
              <Comment.Author as='a'>{comment.writer}</Comment.Author>
              <Comment.Metadata><div>{change_date(comment.created)}</div></Comment.Metadata>
              <Comment.Text>{comment.content}</Comment.Text>
              <Comment.Actions>

                <Modal size='small' trigger={ (username == comment.writer) ? <Comment.Action>수정</Comment.Action> : <div></div> }>
                  <Modal.Header>댓글 수정</Modal.Header>
                  <Form reply style={{ margin: '10px' }}>
                    <Form.TextArea defaultValue={comment.content} onChange={(e) => { new_content = e.target.value }}/>
                  </Form>
                  <Modal.Actions>
                    <Button positive icon='checkmark' labelPosition='right' content='완료' onClick={() => edit_comment_click(hash, comment.id, meeting_id, sessionStorage.getItem("user_id"), (new_content !== undefined) ? new_content : comment.content)}/>
                    <Button negative>취소</Button>
                  </Modal.Actions>
                </Modal>

                <Modal size='small' trigger={ (username == comment.writer) ? <Comment.Action>삭제</Comment.Action> : <div></div>}>
                  <Modal.Header>댓글 삭제</Modal.Header>
                  <Modal.Content><p>정말로 이 댓글을 삭제하시겠습니까?</p></Modal.Content>
                  <Modal.Actions>
                    <Button positive icon='checkmark' labelPosition='right' content='예' onClick={() => delete_comment_click(hash, comment.id)}/>
                    <Button negative>아니오</Button>
                  </Modal.Actions>
                </Modal>

              </Comment.Actions>
            </Comment.Content>
          </Comment>)}
        <Form reply>
          <Form.TextArea placeholder='Comment on this meeting...' onChange={(e) => { content = e.target.value }}/>
          <Button content='댓글 작성' labelPosition='left' icon='edit' primary onClick={() => add_comment_click(hash, content, meeting_id)}/>
        </Form>
      </Comment.Group>)
  }
  else
    return <div></div>
}
