import React, { Component } from 'react'
import {connect,} from 'react-redux'
import {ExternReduxState, mapStateToProps, mapDispatchToProps} from "../redux/store"
import {Helmet} from "react-helmet"

import ComHeaer from "./component/com_header";

type ProjectAddProps = {
} & ExternReduxState;

class ProjectAdd extends Component<ProjectAddProps>{
    constructor(props:ProjectAddProps){
        super(props);
    }
    render()
    {
        return(
            <div>
                <Helmet title="Projec Add" />
                <body>
                    <header>
                        <ComHeaer/>
                    </header>
                    <main>
                        <h1>ProjectAdd</h1>
                        <h1>sampledata={this.props.sample}</h1>
                    </main>
                </body>
            </div>
        );
    }
}

export default connect(mapStateToProps)(ProjectAdd);
