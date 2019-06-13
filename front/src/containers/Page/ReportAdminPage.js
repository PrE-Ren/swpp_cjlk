import { connect } from 'react-redux'
import { ReportAdminPage } from '../../components/organisms/ReportAdminPage'

const mapStateToProps = (state) => {
  return {
    username: state.snu_moyeo.username,
    report_info_list: state.snu_moyeo.reportinfo_list
  }
}

export default connect(mapStateToProps, null)(ReportAdminPage)
