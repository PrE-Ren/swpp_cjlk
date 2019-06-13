import { connect } from 'react-redux'
import { Logout } from '../components/atoms/Logout'
import { logout_action } from '../store/snu_moyeo/actions'

const mapDispatchToProps = (dispatch) => {
  return {
    logout_click: () => {  //  세션 스토리지 및 리덕스 스토어 초기화
      dispatch(logout_action())
    }
  }
}

export default connect(null, mapDispatchToProps)(Logout)
