import React, { Component } from 'react'
import {connect,} from 'react-redux'
import {ExternReduxState, mapStateToProps, mapDispatchToProps} from "./store"

type ProjectDetailProps = {
} & ExternReduxState;

class ProjectDetail extends Component<ProjectDetailProps>{
    constructor(props:ProjectDetailProps){
        super(props);
    }
    render()
    {
        return(
            <div>
                <h1>ProjectDetail</h1>
                <h1>sampledata={this.props.sample}</h1>
            </div>
        );
    }
}

export default connect(mapStateToProps)(ProjectDetail);
