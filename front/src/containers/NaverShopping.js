import { connect } from 'react-redux'
import { NaverShopping } from '../components/molecules/NaverShopping'
import { prepare_search_action, search_action } from '../store/snu_moyeo/OtherFunc/actions';

const mapStateToProps = (state) => {
  return {
    state : state.snu_moyeo
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      prepare_search_click: () => {  
        dispatch(prepare_search_action())
      },
      search_click: (query) => {  
        dispatch(search_action(query))
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(NaverShopping)