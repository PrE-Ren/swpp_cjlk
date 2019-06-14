import { connect } from 'react-redux'
import { ReportInfo } from '../components/molecules/ReportInfo'
import { penalty_action } from '../store/snu_moyeo/actions'


const mapStateToProps = (state) => {
  return {
    username : state.snu_moyeo.username,
    password : state.snu_moyeo.password
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    penalty_click: (hash, flag, report_info, points) => {
      dispatch(penalty_action(hash, flag, report_info, points))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportInfo)
