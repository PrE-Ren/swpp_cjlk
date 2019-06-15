import { connect } from 'react-redux'
import { MeetingEntry } from '../components/atoms/MeetingEntry'
import { load_comments_action, prepare_load_comments_action } from '../store/snu_moyeo/Comment/actions'

const mapDispatchToProps = (dispatch) => {
  return {
    load_comments_click: (meeting_id) => {  //  해당 미팅의 댓글 목록을 로드하여 세션 스토리지에 저장 후 플래그 설정
      dispatch(load_comments_action(meeting_id))
    },
    prepare_load_comments_click: () => {  //  댓글 목록을 새로 로드할 떄까지 잠시 봉인
      dispatch(prepare_load_comments_action())
    }
  }
}

export default connect(null, mapDispatchToProps)(MeetingEntry)
