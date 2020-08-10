import {createStore} from 'redux'
import {ActionType, ReduxAction} from "./action"

// // デフォルト値
// interface DefaultReduxState {
//     sample:number;
//     sampleaction(value?:number):void;

//     headerHeight:number;
//     headerHeightAction(value:number):void;
// }

// //公開用の宣言
// export type ExternReduxState = {
//     sample?:number;
//     sampleaction?(value?:number):void;

//     headerHeight?:number;
//     headerHeightAction?(value:number):void;
// }
// & DefaultReduxState;

//ステート
export type ReduxState = {
    sample:number;
    headerHeight:number;
}

//デフォルト値
const initialState:ReduxState = {
    sample:0,
    headerHeight:0
}

//レデューサ
export const reducer = (state:ReduxState=initialState, action:ReduxAction)=>{
    let ret = {
        sample:state.sample,
        headerHeight:state.headerHeight
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
        default:
            break;
    }
    return ret;
}


export default createStore(reducer);


