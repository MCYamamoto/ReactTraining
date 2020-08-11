import {connect} from 'react-redux'

import {ReduxState} from "../../redux/store"
import PrivateRoute from "./private_Route"

export interface PrivaterouteReduxState {
    login?:boolean;
}

export const mapStateToProps =(state:ReduxState) => {
    return {
        login:state.login
    }
}

export default connect(mapStateToProps)(PrivateRoute);
