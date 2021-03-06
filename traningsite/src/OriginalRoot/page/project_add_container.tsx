import {connect} from 'react-redux'
import {Dispatch} from "redux"

import {ReduxState} from "../redux/store"
import ProjectAdd from "./project_add"

export interface AddPageReduxState {
    login?:boolean;
    user?:string;
}

export const mapStateToProps =(state:ReduxState) => {
    return {
        login:state.login,
        user:state.user
    }
}

export default connect(mapStateToProps)(ProjectAdd);
