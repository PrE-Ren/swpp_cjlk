import { connect } from 'react-redux'
import { Join_chatroom } from '../components/atoms/Join_chatroom'

const mapStateToProps = (state) => {
  return {
    meetinglist_join : state.snu_moyeo.meetinglist_join
  }
}

export default connect(mapStateToProps, null)(Join_chatroom)
