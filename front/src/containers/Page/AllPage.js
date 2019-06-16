import { connect } from 'react-redux'
import { AllPage } from '../../components/organisms/AllPage'
import { change_page_num_action } from '../../store/snu_moyeo/MeetingLoad/actions'

const mapStateToProps = (state) => {
  return {
    username: state.snu_moyeo.username,
    point: state.snu_moyeo.point,
    mySNU_verification_token: state.snu_moyeo.mySNU_verification_token,
    phone_verification_token: state.snu_moyeo.phone_verification_token,
    meetinglist_all: state.snu_moyeo.meetinglist_all
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    change_page_num_click: (page_num) => {  //  All 페이지에서 해당 페이지로의 변경을 시도
      dispatch(change_page_num_action("all", page_num))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllPage)
