import React, { Component } from 'react'
import {Select,DropdownItemProps,DropdownProps} from "semantic-ui-react"

//CSS
import "../../css/project_list_table.scss"

//画像
import logoGridView from "./../../../image/gridDisp.png"
import logoListView from "./../../../image/listDisp.png"
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
    loading:boolean;            //ロード中状態
    ViewType:eViewType;         //リスト表示の種別
    docMaxPage:number;          //全頁数
    dispPage:number;            //現在表示中の頁数(1オリジン)
    dispNum:number;             //１ページの表示数
    lists:getProjectDataObj[];  //表示データ
}

// type ProjectListTableProps = OwnProps & ProjectListTableReduxState & ProjectListTableReduxAction;
type ProjectListTableProps = OwnProps;

export default class ProjectListTable extends Component<ProjectListTableProps, OwnState>{
    //スタイル
    gridStyle = {
        display:"grid",
        gap:"18px",
        gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))",
        marginTop:"1%",
        marginBottom:"50px",
    }
    gridItemStyle = {
        border:"solid 1px",
        padding:"10px",
    }
    constructor(props:ProjectListTableProps) 
    {
        super(props);

        //バインド
        //ボタンクリック
        this.DispGrid = this.DispGrid.bind(this);
        this.DispList = this.DispList.bind(this);
        this.clickPrevPage = this.clickPrevPage.bind(this);
        this.clickNextPage = this.clickNextPage.bind(this);
        this.selectPage = this.selectPage.bind(this);

        //テーブル選択
        this.SelectProjectList = this.SelectProjectList.bind(this);
        this.SelectProjectGrid = this.SelectProjectGrid.bind(this);

        //DB操作
        this.getDBResolvAction = this.getDBResolvAction.bind(this);
        this.getDBErrAction = this.getDBErrAction.bind(this);

        this.state = {
            loading:true,
            ViewType:eViewType.VIEW_TYPE_LIST,
            docMaxPage:1,
            dispPage:1,
            dispNum:15,
            lists:[]
        }

        //DBからデータ取得
        getDBProjectList("number", "desc", ((this.state.dispPage-1)*this.state.dispNum), this.state.dispNum, "", "", this.getDBResolvAction, this.getDBErrAction);
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
    selectPage(e: React.SyntheticEvent<HTMLElement, Event> ,data: DropdownProps)
    {
        let selectPage = data.value;
        this.setState((value)=>{
            return {
                loading:true,
                dispPage:Number(selectPage)
            }
        },()=>{
            //DBからデータ取得
            getDBProjectList("number", "desc", (this.state.dispPage-1)*this.state.dispNum, this.state.dispNum, "", "", this.getDBResolvAction, this.getDBErrAction);
        })
}
    clickPrevPage(){
        //前の頁へ
        //念のため、下限チェック
        if(this.state.dispPage > 1)
        {
            this.setState((value)=>{return {
                loading:true,
                dispPage:value.dispPage-1}
            },()=>{
                //DBからデータ取得
                getDBProjectList("number", "desc", (this.state.dispPage-1)*this.state.dispNum, this.state.dispNum, "", "", this.getDBResolvAction, this.getDBErrAction);
            })
        }
    }
    clickNextPage(){
        //次の頁へ
        //念のため、上限チェック
        if(this.state.dispPage < this.state.docMaxPage)
        {
            this.setState((value)=>{
                return {
                    loading:true,
                    dispPage:value.dispPage+1
                }
            },()=>{
                //DBからデータ取得
                getDBProjectList("number", "desc", (this.state.dispPage-1)*this.state.dispNum, this.state.dispNum, "", "", this.getDBResolvAction, this.getDBErrAction);
            })
        }
    }
    //DB取得成功時のアクション
    getDBResolvAction(docsize:number,getdata:getProjectDataObj[])
    {
        //ドキュメント数更新
        this.setState((state)=>{
            return{
                docMaxPage:Math.ceil((docsize/state.dispNum))
            }
        });

        //ドキュメントリスト更新
        if(getdata != null)
        {
            this.setState({lists:getdata})
        }
        this.setState({loading:false});
    }
    //DB取得失敗時のアクション
    getDBErrAction(err:any)
    {
        this.setState({loading:false});
        alert(err);
    }
    render(){
        if(this.state.loading === false)
        {
            let ViewTypeBtnStyle = 
            {
                display:"flex",
                justifyContent: "flex-end",
                marginRight:"50px"
            }
            let ViewList = (
            <table>
                <thead>
                    <tr>
                        <th className="data-number">案件番号</th>
                        <th className="data-name">案件名</th>
                        <th className="data-srcCompay">発注元会社名</th>
                        <th className="data-startDate">開始日</th>
                        <th className="data-endDate">期限</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.lists.map((value)=>
                        <tr onClick={this.SelectProjectList} key={value.data.number}>
                            <td className="data-number">{value.data.number}</td>
                            <td className="data-name">{value.data.name}</td>
                            <td className="data-srcCompay">{value.data.srcCompany}</td>
                            <td className="data-startDate">{value.data.startDate}</td>
                            <td className="data-endDate">{value.data.endDate}</td>
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
            let options:DropdownItemProps[] = [];
            for(let i= 1;i<=this.state.docMaxPage;i++)
            {
               options.push({
                   key:i,
                   value:i,
                   text:i
               });
            } 
            return(
                <div>
                    <div style={ViewTypeBtnStyle}>
                        <div className="project-list--main--pagedisp--select">
                            {this.state.dispPage<=1?<div></div>:<label className="project-list--main--pageselect--label" onClick={this.clickPrevPage}>&lt;</label>}
                            <Select value={this.state.dispPage} options={options} onChange={this.selectPage}/>
                            <label className="project-list--main--pagedisp--label"> / {this.state.docMaxPage}</label>
                            {this.state.dispPage===(this.state.docMaxPage)?<div></div>:<label className="project-list--main--pageselect--label" onClick={this.clickNextPage}>&gt;</label>}
                        </div>
                        <input className="project-list--main--input" type="image" name="DispList" src={logoListView} alt="ListView" onClick={this.DispList} />
                        <input className="project-list--main--input" type="image" name="DispGrid" src={logoGridView} alt="GridView" onClick={this.DispGrid} />
                    </div> 
                    {this.state.ViewType===eViewType.VIEW_TYPE_LIST?ViewList:ViewLGrid}
                </div>
            );    
        }
        else
        {
            return(
                <div className="project-list--main--loading">
                    <h2>Loading...</h2>
                </div>
            );    
        }
    }
}
