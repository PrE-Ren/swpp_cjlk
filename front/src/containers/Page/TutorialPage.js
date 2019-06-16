import { connect } from 'react-redux'
import { TutorialPage } from '../../components/organisms/TutorialPage'

const mapStateToProps = (state) => {
  return {
    username: state.snu_moyeo.username,
    point: state.snu_moyeo.point,
    mySNU_verification_token: state.snu_moyeo.mySNU_verification_token,
    phone_verification_token: state.snu_moyeo.phone_verification_token
  }
}

export default connect(mapStateToProps, null)(TutorialPage)
