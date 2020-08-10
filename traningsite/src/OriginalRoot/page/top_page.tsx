//必要
import React, { Component } from 'react'
import {Helmet} from "react-helmet"

// CSS
import "./../css/top.scss"

// コンポーネント
import ComHeaer from "./component/com_header";
import ProjectListTable from "./component/project_list_table_container";

//コンテナ
import {TopPageReduxState, TopPageReduxAction} from "./top_page_container"

//プロパティ
interface OwnProps {
}

type TopPageProps = OwnProps & TopPageReduxState & TopPageReduxAction
//ステート
// interface TopState{
//     state_sample:number;
// }

export default class TopPage extends Component<TopPageProps>{
    constructor(props:TopPageProps){
        super(props);
        this.Click = this.Click.bind(this);
        // this.Click2 = this.Click2.bind(this);
        // this.Click3 = this.Click3.bind(this);
        // this.state = 
        // {
        //     state_sample:0
        // }
    }
    Click(){
        this.props.sampleaction(10);
    }
    // Click2(){
    //     this.props.sampleaction();
    // }
    // Click3(){
    //     this.setState((state)=>{
    //         return {
    //             state_sample:state.state_sample+1
    //         }
    //     });
    // }
    
    render()
    {
        // console.log(this.props.sample);
        // console.log(this.state.state_sample)
        return(
            <>
                <Helmet title="Project List" />
                <body>
                    <header>
                        <ComHeaer/>
                    </header>
                    <main>
                        <ProjectListTable />
                        {/* 下記は動作テスト用なので削除 */}
                        <h1>{this.props.sample}</h1>
                        <button onClick={this.Click}>OK</button>
                        <h1>{this.props.sample}</h1>
                        {/* <h1>{this.props.sample}</h1>
                        <Button onClick={this.Click2}>OK2</Button>
                        <Button onClick={this.Click3}>OK3</Button> */}
                    </main>
                </body>
            </>
        );
    }
}
