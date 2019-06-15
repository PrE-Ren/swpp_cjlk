import { connect } from 'react-redux'
import { CommentList } from '../components/molecules/CommentList'
import { add_comment_action } from '../store/snu_moyeo/Comment/actions'

const mapStateToProps = (state) => {
  return {
    username : state.snu_moyeo.username,
    password : state.snu_moyeo.password,
    check_meeting_click : state.snu_moyeo.check_meeting_click,
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
