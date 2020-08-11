import {connect} from 'react-redux'

import {ReduxState} from "../../redux/store"
import ComHeaer from "./com_header"

export interface ComHeaderReduxState {
    login?:boolean;
}

export const mapStateToProps =(state:ReduxState) => {
    return {
        login:state.login
    }
}

// export default connect(mapStateToProps,  mapDispatchToProps)(TopPage);
export default connect(mapStateToProps)(ComHeaer);
