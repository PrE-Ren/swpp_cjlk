import { connect } from 'react-redux'
import { CommentList } from '../components/molecules/CommentList'
import { add_comment_action, edit_comment_action, delete_comment_action } from '../store/snu_moyeo/actions'

const mapStateToProps = (state) => {
  return {
    username : state.snu_moyeo.username,
    password : state.snu_moyeo.password,
    check_meeting_click : state.snu_moyeo.check_meeting_click
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    add_comment_click: (hash, content, meeting_id) => {  //  댓글 작성
      dispatch(add_comment_action(hash, content, meeting_id))
    },
    edit_comment_click: (hash, comment_id, meeting_id, writer_id, content) => {  //  댓글 수정
      dispatch(edit_comment_action(hash, comment_id, meeting_id, writer_id, content))
    },
    delete_comment_click: (hash, comment_id, meeting_id) => {  //  댓글 삭제
      dispatch(delete_comment_action(hash, comment_id, meeting_id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
