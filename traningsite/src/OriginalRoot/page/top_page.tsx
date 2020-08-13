//必要
import React, { Component } from 'react'
import {Helmet} from "react-helmet"

// CSS
import "./../css/top.scss"

// コンポーネント
import ComHeaer from "./component/com_header_container";
import ProjectListTable from "./component/project_list_table_container";

//コンテナ
import {TopPageReduxState, TopPageReduxAction} from "./top_page_container"

//プロパティ
interface OwnProps {
}

type TopPageProps = OwnProps & TopPageReduxState & TopPageReduxAction

export default class TopPage extends Component<TopPageProps>{
    constructor(props:TopPageProps){
        super(props);
    }
    
    render()
    {
        return(
            <>
                <Helmet title="Project List Top Page" />
                <body>
                    <header>
                        <ComHeaer/>
                    </header>
                    <main>
                    </main>
                </body>
            </>
        );
    }
}
