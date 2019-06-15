import { connect } from 'react-redux'
import { MeetingInfo } from '../components/molecules/MeetingInfo'
import { change_meeting_state_action, change_meeting_info_action } from '../store/snu_moyeo/MeetingCreateModify/actions'
import { join_meeting_action, withdraw_meeting_action } from '../store/snu_moyeo/MeetingJoinWithdraw/actions'
import { load_leaderinfo_action, load_memberinfo_action, check_member_action } from '../store/snu_moyeo/UserLoad/actions'
import { accuse_action } from '../store/snu_moyeo/Admin/actions';

const mapStateToProps = (state, own_props) => {
  return {
    state : state.snu_moyeo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    change_meeting_state_click: (hash, meeting_info, new_state) => {  //  모임의 상태를 변경
      dispatch(change_meeting_state_action(hash, meeting_info, new_state))
    },
    join_meeting_click: (hash, user_id, meeting_id) => {  //  모임에 참가
      dispatch(join_meeting_action(hash, user_id, meeting_id))
    },
    withdraw_meeting_click: (hash, user_id, meeting_id) => {  //  모임에서 탈퇴
      dispatch(withdraw_meeting_action(hash, user_id, meeting_id))
    },
    change_meeting_info_click: (meeting_info) => {  //  모임 수정
      dispatch(change_meeting_info_action(meeting_info))
    },
    load_leaderinfo_click : (user_id) => {  //  리더 정보를 로드하여 세션 스토리지에 저장 후 플래그 설정
      dispatch(load_leaderinfo_action(user_id))
    },
    load_memberinfo_click : (members) => {  //  참여 멤버들 정보를 로드하여 세션 스토리지에 저장 후 플래그 설정
      dispatch(load_memberinfo_action(members))
    },
    accuse_click : (hash, accuse_reason, member_id) => {
      dispatch(accuse_action(hash, accuse_reason, member_id))
    },
    check_member_click : () => {
      dispatch(check_member_action())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingInfo)
