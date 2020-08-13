import React, { Component } from 'react'
import {Label, Button, Input} from "semantic-ui-react"
import {Helmet} from "react-helmet"
import {parse} from 'query-string';
import ComHeaer from "./component/com_header_container";

//FireBase
import {ProjectDataObj, getDBProjectData, updateDBProjectList} from "../db/firebase"

interface OwnProps{
    history:any;
    location:any;
};

type ProjectDetailProps = OwnProps;

//ステート
enum LOADING_STATE{
    LOADING_INIT = "INIT",
    LOADING_WAIT = "WAIT",
    LOADING_COMP = "COMP"
}
interface ProjectDetailState{
    loading:LOADING_STATE;
    docID:string;
    add_data:ProjectDataObj;
}

export default class ProjectDetail extends Component<ProjectDetailProps, ProjectDetailState>{
    constructor(props:ProjectDetailProps){
        super(props);

        //DocID取得
        let docID = parse(this.props.location.search).id as string;
        //ステート初期化
        this.state = {
            loading:LOADING_STATE.LOADING_INIT,
            docID:docID,           // ドキュメントID
            add_data : {
                number:0,           // 案件番号
                name:"",            // 案件名
                srcCompany:"",      // 発注元会社名
                startDate:"",       // 開始日
                endDate:""          // 期限            
            }
        }

        //バインド
        //案件番号入力
        this.handleNumberChange = this.handleNumberChange.bind(this);
        //案件名入力
        this.handleNameChange = this.handleNameChange.bind(this);
        //発注元会社名入力
        this.handlesrcCompanyChange = this.handlesrcCompanyChange.bind(this);
        //開始日入力
        this.handlestartDateChange = this.handlestartDateChange.bind(this);
        //終了日入力
        this.handleendDateChange = this.handleendDateChange.bind(this);
        //更新ボタン押下
        this.UpdateClick = this.UpdateClick.bind(this);

        //DB取得時アクション
        this.getDBResolvAction = this.getDBResolvAction.bind(this);
        this.getDBErrAction = this.getDBErrAction.bind(this);
        
        //DB登録時アクション
        this.updateDBResolvAction = this.updateDBResolvAction.bind(this);
        this.updateDBErrAction = this.updateDBErrAction.bind(this);
        
        //DBから情報取得
        getDBProjectData(this.state.docID, this.getDBResolvAction, this.getDBErrAction);
    }
    //案件番号入力
    handleNumberChange(e:React.ChangeEvent<HTMLInputElement>){
        let value = e.target.value
        this.setState((state)=>{
                let newObj = state.add_data;
                newObj.number = Number(value);
                return {add_data:newObj};
            }
        );
    }
    //案件名入力
    handleNameChange(e:React.ChangeEvent<HTMLInputElement>){
        let value = e.target.value
        this.setState((state)=>{
                let newObj = state.add_data;
                newObj.name = value;
                return state;
            }
        );
    }
    //発注元会社名入力
    handlesrcCompanyChange(e:React.ChangeEvent<HTMLInputElement>){
        let value = e.target.value
            this.setState((state)=>{
                let newObj = state.add_data;
                newObj.srcCompany = value;
                return state;
            }
        );
    }

    //開始日
    handlestartDateChange(e:React.ChangeEvent<HTMLInputElement>){
        let value = e.target.value
        this.setState((state)=>{
                let newObj = state.add_data;
                newObj.startDate = value;
                return state;
            }
        );
    }
    //終了日
    handleendDateChange(e:React.ChangeEvent<HTMLInputElement>){
        let value = e.target.value
        this.setState((state)=>{
                let newObj = state.add_data;
                newObj.endDate = value;
                return state;
            }
        );
    }

    //DBから取得成功時のアクション
    getDBResolvAction(data:ProjectDataObj)
    {
        this.setState({loading:LOADING_STATE.LOADING_COMP});
        this.setState({add_data:data});
    }
    //DB登録失敗時のアクション
    getDBErrAction(err:any)
    {
        this.setState({loading:LOADING_STATE.LOADING_COMP});
        alert(err);
    }    

    //DB登録成功時のアクション
    updateDBResolvAction(res:any)
    {
        this.setState({loading:LOADING_STATE.LOADING_COMP});
        //登録後、Topに移動
        if(this.props.history != null)
        {
            this.props.history.push("/");
        }
    }
    //DB登録失敗時のアクション
    updateDBErrAction(err:any)
    {
        this.setState({loading:LOADING_STATE.LOADING_COMP});
        alert(err);
    }    
    //更新ボタン押下
    UpdateClick()
    {
        //画面を登録中に変更
        this.setState({loading:LOADING_STATE.LOADING_WAIT});
        //DB更新
        updateDBProjectList(this.state.docID, this.state.add_data, this.updateDBResolvAction, this.updateDBErrAction);
    }
    
    render()
    {
        let dispMain;
        if(this.state.loading === LOADING_STATE.LOADING_COMP)
        {
            dispMain = (
                <div>
                    <h1>Select Project Infomation</h1>
                    <Label for="lnumber">案件番号:</Label>
                    <Input type="text" name="number" id="lnumber" placeholder="案件番号" onChange={this.handleNumberChange} value={this.state.add_data.number}/><br />
                    <Label for="lname">案件名:</Label>
                    <Input type="text" name="name" id="lname" placeholder="案件名" onChange={this.handleNameChange} value={this.state.add_data.name}/><br />
                    <Label for="lsrcCompany">発注元会社名:</Label>
                    <Input type="text" name="srcCompany" id="lsrcCompany" placeholder="発注元会社名" onChange={this.handlesrcCompanyChange} value={this.state.add_data.srcCompany}/><br />
                    <Label for="lstartDate">開始日:</Label>
                    <Input type="text" name="startDate" id="lstartDate" placeholder="開始日" onChange={this.handlestartDateChange} value={this.state.add_data.startDate}/><br />
                    <Label for="lendDate">期限:</Label>
                    <Input type="text" name="endDate" id="lendDate" placeholder="期限" onChange={this.handleendDateChange} value={this.state.add_data.endDate}/><br />
                    <Button onClick={this.UpdateClick}>Update</Button>
                </div>
            );
        }
        else if(this.state.loading === LOADING_STATE.LOADING_WAIT)
        {
        //更新中
            dispMain = (
                <div>
                    <h2>更新中...</h2>
                </div>
            );
        }
        else
        {
        //初期表示待ち中
            dispMain = (
                <div>
                    <h2>取得中...</h2>
                </div>
            );
        }

        return(
            <div>
                <Helmet title="Projec Detail" />
                <body>
                    <header>
                        <ComHeaer/>
                    </header>
                    <main>
                        {dispMain}
                    </main>
                </body>
            </div>
        );
    }
}
