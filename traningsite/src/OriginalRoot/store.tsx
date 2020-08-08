import {createStore, Dispatch} from 'redux'

interface DefaultReduxState {
    sample:number;
    sampleaction(value?:number):void;
}
export type ExternReduxState = {
    sample?:number;
    sampleaction?(value?:number):void;
}
& DefaultReduxState;


export type ReduxState = {
    sample:number;
}

export enum ActionType{
    SAMPLE = "SAMPLE"
}

export interface ReduxAction{
    type:ActionType;
    data?:number;
}

const initialState:ReduxState = {
    sample:0,
}
const reducer = (state:ReduxState=initialState, action:ReduxAction)=>{
    switch(action.type)
    {
        case ActionType.SAMPLE:
            if(action.data == null)
            {
                return {sample:state.sample+1}
            }
            else
            {
                return {sample:state.sample+action.data}
            }
        default:
            return state;
    }
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

export const mapStateToProps =(state:ReduxState) => {
    // console.log(state.sample)
    return {sample:state.sample}
}

// dispatch関数をコンポーネントにマッピングする関数
export const mapDispatchToProps =(dispatch:Dispatch) => ({
  sampleaction: (value?:number) => dispatch(SampleAction(value))
})

export default createStore(reducer);

