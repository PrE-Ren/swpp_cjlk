import { connect } from 'react-redux'
import { NewPage } from '../../components/organisms/NewPage'

const mapStateToProps = (state) => {
  return {
    token: state.snu_moyeo.mySNU_verification_token
  }
}

export default connect(mapStateToProps, null)(NewPage)
