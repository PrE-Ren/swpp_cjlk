import { connect } from 'react-redux'
import MyPagePage from '../../components/organisms/MyPagePage'
import { logoutRequest } from '../../store/snu_moyeo/actions'

const mapStateToProps = (state) => {
  return {
    state : state.snu_moyeo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutReq: () => {
      dispatch(logoutRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPagePage)
