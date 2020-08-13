import {createStore} from 'redux'
import {ActionType, ReduxAction} from "./action"

//ステート
export type ReduxState = {
    sample:number;
    login:boolean;
}

//デフォルト値
const initialState:ReduxState = {
    sample:0,
    login:false
}

//レデューサ
export const reducer = (state:ReduxState=initialState, action:ReduxAction)=>{
    let ret = {
        sample:state.sample,
        login:state.login
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
            break;
        default:
            break;
    }
    return ret;
}


export default createStore(reducer);


