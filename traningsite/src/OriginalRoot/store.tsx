import {createStore, Dispatch} from 'redux'

// デフォルト値
interface DefaultReduxState {
    sample:number;
    sampleaction(value?:number):void;

    headerHeight:number;
    headerHeightAction(value:number):void;
}

//公開用の宣言
export type ExternReduxState = {
    sample?:number;
    sampleaction?(value?:number):void;

    headerHeight?:number;
    headerHeightAction?(value:number):void;
}
& DefaultReduxState;

//ステート
export type ReduxState = {
    sample:number;
    headerHeight:number;
}

//処理種別
export enum ActionType{
    SAMPLE = "SAMPLE",
    HEADER_HEIGHT_CHG = "HEADER_HEIGHT_CHG"
}

export interface ReduxAction{
    type:ActionType;
    data?:number;
}

//デフォルト値
const initialState:ReduxState = {
    sample:0,
    headerHeight:0
}

//レデューサ
const reducer = (state:ReduxState=initialState, action:ReduxAction)=>{
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

export function SampleAction(value?:number):ReduxAction
{
    if(value == null)
    {
        return {type:ActionType.SAMPLE};
    }
    else{
        return {type:ActionType.SAMPLE, data:value};
    }
}

// ヘッダーの高さを更新
export function HeaderHeightChangeAction(value:number):ReduxAction
{
    return {type:ActionType.HEADER_HEIGHT_CHG, data:value};
}

export const mapStateToProps =(state:ReduxState) => {
    // console.log(state.sample)
    return {
        sample:state.sample,
        headerHeight:state.headerHeight
    }
}

// dispatch関数をコンポーネントにマッピングする関数
export const mapDispatchToProps =(dispatch:Dispatch) => ({
  sampleaction: (value?:number) => dispatch(SampleAction(value)),
  headerHeightAction:(value:number) => dispatch(HeaderHeightChangeAction(value))
})

export default createStore(reducer);

