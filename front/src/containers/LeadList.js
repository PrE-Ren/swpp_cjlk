import { connect } from 'react-redux'
import { LeadList } from '../components/molecules/LeadList'

const mapStateToProps = (state) => {
  return {
    meetinglist_lead : state.snu_moyeo.meetinglist_lead
  }
}

export default connect(mapStateToProps, null)(LeadList)
