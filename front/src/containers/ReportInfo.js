import { connect } from 'react-redux'
import { ReportInfo } from '../components/molecules/ReportInfo'
import { give_penalty_action } from '../store/snu_moyeo/actions'

const mapDispatchToProps = (dispatch) => {
  return {
    give_penalty_click: (user_id, points) => {
      dispatch(give_penalty_action(user_id, points))
    }
  }
}

export default connect(null, mapDispatchToProps)(ReportInfo)
