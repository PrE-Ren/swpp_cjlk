import { connect } from 'react-redux'
import SignupPage from '../../components/organisms/SignupPage'
import { postSignupData } from '../../store/snu_moyeo/actions'

const mapStateToProps = (state) => {
  return {
    state: state.snu_moyeo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signupReq: (username, password, name, email) =>{
      dispatch(postSignupData(username, password, name, email))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage)
