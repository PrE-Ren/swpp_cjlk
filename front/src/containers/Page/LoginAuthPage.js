import { connect } from 'react-redux'
import { LoginAuthPage } from '../../components/organisms/LoginAuthPage'
import { send_email_action, send_phone_action, confirm_email_action, confirm_phone_action, login_action } from '../../store/snu_moyeo/actions'

const mapStateToProps = (state) => {
  return {
    username: state.snu_moyeo.username,
    password: state.snu_moyeo.password,
    token: state.snu_moyeo.mySNU_verification_token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    send_email_click: (hash, email) =>{
      dispatch(send_email_action(hash, email))
    },
    send_phone_click: (hash, phone_number) =>{
      dispatch(send_phone_action(hash, phone_number))
    },
    confirm_email_click: (hash, email, email_code) =>{
      dispatch(confirm_email_action(hash, email, email_code))
    },
    confirm_phone_click: (hash, phone_number, phone_code) =>{
      dispatch(confirm_phone_action(hash, phone_number, phone_code))
    },
    login_click: (username, password) => {
      dispatch(login_action(username, password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginAuthPage)
