import { connect } from 'react-redux'
import { SignupPage } from '../../components/organisms/SignupPage'
import { signup_action } from '../../store/snu_moyeo/Account/actions'

const mapStateToProps = (state) => {
  return {
    username_store: state.snu_moyeo.username,
    mySNU_verification_token: state.snu_moyeo.mySNU_verification_token,
    phone_verification_token: state.snu_moyeo.phone_verification_token,
    is_captcha_verified: state.snu_moyeo.is_captcha_verified
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signup_click: (username, password, name) => {  //  유저 아이디, 유저 패스워드, 이름(닉네임)을 넘겨서 회원가입 시도
      dispatch(signup_action(username, password, name))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage)
