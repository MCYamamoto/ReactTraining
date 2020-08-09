//REDUX使用方法確認。(未使用)

import {TopPage} from "../top"
import {ActionType, ReduxState, ReduxAction} from "../store"
import {connect} from "react-redux"
import {Dispatch} from "redux"

export const mapStateToProps =(state:ReduxState) => {
    console.log(state.sample)
    return {sample:state.sample}
}

// dispatch関数をコンポーネントにマッピングする関数
export const mapDispatchToProps =(dispatch:Dispatch) => ({
  sampleaction: (value?:number) => dispatch(SampleAction(value))
})

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

export default connect(mapStateToProps,  mapDispatchToProps)(TopPage);
