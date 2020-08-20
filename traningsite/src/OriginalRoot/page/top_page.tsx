//必要
import React, { Component } from 'react'
import {Helmet} from "react-helmet"

// CSS
import "./../css/top.scss"

// コンポーネント
import ComHeaer from "./component/com_header_container";
import ComFooter from "./component/com_footer_container";

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
                <body className="wrapper">
                    <header>
                        <ComHeaer/>
                    </header>
                    <main id="home" className="top--main--big-bg">
                        <div className="top-main-title">
                            <h2>株式会社モルトカリーナ案件管理</h2>
                        </div>
                    </main>
                    <footer>
                        <ComFooter />
                    </footer>
                </body>
            </>
        );
    }
}
