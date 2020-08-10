import {connect} from 'react-redux'
import {Dispatch} from "redux"

import {HeaderHeightChangeAction} from "../../redux/action"

import {ReduxState} from "../../redux/store"
import ProjectListTable from "./project_list_table"

export interface ProjectListTableReduxState {
    headerHeight?:number;
}

export interface ProjectListTableReduxAction {
    headerHeightaction(value:number):void;
}

export const mapStateToProps =(state:ReduxState) => {
    return {
        headerHeight:state.headerHeight
    }
}

// dispatch関数をコンポーネントにマッピングする関数
export const mapDispatchToProps =(dispatch:Dispatch) => ({
    headerHeightaction: (value:number) => dispatch(HeaderHeightChangeAction(value))
})


// export default connect(mapStateToProps,  mapDispatchToProps)(TopPage);
export default connect(mapStateToProps, mapDispatchToProps)(ProjectListTable);
