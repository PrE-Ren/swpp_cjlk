import React from 'react'
import { Button, Comment, Form, Header, Modal } from 'semantic-ui-react'

// username : 유저 아이디 (해시값을 얻기 위해 필요)
// password : 유저 패스워드 (해시값을 얻기 위해 필요)
// comments : 댓글 리스트
// meeting_id : 미팅 게시물 고유값
// add_comment_click : 댓글 작성할 때 액션을 디스패치할 함수
// edit_comment_click : 댓글 수정할 때 액션을 디스패치할 함수
// delete_comment_click : 댓글 삭제할 때 액션을 디스패치할 함수
export const CommentList = ({ username, password, comments, meeting_id,
                              add_comment_click, edit_comment_click, delete_comment_click }) => {
  console.log('<CommentList Rendering>')
  const hash = new Buffer(`${username}:${password}`).toString('base64')  //  유저의 해시값
  const change_date = (str) => str.substring(0, 10) + " " + str.substring(11, 19)  //  날짜 보기 좋게 바꾸는 함수

  if (comments != null) {
    let comment_list = JSON.parse(comments)  //  댓글 리스트
    let content      //  댓글 작성 시 입력하는 내용
    let new_content  //  댓글 수정 시 새로 입력하는 내용

    return (
      <Comment.Group style={{ marginLeft:'20px' }}>
        <Header as='h3' dividing> 관련 댓글 </Header>
        {comment_list.map(comment =>
          <Comment key = {comment.id} >
            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
            <Comment.Content>

              {/* 댓글 내용 */}
              <Comment.Author as='a'>{comment.writer}</Comment.Author>
              <Comment.Metadata><div>{change_date(comment.created)}</div></Comment.Metadata>
              <Comment.Text>{comment.content}</Comment.Text>
              <Comment.Actions>

                {/* 댓글 수정 */}
                <Modal size='small' trigger={ (username == comment.writer) ? <Comment.Action> 수정 </Comment.Action> : <div></div> }>
                  <Modal.Header> 댓글 수정 </Modal.Header>
                  <Form reply style={{ margin: '10px' }}>
                    <Form.TextArea defaultValue={comment.content} onChange={(e) => { new_content = e.target.value }}/>
                  </Form>
                  <Modal.Actions>
                    <Button positive icon='checkmark' labelPosition='right' content='완료' onClick={() => edit_comment_click(hash, comment.id, meeting_id, sessionStorage.getItem("user_id"), (new_content !== undefined) ? new_content : comment.content)}/>
                    <Button negative> 취소 </Button>
                  </Modal.Actions>
                </Modal>

                {/* 댓글 삭제 */}
                <Modal size='small' trigger={ (username == comment.writer) ? <Comment.Action> 삭제 </Comment.Action> : <div></div>}>
                  <Modal.Header> 댓글 삭제 </Modal.Header>
                  <Modal.Content><p> 정말로 이 댓글을 삭제하시겠습니까? </p></Modal.Content>
                  <Modal.Actions>
                    <Button positive icon='checkmark' labelPosition='right' content='예' onClick={() => delete_comment_click(hash, comment.id, meeting_id)}/>
                    <Button negative> 아니오 </Button>
                  </Modal.Actions>
                </Modal>

              </Comment.Actions>
            </Comment.Content>
          </Comment>)}

        {/* 댓글 작성 */}
        <Form reply>
          <Form.TextArea id="comment" placeholder='Comment on this meeting...' onChange={(e) => { content = e.target.value }}/>
          <Button content='댓글 작성' labelPosition='left' icon='edit' primary onClick={() => { add_comment_click(hash, content, meeting_id); document.getElementById("comment").value = ""; }}/>
        </Form>
      </Comment.Group>)
  }
  else
    return (<div></div>)
}
