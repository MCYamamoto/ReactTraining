import {connect} from 'react-redux'
import {Dispatch} from "redux"

import {LoginAction} from "../redux/action"

import {ReduxState} from "../redux/store"
import LoginPage from "./login_page"

export interface LoginPageReduxState {
    login?:boolean;
}

export interface LoginPageReduxAction {
    loginaction(value:boolean):void;
}

export const mapStateToProps =(state:ReduxState) => {
    return {
        login:state.login
    }
}

// dispatch関数をコンポーネントにマッピングする関数
export const mapDispatchToProps =(dispatch:Dispatch) => ({
    loginaction: (value:boolean) => dispatch(LoginAction(value))
})


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
