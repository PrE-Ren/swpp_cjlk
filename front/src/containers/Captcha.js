import { connect } from 'react-redux'
import { Captcha } from '../components/atoms/Captcha'
import { prepare_load_captcha_action, load_captcha_action, confirm_captcha_action } from '../store/snu_moyeo/OtherFunc/actions'

const mapStateToProps = (state) => {
  return {
    is_captcha_loaded : state.snu_moyeo.is_captcha_loaded,
    is_captcha_verified : state.snu_moyeo.is_captcha_verified
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    prepare_load_captcha_click: () => {  //  새로운 캡챠 이미지 요청 전에 플래그를 거짓으로 설정
      dispatch(prepare_load_captcha_action())
    },
    load_captcha_click: () => {  //  새로운 캡챠 이미지 요청
      dispatch(load_captcha_action())
    },
    confirm_captcha_click: (key, value) => {  //  보안문자 확인
      dispatch(confirm_captcha_action(key, value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Captcha)
