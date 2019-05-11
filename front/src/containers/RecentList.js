import { connect } from 'react-redux'
import { RecentList } from '../components/molecules/RecentList'
import { putChangeState } from '../store/snu_moyeo/actions'

const mapStateToProps = (state) => {
  return {
    state : state.snu_moyeo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    stateReq: (username, password, meeting_id, state, title, due, min_people, max_people, description, kind) => {
      dispatch(putChangeState(username, password, meeting_id, state, title, due, min_people, max_people, description, kind))
    },
    participateReq: (username, password, user_id, meeting_id) => {
      dispatch(postParticipate(username, password, user_id, meeting_id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentList)
