import {connect} from 'react-redux'
import {Dispatch} from "redux"

import {ReduxState} from "../redux/store"
import ProjectDetail from "./project_detail"

export interface DetailPageReduxState {
    login?:boolean;
    user?:string;
}

export const mapStateToProps =(state:ReduxState) => {
    return {
        login:state.login,
        user:state.user
    }
}

export default connect(mapStateToProps)(ProjectDetail);
