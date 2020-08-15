import React, { Component } from 'react'
import {Label, Button, Input} from "semantic-ui-react"
import {Helmet} from "react-helmet"
import {parse} from 'query-string';
import ComHeaer from "./component/com_header_container";

//CSS
import "./../css/project_detail.scss"

//コンテナ
import {DetailPageReduxState} from "./project_detail_container"

//FireBase
import {ProjectDataObj, getDBProjectData, updateDBProjectList, deleteDBProjectList} from "../db/firebase"

interface OwnProps{
    history:any;
    location:any;
};

type ProjectDetailProps = OwnProps & DetailPageReduxState;

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
                endDate:"",         // 期限  
                logCreateUser:"",   // 作成者
                logCreateDate:"",   // 作成日時
                logUpdateUser:"",   // 更新者
                logUpdateDate:"",   // 更新日時                        
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
        //削除ボタン押下
        this.DeleteClick = this.DeleteClick.bind(this);

        //DB取得時アクション
        this.getDBResolvAction = this.getDBResolvAction.bind(this);
        this.getDBErrAction = this.getDBErrAction.bind(this);
        
        //DB更新時アクション
        this.updateDBResolvAction = this.updateDBResolvAction.bind(this);
        this.updateDBErrAction = this.updateDBErrAction.bind(this);
        
        //DB削除時アクション
        this.deleteDBResolvAction = this.deleteDBResolvAction.bind(this);
        this.deleteDBErrAction = this.deleteDBErrAction.bind(this);

        //DBから情報取得
        getDBProjectData(this.state.docID, this.getDBResolvAction, this.getDBErrAction);
    }
    //案件番号入力
    handleNumberChange(e:React.ChangeEvent<HTMLInputElement>){
        let value = e.target.value
        if(!Number.isNaN(Number(value)))
        {
            this.setState((state)=>{
                    let newObj = state.add_data;
                    newObj.number = Number(value);
                    return {add_data:newObj};
                }
            );
        }
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
        //更新者は今回のログインユーザのため、変更しておく。
        data.logUpdateUser = this.props.user==null?"":this.props.user;
        this.setState({loading:LOADING_STATE.LOADING_COMP});
        this.setState({add_data:data});
    }
    //DB登録失敗時のアクション
    getDBErrAction(err:any)
    {
        this.setState({loading:LOADING_STATE.LOADING_COMP});
        alert(err);
    }    

    //DB更新成功時のアクション
    updateDBResolvAction(res:any)
    {
        this.setState({loading:LOADING_STATE.LOADING_COMP});
    }
    //DB更新失敗時のアクション
    updateDBErrAction(err:any)
    {
        this.setState({loading:LOADING_STATE.LOADING_COMP});
        alert(err);
    }    
    //更新ボタン押下
    UpdateClick()
    {
        //画面を更新中に変更
        this.setState({loading:LOADING_STATE.LOADING_WAIT});
        //DB更新
        updateDBProjectList(this.state.docID, this.state.add_data, this.updateDBResolvAction, this.updateDBErrAction);
    }

    //DB削除成功時のアクション
    deleteDBResolvAction(res:any)
    {
        this.setState({loading:LOADING_STATE.LOADING_COMP});
        //登録後、Topに移動
        if(this.props.history != null)
        {
            this.props.history.push("/");
        }
    }
    //DB削除失敗時のアクション
    deleteDBErrAction(err:any)
    {
        this.setState({loading:LOADING_STATE.LOADING_COMP});
        alert(err);
    }    

    //削除ボタン押下
    DeleteClick()
    {
        //画面を更新中に変更
        this.setState({loading:LOADING_STATE.LOADING_WAIT});
        //DB更新
        deleteDBProjectList(this.state.docID, this.deleteDBResolvAction, this.deleteDBErrAction);
    }
    
    render()
    {
        let dispMain;
        if(this.state.loading === LOADING_STATE.LOADING_COMP)
        {
            dispMain = (
                <div className="projectdetail--page--main">
                    <h2>Select Project Infomation</h2>
                    <div className="input_rows">
                        <div className="input_row">
                            <div className="input">
                                <Label for="lnumber">案件番号:</Label>
                                <Input type="text" name="number" id="lnumber" placeholder="案件番号" onChange={this.handleNumberChange} value={this.state.add_data.number}/>
                            </div><br />
                            <div className="input">
                                <Label for="lname">案件名:</Label>
                                <Input type="text" name="name" id="lname" placeholder="案件名" onChange={this.handleNameChange} value={this.state.add_data.name}/>
                            </div><br />
                            <div className="input">
                                <Label for="lsrcCompany">発注元会社名:</Label>
                                <Input type="text" name="srcCompany" id="lsrcCompany" placeholder="発注元会社名" onChange={this.handlesrcCompanyChange} value={this.state.add_data.srcCompany}/>
                            </div>
                        </div>
                        <div className="input_row">
                            <div className="input">
                                <Label for="lstartDate">開始日:</Label>
                                <Input type="date" name="startDate" id="lstartDate" placeholder="開始日" onChange={this.handlestartDateChange} value={this.state.add_data.startDate}/>
                            </div><br />
                            <div className="input">
                                <Label for="lendDate">期限:</Label>
                                <Input type="date" name="endDate" id="lendDate" placeholder="期限" onChange={this.handleendDateChange} value={this.state.add_data.endDate}/>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <Button className="updatebutton" onClick={this.UpdateClick}>Update</Button><br /><br />
                    <Button className="deletebutton" onClick={this.DeleteClick}>Delete</Button>
                </div>
            );
        }
        else if(this.state.loading === LOADING_STATE.LOADING_WAIT)
        {
        //更新中
            dispMain = (
                <div className="projectdetail--page--loading">
                    <h2>更新中...</h2>
                </div>
            );
        }
        else
        {
        //初期表示待ち中
            dispMain = (
                <div className="projectdetail--page--loading">
                    <h2>Loading...</h2>
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
