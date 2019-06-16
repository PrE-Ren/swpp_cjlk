import { connect } from 'react-redux'
import { CommentEntry } from '../components/atoms/CommentEntry'
import { edit_comment_action, delete_comment_action } from '../store/snu_moyeo/Comment/actions'

const mapDispatchToProps = (dispatch) => {
  return {
    edit_comment_click: (hash, comment_id, meeting_id, writer_id, content) => {  //  댓글 수정
      dispatch(edit_comment_action(hash, comment_id, meeting_id, writer_id, content))
    },
    delete_comment_click: (hash, comment_id, meeting_id) => {  //  댓글 삭제
      dispatch(delete_comment_action(hash, comment_id, meeting_id))
    }
  }
}

export default connect(null, mapDispatchToProps)(CommentEntry)
