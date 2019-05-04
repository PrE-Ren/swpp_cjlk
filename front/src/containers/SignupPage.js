import {connect} from 'react-redux'
import SignupPage from '../components/molecules/SignupPage'
import {postSignupData} from '../store/login/actions'

const mapStateToProps = (state) => {
  return {
    state: state.login
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signupReq: (userid,password,name,email) =>{
      dispatch(postSignupData(userid,password,name,email))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignupPage)

/*
const mapDispatchToProps = (dispatch) => {
  return {
    loginReq: (userid,password) =>{
      dispatch(getLoginData(userid,password))
    }
    signupReq: (userid,password) =>{
      dispatch(signupRequest(userid,password))
    }
  }
}
*/