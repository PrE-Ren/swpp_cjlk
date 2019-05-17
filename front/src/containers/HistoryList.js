import { connect } from 'react-redux'
import { HistoryList } from '../components/molecules/HistoryList'

const mapStateToProps = (state) => {
  return {
    meetinglist_history : state.snu_moyeo.meetinglist_history
  }
}

export default connect(mapStateToProps, null)(HistoryList)
