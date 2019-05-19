import { connect } from 'react-redux'
import { KindList } from '../components/molecules/KindList'

const mapStateToProps = (state) => {
  return {
    meetinglist_list : state.snu_moyeo.meetinglist_list
  }
}

export default connect(mapStateToProps, null)(KindList)
