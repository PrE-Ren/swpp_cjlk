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
    penalty_click: (hash, flag, report_info, points) => {  //  신고 모델 PUT
      dispatch(penalty_action(hash, flag, report_info, points))  //  hash는 관리자인지 판단하기 위해, 나머지는 PUT할 때 정보를 넘겨주기 위해 필요
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportInfo)
