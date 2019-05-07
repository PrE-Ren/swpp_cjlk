import { connect } from 'react-redux'
import NewPage from '../components/molecules/NewPage'

const mapStateToProps = (state) => {
  return {
    state: state.snu_moyeo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    NewReq: (username, password, kind, leader, title, due, min_people, max_people, description) => {
      dispatch(postNewData(username, password, kind, leader, title, due, min_people, max_people, description))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPage)
