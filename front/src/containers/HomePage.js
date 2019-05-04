import {connect} from 'react-redux'
import HomePage from '../components/organisms/HomePage'
import {logoutRequest} from '../store/login/actions'

const mapStateToProps = (state) => {
  return {
    state: state.login
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutReq: () =>{
      dispatch(logoutRequest())
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomePage)

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