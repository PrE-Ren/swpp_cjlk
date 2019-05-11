import { connect } from 'react-redux'
import { MeetingCreate } from '../components/molecules/MeetingCreate'
import { postNewData } from '../store/snu_moyeo/actions'

const mapStateToProps = (state) => {
  return {
    username : state.snu_moyeo.username,
    password : state.snu_moyeo.password,
    user_id : state.snu_moyeo.user_id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newReq: (username, password, user_id, title, due, min_people, max_people, description, kind, leader, picture) => {
      dispatch(postNewData(username, password, kind, leader, title, due, min_people, max_people, description, user_id, picture))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingCreate)
