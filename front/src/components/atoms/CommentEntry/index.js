import React from 'react'
import { Button, Comment, Form, Modal } from 'semantic-ui-react'

// comment_info : id, wrtier, writerid, meetingid, content, created
// username : 유저 아이디
// password : 유저 패스워드
// meeting_id : 미팅 게시물 고유값
// edit_comment_click : 댓글 수정할 때 액션을 디스패치할 함수
// delete_comment_click : 댓글 삭제할 때 액션을 디스패치할 함수
export class CommentEntry extends React.Component {
  state = { edit_open: false, delete_open: false }
  edit_show = () => this.setState({ edit_open: true })
  edit_close = () => this.setState({ edit_open: false})
  delete_show = () => this.setState({ delete_open: true })
  delete_close = () => this.setState({ delete_open: false })

  render() {
    const { comment_info, username, password, meeting_id, edit_comment_click, delete_comment_click } = this.props
    const change_date = (str) => str.substring(0, 10) + " " + str.substring(11, 19)  //  날짜 보기 좋게 바꾸는 함수
    const hash = new Buffer(`${username}:${password}`).toString('base64')  //  유저의 해시값
    let new_content  //  댓글 수정 시 새로 입력하는 내용

    return (
      <span>
        {/* 프로필 사진 */}
        <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' style={{ marginRight:'10px'}}/>
        <Comment.Content>

          {/* 댓글 작성자 및 작성 날짜 */}
          <Comment.Author as='a'> {comment_info.writer} </Comment.Author>
          <Comment.Metadata style={{ marginRight:'10px'}}> {change_date(comment_info.created)} </Comment.Metadata>

          {/* 댓글 수정 및 삭제 */}
          <Comment.Actions as='a'>
            {(username == comment_info.writer) ? <Comment.Action as='span' style={{ cursor: 'pointer' }} onClick={this.edit_show}>수정</Comment.Action> : <div></div>}
            <Modal size='small' open={this.state.edit_open} onClose={this.edit_close}>
              <Modal.Header>댓글 수정</Modal.Header>
              <Form reply style={{ margin: '10px' }}>
                <Form.TextArea defaultValue={comment_info.content} onChange={(e) => { new_content = e.target.value }}/>
              </Form>
              <Modal.Actions>
                <Button positive icon='checkmark' labelPosition='right' content='완료'
                        onClick={() => { edit_comment_click(hash, comment_info.id, meeting_id, sessionStorage.getItem("user_id"),
                                         (new_content !== undefined) ? new_content : comment_info.content); this.edit_close() }}/>
                <Button negative onClick={this.edit_close}>취소</Button>
              </Modal.Actions>
            </Modal>

            <span>&ensp;</span>

            {(username == comment_info.writer) ? <Comment.Action as='span' style={{ cursor: 'pointer' }} onClick={this.delete_show}>삭제</Comment.Action> : <div></div>}
            <Modal size='small' open={this.state.delete_open} onClose={this.delete_close}>
              <Modal.Header>댓글 삭제</Modal.Header>
              <Modal.Content><p>정말로 이 댓글을 삭제하시겠습니까?</p></Modal.Content>
              <Modal.Actions>
                <Button positive icon='checkmark' labelPosition='right' content='예'
                        onClick={() => { delete_comment_click(hash, comment_info.id, meeting_id); this.delete_close() }}/>
                <Button negative onClick={this.delete_close}>아니오</Button>
              </Modal.Actions>
            </Modal>
          </Comment.Actions>

          {/* 댓글 내용 */}
          <Comment.Text> {comment_info.content} </Comment.Text>

        </Comment.Content>
      </span>
    )
  }
}
