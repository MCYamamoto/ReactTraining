//必要
import React, { Component } from 'react'
import {Helmet} from "react-helmet"

// CSS
import "./../css/top.scss"

// コンポーネント
import ComHeaer from "./component/com_header_container";
import ProjectListTable from "./component/project_list_table_container";

//コンテナ
import {ProjectListReduxState} from "./project_list_container"

//プロパティ
interface OwnProps {
    history:any;
    location:any;
}

type ProjectListProps = OwnProps & ProjectListReduxState

export default class ProjectList extends Component<ProjectListProps>{
    constructor(props:ProjectListProps){
        super(props);
    }
    
    render()
    {
        return(
            <>
                <Helmet title="Project List" />
                <body>
                    <header>
                        <ComHeaer/>
                    </header>
                    <main>
                        <ProjectListTable history={this.props.history} location={this.props.location}/>
                    </main>
                </body>
            </>
        );
    }
}