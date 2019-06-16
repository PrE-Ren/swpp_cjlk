import { connect } from 'react-redux'
import { NewPage } from '../../components/organisms/NewPage'

const mapStateToProps = (state) => {
  return {
    username: state.snu_moyeo.username,
    point: state.snu_moyeo.point,
    mySNU_verification_token: state.snu_moyeo.mySNU_verification_token,
    phone_verification_token: state.snu_moyeo.phone_verification_token
  }
}

export default connect(mapStateToProps, null)(NewPage)
