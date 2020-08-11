import React, { Component } from 'react'
import {connect,} from 'react-redux'
import {Helmet} from "react-helmet"

import ComHeaer from "./component/com_header_container";

interface OwnProps{

};

type ProjectDetailProps = OwnProps;

export default class ProjectDetail extends Component<ProjectDetailProps>{
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
                    </main>
                </body>
            </div>
        );
    }
}
