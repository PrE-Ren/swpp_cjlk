import { connect } from 'react-redux'
import { SignupPage } from '../../components/organisms/SignupPage'
import { signup_action } from '../../store/snu_moyeo/actions'

const mapStateToProps = (state) => {
  return {
    mySNU_verification_token: state.snu_moyeo.mySNU_verification_token,
    phone_verification_token: state.snu_moyeo.phone_verification_token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signup_click: (username, password, name) =>{
      dispatch(signup_action(username, password, name))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage)
