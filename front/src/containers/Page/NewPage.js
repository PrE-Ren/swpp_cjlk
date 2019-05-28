import { connect } from 'react-redux'
import { NewPage } from '../../components/organisms/NewPage'

const mapStateToProps = (state) => {
  return {
    mySNU_verification_token: state.snu_moyeo.mySNU_verification_token,
    phone_token: state.snu_moyeo.phone_token
  }
}

export default connect(mapStateToProps, null)(NewPage)
