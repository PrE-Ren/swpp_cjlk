import { connect } from 'react-redux'
import { JoinList } from '../components/molecules/JoinList'

const mapStateToProps = (state) => {
  return {
    meetinglist_join : state.snu_moyeo.meetinglist_join
  }
}

export default connect(mapStateToProps, null)(JoinList)
