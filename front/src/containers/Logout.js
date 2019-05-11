import { connect } from 'react-redux'
import { Logout } from '../components/atoms/Logout'
import { logoutRequest } from '../store/snu_moyeo/actions'

const mapDispatchToProps = (dispatch) => {
  return {
    logoutReq: () => {
      dispatch(logoutRequest())
    }
  }
}

export default connect(null, mapDispatchToProps)(Logout)
