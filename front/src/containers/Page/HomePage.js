import { connect } from 'react-redux'
import HomePage from '../../components/organisms/HomePage'
import { logoutRequest } from '../../store/snu_moyeo/actions'

const mapStateToProps = (state) => {
  return {
    state: state.snu_moyeo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutReq: () => {
      dispatch(logoutRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
