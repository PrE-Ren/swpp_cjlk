import { connect } from 'react-redux'
import NewPage from '../../components/organisms/NewPage'
import { postNewData, logoutRequest } from '../../store/snu_moyeo/actions'

const mapStateToProps = (state) => {
  return {
    state: state.snu_moyeo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutReq: () => {
      dispatch(logoutRequest())
    },
    newReq: (username, password, kind, leader, title, due, min_people, max_people, description, user_id, picture) => {
      dispatch(postNewData(username, password, kind, leader, title, due, min_people, max_people, description, user_id, picture))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPage)
