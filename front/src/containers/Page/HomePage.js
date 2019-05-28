import { connect } from 'react-redux'
import { HomePage } from '../../components/organisms/HomePage'

const mapStateToProps = (state) => {
  return {
    mySNU_verification_token: state.snu_moyeo.mySNU_verification_token,
    phone_token: state.snu_moyeo.phone_token
  }
}

export default connect(mapStateToProps, null)(HomePage)
