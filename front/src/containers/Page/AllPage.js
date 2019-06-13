import { connect } from 'react-redux'
import { AllPage } from '../../components/organisms/AllPage'
import { change_page_num_action } from '../../store/snu_moyeo/actions'

const mapStateToProps = (state) => {
  return {
    username: state.snu_moyeo.username,
    mySNU_verification_token: state.snu_moyeo.mySNU_verification_token,
    phone_verification_token: state.snu_moyeo.phone_verification_token,
    meetinglist_all: state.snu_moyeo.meetinglist_all
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    change_page_num_click: (page_num) => {
      dispatch(change_page_num_action("searchall", page_num))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllPage)
