import {createStore} from 'redux'
import {ActionType, ReduxAction} from "./action"

//ステート
export type ReduxState = {
    sample:number;
    headerHeight:number;
    login:boolean;
}

//デフォルト値
const initialState:ReduxState = {
    sample:0,
    headerHeight:0,
    login:false
}

//レデューサ
export const reducer = (state:ReduxState=initialState, action:ReduxAction)=>{
    let ret = {
        sample:state.sample,
        headerHeight:state.headerHeight,
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
        case ActionType.HEADER_HEIGHT_CHG:
            if(action.data != null)
            {
                ret.headerHeight = action.data;
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


