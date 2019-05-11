import { connect } from 'react-redux'
import { MeetingInfo } from '../components/molecules/MeetingInfo'
import { change_meeting_state_action, join_meeting_action } from '../store/snu_moyeo/actions'

const mapStateToProps = (state, own_props) => {
  return {
    state : state.snu_moyeo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    stateReq: (username, password, meeting_info, new_state) => {
      dispatch(change_meeting_state_action(username, password, meeting_info, new_state))
    },
    participateReq: (username, password, user_id, meeting_id) => {
      dispatch(join_meeting_action(username, password, user_id, meeting_id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingInfo)
