import { connect } from 'react-redux'
import { ImpendingList } from '../components/molecules/ImpendingList'

const mapStateToProps = (state) => {
  return {
    meetinglist_impending : state.snu_moyeo.meetinglist_impending
  }
}

export default connect(mapStateToProps, null)(ImpendingList)
