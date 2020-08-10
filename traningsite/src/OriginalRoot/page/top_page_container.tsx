import {connect} from 'react-redux'
import {Dispatch} from "redux"

import {SampleAction} from "../redux/action"

import {ReduxState} from "../redux/store"
import TopPage from "./top_page"

export interface TopPageReduxState {
    sample?:number;
}

export interface TopPageReduxAction {
    sampleaction(value?:number):void;
}

export const mapStateToProps =(state:ReduxState) => {
    return {
        sample:state.sample
    }
}

// dispatch関数をコンポーネントにマッピングする関数
export const mapDispatchToProps =(dispatch:Dispatch) => ({
  sampleaction: (value?:number) => dispatch(SampleAction(value))
})


// export default connect(mapStateToProps,  mapDispatchToProps)(TopPage);
export default connect(mapStateToProps, mapDispatchToProps)(TopPage);
