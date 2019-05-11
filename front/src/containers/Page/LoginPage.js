import { connect } from 'react-redux'
import { LoginPage } from '../../components/organisms/LoginPage'
import { getLoginData } from '../../store/snu_moyeo/actions'

const mapStateToProps = (state) => {
  return {
    token: state.snu_moyeo.mySNU_verification_token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginReq: (username, password) => {
      dispatch(getLoginData(username, password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
