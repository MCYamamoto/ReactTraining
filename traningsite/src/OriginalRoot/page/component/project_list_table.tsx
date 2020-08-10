import React, { Component } from 'react'
import "../../css/project_list_table.scss"

//コンテナ
import {ProjectListTableReduxState, ProjectListTableReduxAction} from "./project_list_table_container"

interface OwnProps {

}

enum eViewType{
    VIEW_TYPE_LIST="LIST",
    VIEW_TYPE_GRID="GRID"
}
interface OwnState {
    ViewType:eViewType
}

type ProjectListTableProps = OwnProps & ProjectListTableReduxState & ProjectListTableReduxAction;

interface ProjectDataObj {
    number:number,      // 案件番号
    name:string,        // 案件名
    srcCompany:string,  // 発注元会社名
    startDate:string,     // 開始日
    endDate:string        // 期限
}
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

    arrProjectData:ProjectDataObj[] = [
        {number:1,name:"テストプロジェクト1", srcCompany:"モルト1", startDate:"2020/07/01", endDate:"2020/08/31"},
        {number:2,name:"テストプロジェクト2", srcCompany:"モルト2", startDate:"2020/08/01", endDate:"2020/08/31"},
        {number:3,name:"テストプロジェクト3", srcCompany:"モルト3", startDate:"2020/09/01", endDate:"2020/09/31"}
    ]

    constructor(props:ProjectListTableProps) 
    {
        super(props);
        this.Click = this.Click.bind(this);
        this.DispGrid = this.DispGrid.bind(this);
        this.DispList = this.DispList.bind(this);

        this.state = {
            ViewType:eViewType.VIEW_TYPE_LIST
        }
    }
    Click()
    {
        this.props.headerHeightaction(100);
    }
    DispGrid(){
        this.setState((state)=>({ViewType:eViewType.VIEW_TYPE_GRID}))
    }
    DispList()
    {
        this.setState((state)=>({ViewType:eViewType.VIEW_TYPE_LIST}))
    }
    render(){
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
                {this.arrProjectData.map((value)=>
                    <tr>
                        <td>{value.number}</td>
                        <td>{value.name}</td>
                        <td>{value.srcCompany}</td>
                        <td>{value.startDate}</td>
                        <td>{value.endDate}</td>
                    </tr>
                )}
            </tbody>
        </table>
        )
        let ViewLGrid = (
                <div style={this.gridStyle}>
                    {this.arrProjectData.map((value)=>
                        <div style={this.gridItemStyle}>
                            <p>{"案件番号　　:"}{value.number}</p>
                            <p>{"案件名　　　:"}{value.name}</p>
                            <p>{"発注元会社名:"}{value.srcCompany}</p>
                            <p>{"開始日　　　:"}{value.startDate}</p>
                            <p>{"期限　　　　:"}{value.endDate}</p>
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
