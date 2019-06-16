import { connect } from 'react-redux'
import { MeetingCreate } from '../components/molecules/MeetingCreate'
import { new_action, modify_action, change_map_true_action, change_map_false_action } from '../store/snu_moyeo/MeetingCreateModify/actions'

const mapStateToProps = (state) => {
  return {
    username : state.snu_moyeo.username,
    password : state.snu_moyeo.password,
    user_id : state.snu_moyeo.user_id,
    map_checked : state.snu_moyeo.map_checked
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    new_click: (hash, user_id, meeting_info) => {  //  hash는 주최자를 설정해주기 위해, 나머지는 Meeting/Participate 모델 POST를 위해 필요
      dispatch(new_action(hash, user_id, meeting_info))
    },
    modify_click : (hash, meeting_info) => {  //  hash는 주최자인지 판단하기 위해, meeting_info는 Meeting 모델 PUT을 위해 필요
      dispatch(modify_action(hash, meeting_info))
    },
    change_map_true : () => {
      dispatch(change_map_true_action())
    },
    change_map_false :() => {
      dispatch(change_map_false_action())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingCreate)
