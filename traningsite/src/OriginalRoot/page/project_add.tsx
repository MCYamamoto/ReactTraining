import React, { Component } from 'react'
import {connect,} from 'react-redux'
import {Helmet} from "react-helmet"

import ComHeaer from "./component/com_header";

interface OwnProps {
};

type ProjectAddProps = OwnProps;

export default class ProjectAdd extends Component<ProjectAddProps>{
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
                    </main>
                </body>
            </div>
        );
    }
}
