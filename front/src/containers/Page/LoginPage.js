import { connect } from 'react-redux'
import { LoginPage } from '../../components/organisms/LoginPage'
import { login_action } from '../../store/snu_moyeo/actions'

const mapStateToProps = (state) => {
  return {
    token: state.snu_moyeo.mySNU_verification_token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login_click: (username, password) => {
      dispatch(login_action(username, password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
