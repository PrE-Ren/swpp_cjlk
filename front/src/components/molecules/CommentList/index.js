import React from 'react'
import CommentEntry from '../../../containers/CommentEntry'
import { Button, Comment, Form, Header, Modal, Loader } from 'semantic-ui-react'

// username : 유저 아이디 (해시값을 얻기 위해 필요)
// password : 유저 패스워드 (해시값을 얻기 위해 필요)
// is_comment_loaded : 댓글 리스트 로드 여부
// comments : 댓글 목록 (댓글 목록을 불러올 때마다 리렌더링하기 위해 필요)
// meeting_id : 미팅 게시물 고유값
// add_comment_click : 댓글 작성할 때 액션을 디스패치할 함수
export class CommentList extends React.Component {
  render() {
    console.log('<CommentList Rendering>')
    const { username, password, is_comment_loaded, comments, meeting_id, add_comment_click } = this.props
    const hash = new Buffer(`${username}:${password}`).toString('base64')  //  유저의 해시값

    // 댓글 목록 로드가 완료되었다면
    if (is_comment_loaded) {
      let comment_list = JSON.parse(sessionStorage.getItem("comments"))
      let content  //  댓글 작성 시 입력하는 내용

      return (
        <Comment.Group>
          <Header as='h3' dividing>관련 댓글</Header>

          {/* 댓글 각각을 렌더링 */}
          {comment_list.map(comment_entry =>
            <Comment key = {comment_entry.id}>
              <CommentEntry comment_info={comment_entry} username={username} password={password} meeting_id={meeting_id}/>
            </Comment>
          )}

          {/* 댓글 작성 */}
          <Form reply>
            <Form.TextArea id="comment" placeholder='댓글은 400자 이내로 작성해주세요.' onChange={(e) => { content = e.target.value }}/>
            <Button content='댓글 작성' labelPosition='left' icon='edit' primary
                    onClick={() => { add_comment_click(hash, content, meeting_id), document.getElementById("comment").value = "" }}/>
          </Form>
        </Comment.Group>
      )
    }
    else
      return <Loader active inline />
  }
}
