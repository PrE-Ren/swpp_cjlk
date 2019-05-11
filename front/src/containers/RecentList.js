import { connect } from 'react-redux'
import { RecentList } from '../components/molecules/RecentList'

const mapStateToProps = (state) => {
  return {
    meetinglist_recent : state.snu_moyeo.meetinglist_recent
  }
}

export default connect(mapStateToProps, null)(RecentList)
