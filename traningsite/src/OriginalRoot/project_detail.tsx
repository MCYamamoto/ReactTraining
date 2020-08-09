import React, { Component } from 'react'
import {connect,} from 'react-redux'
import {ExternReduxState, mapStateToProps, mapDispatchToProps} from "./store"
import {Helmet} from "react-helmet"

import ComHeaer from "./com_header";

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
                <Helmet title="ProjecDetail" />
                <body>
                    <header>
                        <ComHeaer/>
                    </header>
                    <main>
                        <h1>ProjectDetail</h1>
                        <h1>sampledata={this.props.sample}</h1>
                    </main>
                </body>
            </div>
        );
    }
}

export default connect(mapStateToProps)(ProjectDetail);
