import { connect } from 'react-redux'
import { MeetingInfo } from '../components/molecules/MeetingInfo'
import { change_meeting_state_action, join_meeting_action, withdraw_meeting_action, change_meeting_info_action } from '../store/snu_moyeo/actions'

const mapStateToProps = (state, own_props) => {
  return {
    state : state.snu_moyeo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    change_meeting_state_click: (hash, meeting_info, new_state) => {
      dispatch(change_meeting_state_action(hash, meeting_info, new_state))
    },
    join_meeting_click: (hash, user_id, meeting_id) => {
      dispatch(join_meeting_action(hash, user_id, meeting_id))
    },
    withdraw_meeting_click: (hash, user_id, meeting_id) => {
      dispatch(withdraw_meeting_action(hash, user_id, meeting_id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingInfo)
