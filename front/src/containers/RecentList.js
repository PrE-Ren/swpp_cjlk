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
    stateReq: (username, password, id,
               title, due, min_people, max_people, description, state, kind) => {
      dispatch(putChangeState(username, password, id, title, due, min_people, max_people, description, state, kind))
    },
    participateReq: (username, password, user_id, meeting_id) => {
      dispatch(postParticipate(username, password, user_id, meeting_id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentList)
