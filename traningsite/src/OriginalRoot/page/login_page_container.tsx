import {connect} from 'react-redux'
import {Dispatch} from "redux"

import {LoginAction} from "../redux/action"

import {ReduxState} from "../redux/store"
import LoginPage from "./login_page"

export interface LoginPageReduxState {
    login?:boolean;
}

export const mapStateToProps =(state:ReduxState) => {
    return {
        login:state.login
    }
}

export interface LoginPageReduxAction {
    loginaction(login:boolean, user:string):void;
}

// dispatch関数をコンポーネントにマッピングする関数
export const mapDispatchToProps =(dispatch:Dispatch) => ({
    loginaction: (login:boolean, user:string) => dispatch(LoginAction(login,user))
})


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
