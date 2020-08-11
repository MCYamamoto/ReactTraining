import React, { Component } from 'react'
import "../../css/project_list_table.scss"

//FireBase
import firebase, {db} from "../../db/firebase"

//コンテナ
import {ProjectListTableReduxState, ProjectListTableReduxAction} from "./project_list_table_container"

interface OwnProps {

}

enum eViewType{
    VIEW_TYPE_LIST="LIST",
    VIEW_TYPE_GRID="GRID"
}

interface ProjectDataObj {
    number:number,      // 案件番号
    name:string,        // 案件名
    srcCompany:string,  // 発注元会社名
    startDate:string,     // 開始日
    endDate:string        // 期限
}

interface OwnState {
    ViewType:eViewType
    data:ProjectDataObj[]
}

type ProjectListTableProps = OwnProps & ProjectListTableReduxState & ProjectListTableReduxAction;

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

        this.DispGrid = this.DispGrid.bind(this);
        this.DispList = this.DispList.bind(this);

        this.state = {
            ViewType:eViewType.VIEW_TYPE_LIST,
            data:[]
        }

        //DBからデータ取得
        this.getFireData();
    }
    
            
    // Firebaseからのデータ取得
    getFireData() {
        let docRef = db.collection("projectlist").doc("list");
        let self = this;
        const doc = docRef.get()
        .then(res => {
            //正常終了時
            let getdata = res.data();
            if(getdata != null)
            {
                // console.log(getdata.data);
                self.setState({data:getdata.data})    
            }
        })
        .catch(error => {
            //異常終了時
            //alert(error);
        });

        // this.setState({
        //     data: doc.data()
        // });
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
                {this.state.data.map((value)=>
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
                    {this.state.data.map((value)=>
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
