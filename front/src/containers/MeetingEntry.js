import { connect } from 'react-redux'
import { MeetingEntry } from '../components/atoms/MeetingEntry'
import { load_comments_action } from '../store/snu_moyeo/actions'

const mapDispatchToProps = (dispatch) => {
  return {
    load_comments_click: (meeting_id) => {
      dispatch(load_comments_action(meeting_id))
    }
  }
}

export default connect(null, mapDispatchToProps)(MeetingEntry)
