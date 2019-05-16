import { connect } from 'react-redux'
import { Logout } from '../components/atoms/Logout'
import { logout_action } from '../store/snu_moyeo/actions'

const mapDispatchToProps = (dispatch) => {
  return {
    logout_click: () => {
      dispatch(logout_action())
    }
  }
}

export default connect(null, mapDispatchToProps)(Logout)
