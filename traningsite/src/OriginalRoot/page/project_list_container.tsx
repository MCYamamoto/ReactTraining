import {connect} from 'react-redux'

import {ReduxState} from "../redux/store"
import ProjectList from "./project_list"

export interface ProjectListReduxState {
    login?:boolean;
}

export const mapStateToProps =(state:ReduxState) => {
    return {
        login:state.login
    }
}

export default connect(mapStateToProps)(ProjectList);
