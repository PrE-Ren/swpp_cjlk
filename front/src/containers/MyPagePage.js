import { connect } from 'react-redux'
import MyPagePage from '../components/organisms/MyPagePage'
//import { 액션생성함수1, 액션생성함수2 } from '../store/snu_moyeo/actions'

const mapStateToProps = (state) => {
  return {
    state : state.snu_moyeo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    /* 함수1 : (매개변수) => { dispatch(액션생성함수1(인자)) }, */
    /* 함수2 : (매개변수) => { dispatch(액션생성함수2(인자)) }, */
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPagePage)
