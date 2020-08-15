import {createStore} from 'redux'
import {ActionType, ReduxAction} from "./action"

//ステート
export type ReduxState = {
    sample:number;
    login:boolean;
    user:string;
}

//デフォルト値
const initialState:ReduxState = {
    sample:0,
    login:false,
    user:""
}

//レデューサ
export const reducer = (state:ReduxState=initialState, action:ReduxAction)=>{
    let ret = {
        sample:state.sample,
        login:state.login,
        user:state.user
    }
    
    switch(action.type)
    {
        case ActionType.SAMPLE:
            if(action.data == null)
            {
                ret.sample = state.sample+1;
            }
            else
            {
                ret.sample = state.sample+action.data;
            }
            break;
        case ActionType.LOGIN:
            if(action.login != null)
            {
                ret.login = action.login;
            }
            if(action.user != null)
            {
                ret.user = action.user;
            }
            break;
        default:
            break;
    }
    return ret;
}


export default createStore(reducer);


