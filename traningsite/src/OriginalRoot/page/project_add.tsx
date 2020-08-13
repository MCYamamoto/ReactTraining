import React, { Component } from 'react'
import {Helmet} from "react-helmet"
import {Label, Input, Button} from "semantic-ui-react"
//共通ヘッダ
import ComHeaer from "./component/com_header_container";

//FireBase
import {ProjectDataObj, AddDBProjectList} from "../db/firebase"

interface OwnProps {
    history?:any,
    location?:any
};

type ProjectAddProps = OwnProps;

//ステート
interface ProjectAddState{
    loading:boolean;
    add_data:ProjectDataObj;
}


export default class ProjectAdd extends Component<ProjectAddProps, ProjectAddState>{
    constructor(props:ProjectAddProps){
        super(props);

        //ステート初期化
        this.state = {
            loading:false,
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
        //確定ボタン押下
        this.OKClick = this.OKClick.bind(this);

        //DB登録時アクション
        this.addDBResolvAction = this.addDBResolvAction.bind(this);
        this.addDBErrAction = this.addDBErrAction.bind(this);
    
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
    //DB登録成功時のアクション
    addDBResolvAction(res:any)
    {
        this.setState({loading:false});
        //登録後、Topに移動
        if(this.props.history != null)
        {
            this.props.history.push("/");
        }
    }
    //DB登録失敗時のアクション
    addDBErrAction(err:any)
    {
        this.setState({loading:false});
        alert(err);
    }    
    //確定ボタン押下
    OKClick()
    {
        //画面を登録中に変更
        this.setState({loading:true});
        //DB登録
        AddDBProjectList(this.state.add_data, this.addDBResolvAction, this.addDBErrAction);
    }

    render()
    {
        let dispMain;
        if(this.state.loading === false)
        {
            dispMain = (
                <div>
                    <h1>New Project Infomation</h1>
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
                    <Button onClick={this.OKClick}>OK</Button>
                </div>
            );
        }
        else
        {
            dispMain = (
                <div>
                    <h2>登録中...</h2>
                </div>
            );
        }

        return(
            <div>
                <Helmet title="Project Add" />
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
