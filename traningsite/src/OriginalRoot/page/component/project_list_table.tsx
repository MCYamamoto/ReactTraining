import React, { Component } from 'react'
import "../../css/project_list_table.scss"

//FireBase
import {getProjectDataObj, getDBProjectList} from "../../db/firebase"

//コンテナ
// import {ProjectListTableReduxState, ProjectListTableReduxAction} from "./project_list_table_container"

interface OwnProps {
    history:any;
    location:any;
}

enum eViewType{
    VIEW_TYPE_LIST="LIST",
    VIEW_TYPE_GRID="GRID"
}

interface OwnState {
    ViewType:eViewType;
    lists:getProjectDataObj[];
}

// type ProjectListTableProps = OwnProps & ProjectListTableReduxState & ProjectListTableReduxAction;
type ProjectListTableProps = OwnProps;

export default class ProjectListTable extends Component<ProjectListTableProps, OwnState>{
    gridStyle = {
        display:"grid",
        gap:"26px",
        gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))",
        marginTop:"6%",
        marginBottom:"50px",
    }
    gridItemStyle = {
        border:"solid",
        padding:"10px"
    }
    constructor(props:ProjectListTableProps) 
    {
        super(props);

        //バインド
        //ボタンクリック
        this.DispGrid = this.DispGrid.bind(this);
        this.DispList = this.DispList.bind(this);

        //テーブル選択
        this.SelectProjectList = this.SelectProjectList.bind(this);
        this.SelectProjectGrid = this.SelectProjectGrid.bind(this);

        //DB操作
        this.getDBResolvAction = this.getDBResolvAction.bind(this);
        this.getDBErrAction = this.getDBErrAction.bind(this);

        this.state = {
            ViewType:eViewType.VIEW_TYPE_LIST,
            lists:[]
        }
    }
        
    //グリッド表示
    DispGrid(){
        this.setState((state)=>({ViewType:eViewType.VIEW_TYPE_GRID}))
    }

    //リスト表示
    DispList()
    {
        this.setState((state)=>({ViewType:eViewType.VIEW_TYPE_LIST}))
    }
    //プロジェクト選択(リスト)
    SelectProjectList(event: React.MouseEvent<HTMLTableRowElement, MouseEvent>)
    {
        if(event.currentTarget)  
        {
            let currentIndex = event.currentTarget.sectionRowIndex;
            if(currentIndex >= 0 && currentIndex < this.state.lists.length)
            {
                this.props.history.push("/detail?id="+this.state.lists[currentIndex].docID);
            }
        }
    }
    //プロジェクト選択(グリッド)
    SelectProjectGrid(event: React.MouseEvent<HTMLDivElement, MouseEvent>)
    {
        if(event.currentTarget)  
        {
            let currentIndex = Number(event.currentTarget.dataset.item);
            if(currentIndex >= 0 && currentIndex < this.state.lists.length)
            {
                this.props.history.push("/detail?id="+this.state.lists[currentIndex].docID);
            }
        }
    }
    //DB取得成功時のアクション
    getDBResolvAction(getdata:getProjectDataObj[])
    {
        this.setState({lists:getdata})    
    }
    //DB取得失敗時のアクション
    getDBErrAction(err:any)
    {
        //未ログインのため、何もしない。
        //alert(err);
    }
    render(){
        //DBからデータ取得
        getDBProjectList("number", "desc", 10, "", "", this.getDBResolvAction, this.getDBErrAction);

        let ViewTypeBtnStyle = 
        {
            display:"flex"
        }
        let ViewList = (
        <table>
            <thead>
                <tr>
                    <th>案件番号</th>
                    <th>案件名</th>
                    <th>発注元会社名</th>
                    <th>開始日</th>
                    <th>期限</th>
                </tr>
            </thead>
            <tbody>
                {this.state.lists.map((value)=>
                    <tr onClick={this.SelectProjectList} key={value.data.number}>
                        <td>{value.data.number}</td>
                        <td>{value.data.name}</td>
                        <td>{value.data.srcCompany}</td>
                        <td>{value.data.startDate}</td>
                        <td>{value.data.endDate}</td>
                    </tr>
                )}
            </tbody>
        </table>
        )
        let ViewLGrid = (
                <div style={this.gridStyle} className="main-ProjectListTable-Grid">
                    {this.state.lists.map((value, index)=>
                        <div data-item={index} style={this.gridItemStyle} onClick={this.SelectProjectGrid}>
                            <p>{"案件番号　　:"}{value.data.number}</p>
                            <p>{"案件名　　　:"}{value.data.name}</p>
                            <p>{"発注元会社名:"}{value.data.srcCompany}</p>
                            <p>{"開始日　　　:"}{value.data.startDate}</p>
                            <p>{"期限　　　　:"}{value.data.endDate}</p>
                        </div> 
                    )}
                </div>
        )
        return(
            <div>
                <div style={ViewTypeBtnStyle}>
                    <button onClick={this.DispGrid}>Grid</button>
                    <button onClick={this.DispList}>List</button>
                </div> 
                {this.state.ViewType===eViewType.VIEW_TYPE_LIST?ViewList:ViewLGrid}
            </div>
        );
    }
}
