import { connect } from 'react-redux'
import { HomePage } from '../../components/organisms/HomePage'

const mapStateToProps = (state) => {
  return {
    username: state.snu_moyeo.username,
    point: state.snu_moyeo.point,
    mySNU_verification_token: state.snu_moyeo.mySNU_verification_token,
    phone_verification_token: state.snu_moyeo.phone_verification_token
  }
}

export default connect(mapStateToProps, null)(HomePage)
