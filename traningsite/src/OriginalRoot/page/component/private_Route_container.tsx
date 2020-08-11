import {connect} from 'react-redux'
import {Dispatch} from 'redux'

import {ReduxState} from "../../redux/store"
import {LoginAction} from "../../redux/action"
import PrivateRoute from "./private_Route"

export interface PrivaterouteReduxState {
    login?:boolean;
}

export const mapStateToProps =(state:ReduxState) => {
    return {
        login:state.login
    }
}

export interface PrivaterouteReduxAction {
    loginaction(value:boolean):void;
}

// dispatch関数をコンポーネントにマッピングする関数
export const mapDispatchToProps =(dispatch:Dispatch) => ({
    loginaction: (value:boolean) => dispatch(LoginAction(value))
})


export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
