import { connect } from 'react-redux'
import { MeetingCreate } from '../components/molecules/MeetingCreate'
import { new_action, modify_action } from '../store/snu_moyeo/actions'

const mapStateToProps = (state) => {
  return {
    username : state.snu_moyeo.username,
    password : state.snu_moyeo.password,
    user_id : state.snu_moyeo.user_id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    new_click: (hash, user_id, meeting_info) => {
      dispatch(new_action(hash, user_id, meeting_info))
    },
    modify_click : (hash, user_id, meeting_info) => {
      dispatch(modify_action(hash, user_id, meeting_info))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingCreate)
