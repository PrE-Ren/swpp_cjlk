import { connect } from 'react-redux'
import { HomePage } from '../../components/organisms/HomePage'

const mapStateToProps = (state) => {
  return {
    token: state.snu_moyeo.mySNU_verification_token
  }
}

export default connect(mapStateToProps, null)(HomePage)
