import { connect } from 'react-redux'
import { SignupPage } from '../../components/organisms/SignupPage'
import { signup_action } from '../../store/snu_moyeo/actions'

const mapStateToProps = (state) => {
  return {
    token: state.snu_moyeo.mySNU_verification_token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signup_click: (username, password, name, email) =>{
      dispatch(signup_action(username, password, name, email))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage)
