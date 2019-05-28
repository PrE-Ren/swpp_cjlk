import { connect } from 'react-redux'
import { LoginAuthPage } from '../../components/organisms/LoginAuthPage'
import { send_email_action, send_phone_action, confirm_email_action, confirm_phone_action, login_action } from '../../store/snu_moyeo/actions'

const is_valid_email = (email) => {
  return email.includes('@snu.ac.kr') || email.includes('@mysnu.ac.kr')
}

const is_valid_phone_number = (phone_number) => {
  return phone_number.length == 11 && !isNaN(Number(phone_number))
}

const mapStateToProps = (state) => {
  return {
    username: state.snu_moyeo.username,
    password: state.snu_moyeo.password,
    mySNU_verification_token: state.snu_moyeo.mySNU_verification_token,
    phone_token: state.snu_moyeo.phone_token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    send_email_click: (hash, email) => {
      if (is_valid_email(email))
        dispatch(send_email_action(hash, email))
      else
        alert('MySNU 메일 형식으로 입력해주세요.')
    },
    send_phone_click: (hash, phone_number) => {
      if (is_valid_phone_number(phone_number))
        dispatch(send_phone_action(hash, phone_number))
      else
        alert('01012345678 형식으로 입력해주세요.')
    },
    confirm_email_click: (hash, email, email_code) => {
      if (is_valid_email(email))
        dispatch(confirm_email_action(hash, email, email_code))
      else
        alert('MySNU 메일 형식으로 입력해주세요.')
    },
    confirm_phone_click: (hash, phone_number, phone_code) => {
      if (is_valid_phone_number(phone_number))
        dispatch(confirm_phone_action(hash, phone_number, phone_code))
      else
        alert('01012345678 형식으로 입력해주세요.')
    },
    login_click: (username, password) => {
      dispatch(login_action(username, password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginAuthPage)
