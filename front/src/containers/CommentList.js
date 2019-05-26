import { connect } from 'react-redux'
import { CommentList } from '../components/molecules/CommentList'

const mapStateToProps = (state) => {
  return {
    comments : state.snu_moyeo.comments
  }
}

export default connect(mapStateToProps, null)(CommentList)
