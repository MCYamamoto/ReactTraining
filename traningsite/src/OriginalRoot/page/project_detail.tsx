import React, { Component } from 'react'
import {connect,} from 'react-redux'
import {ExternReduxState, mapStateToProps, mapDispatchToProps} from "../redux/store"
import {Helmet} from "react-helmet"

import ComHeaer from "./component/com_header";

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
                <Helmet title="Projec Detail" />
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
