import { connect } from 'react-redux'
import { CommentList } from '../components/molecules/CommentList'
import { add_comment_action } from '../store/snu_moyeo/Comment/actions'

const mapStateToProps = (state) => {
  return {
    username : state.snu_moyeo.username,
    password : state.snu_moyeo.password,
    is_comment_loaded : state.snu_moyeo.is_comment_loaded,
    comments : state.snu_moyeo.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    add_comment_click: (hash, content, meeting_id) => {  //  댓글 작성
      dispatch(add_comment_action(hash, content, meeting_id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
