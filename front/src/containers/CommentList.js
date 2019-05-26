import { connect } from 'react-redux'
import { CommentList } from '../components/molecules/CommentList'
import { add_comment_action, /*edit_comment_action, */delete_comment_action } from '../store/snu_moyeo/actions'

const mapStateToProps = (state) => {
  return {
    username : state.snu_moyeo.username,
    password : state.snu_moyeo.password,
    comments : state.snu_moyeo.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    add_comment_click: (hash, description, meeting_id) => {
      dispatch(add_comment_action(hash, description, meeting_id))

    },
    /*edit_comment_click: (hash, comment) => {
      dispatch(edit_comment_action(hash, comment))
    },*/
    delete_comment_click: (hash, comment_id) => {
      dispatch(delete_comment_action(hash, comment_id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
