import { connect } from 'react-redux'
import LoginPage from '../components/molecules/LoginPage'
import { getLoginData } from '../store/snu_moyeo/actions'

const mapStateToProps = (state) => {
  return {
    state: state.snu_moyeo
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
