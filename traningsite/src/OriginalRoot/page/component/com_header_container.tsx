import {connect} from 'react-redux'
import {Dispatch} from 'redux'

import {ReduxState} from "../../redux/store"
import {LoginAction} from "../../redux/action"
import ComHeaer from "./com_header"

export interface ComHeaderReduxState {
    login?:boolean;
}

export const mapStateToProps =(state:ReduxState) => {
    return {
        login:state.login
    }
}

export interface ComHeaderReduxAction {
    loginaction(login:boolean, user:string):void;
}

// dispatch関数をコンポーネントにマッピングする関数
export const mapDispatchToProps =(dispatch:Dispatch) => ({
    loginaction: (login:boolean, user:string) => dispatch(LoginAction(login,user))
})

// export default connect(mapStateToProps,  mapDispatchToProps)(TopPage);
export default connect(mapStateToProps,mapDispatchToProps)(ComHeaer);
