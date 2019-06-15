import { connect } from 'react-redux'
import { LoginPage } from '../../components/organisms/LoginPage'
import { login_action } from '../../store/snu_moyeo/Account/actions'

const mapStateToProps = (state) => {
  return {
    username_store: state.snu_moyeo.username,
    mySNU_verification_token: state.snu_moyeo.mySNU_verification_token,
    phone_verification_token: state.snu_moyeo.phone_verification_token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login_click: (username, password) => {  //  유저 아이디와 유저 패스워드를 넘겨서 로그인 시도
      dispatch(login_action(username, password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
