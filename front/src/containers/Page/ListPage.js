import { connect } from 'react-redux'
import { ListPage } from '../../components/organisms/ListPage'
import { change_page_num_action } from '../../store/snu_moyeo/actions'

const mapStateToProps = (state) => {
  return {
    mySNU_verification_token: state.snu_moyeo.mySNU_verification_token,
    phone_token: state.snu_moyeo.phone_token,
    meetinglist_list: state.snu_moyeo.meetinglist_list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    change_page_num_click: (page_num) => {
      dispatch(change_page_num_action(page_num))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPage)
