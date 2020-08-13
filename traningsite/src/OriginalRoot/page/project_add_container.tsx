import {connect} from 'react-redux'
import {Dispatch} from "redux"

import {ReduxState} from "../redux/store"
import ProjectAdd from "./project_add"

export interface LoginPageReduxState {
    login?:boolean;
}

export const mapStateToProps =(state:ReduxState) => {
    return {
        login:state.login
    }
}

export default connect(mapStateToProps)(ProjectAdd);
