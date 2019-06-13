import { connect } from 'react-redux'
import { AllList } from '../components/molecules/AllList'

const mapStateToProps = (state) => {
  return {
    meetinglist_all : state.snu_moyeo.meetinglist_all
  }
}

export default connect(mapStateToProps, null)(AllList)
