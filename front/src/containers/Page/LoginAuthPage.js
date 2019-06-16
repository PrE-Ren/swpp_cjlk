import { connect } from 'react-redux'
import { LoginAuthPage } from '../../components/organisms/LoginAuthPage'
import { send_email_action, send_phone_action, confirm_email_action, confirm_phone_action, logout_action } from '../../store/snu_moyeo/Account/actions'

// 이메일 형식 체크
const is_valid_email = (email) => {
  return email.includes('@snu.ac.kr') || email.includes('@mysnu.ac.kr')
}

// 폰 번호 형식 체크
const is_valid_phone_number = (phone_number) => {
  return phone_number.length == 11 && !isNaN(Number(phone_number))
}

const mapStateToProps = (state) => {
  return {
    username: state.snu_moyeo.username,
    password: state.snu_moyeo.password,
    point: state.snu_moyeo.point,
    mySNU_verification_token: state.snu_moyeo.mySNU_verification_token,
    phone_verification_token: state.snu_moyeo.phone_verification_token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    send_email_click: (hash, email) => {  //  해당 이메일로 인증번호를 보내고 해당 유저의 이메일 토큰 필드 설정
      if (is_valid_email(email))
        dispatch(send_email_action(hash, email))
      else
        alert('MySNU 메일 형식으로 입력해주세요.')
    },
    send_phone_click: (hash, phone_number) => {  //  해당 폰으로 인증번호를 보내고 해당 유저의 폰 토큰 필드 설정
      if (is_valid_phone_number(phone_number))
        dispatch(send_phone_action(hash, phone_number))
      else
        alert('01012345678 형식으로 입력해주세요.')
    },
    confirm_email_click: (hash, email, email_code) => {  //  해당 유저가 올바르게 인증번호를 입력하면 해당 유저의 이메일 및 이메일 토큰 필드 설정
      if (is_valid_email(email))
        dispatch(confirm_email_action(hash, email, email_code))
      else
        alert('MySNU 메일 형식으로 입력해주세요.')
    },
    confirm_phone_click: (hash, phone_number, phone_code) => {  //  해당 유저가 올바르게 인증번호를 입력하면 해당 유저의 폰 번호 및 폰 토큰 필드 설정
      if (is_valid_phone_number(phone_number))
        dispatch(confirm_phone_action(hash, phone_number, phone_code))
      else
        alert('01012345678 형식으로 입력해주세요.')
    },
    logout_click: () => {  //  로그아웃하면서 세션 스토리지와 리덕스 스토어 초기화
      dispatch(logout_action())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginAuthPage)
