import { connect } from 'react-redux'
import { MyPagePage } from '../../components/organisms/MyPagePage'

const mapStateToProps = (state) => {
  return {
    token: state.snu_moyeo.mySNU_verification_token
  }
}

export default connect(mapStateToProps, null)(MyPagePage)
