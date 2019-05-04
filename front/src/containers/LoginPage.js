import {connect} from 'react-redux'
import LoginPage from '../components/molecules/LoginPage'
import {getLoginData} from '../store/login/actions'

const mapStateToProps = (state) => {
  return {
    state: state.login
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginReq: (userid,password) =>{
      dispatch(getLoginData(userid,password))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage)

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