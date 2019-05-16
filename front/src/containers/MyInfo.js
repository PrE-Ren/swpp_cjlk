import { connect } from 'react-redux'
import { MyInfo } from '../components/molecules/MyInfo'

const mapStateToProps = (state) => {
  return {
    state : state.snu_moyeo
  }
}

export default connect(mapStateToProps, null)(MyInfo)
