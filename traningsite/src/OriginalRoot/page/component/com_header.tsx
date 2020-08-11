// 各ページで表示する統一的なヘッダーを作成する。

import React, { Component } from 'react'
import {connect,} from 'react-redux'
import {Link} from "react-router-dom"
import {} from "semantic-ui-react"
import "../../css/com_header.scss"

//コンテナ
import {ComHeaderReduxState} from "./com_header_container"

interface OwnProps
{
    naviEnable?:boolean;
}

interface DefaultProps
{
    naviEnable:boolean;
}

type ComHeaerProps = OwnProps & ComHeaderReduxState;

export default class ComHeaer extends Component<ComHeaerProps>
{
    // Propsのデフォルト値
    public static defaultProps: DefaultProps = {
        naviEnable: true  // デフォルトはnav有効
    };

    //別のスタイル設定方法(今回は使用してない)
    linkStyle = {
        textDecoration: "none",
        color: "#4b4b4b"
    }
    ulStyle = {
        listStyle: "none",
        // margin: "0",
        margin:"0 0 0 15px"
    }
    liStyle = {
        // margin:"0 0 0 15px",
        fontSize:"14px",
        display: "flex"
    }
    constructor(props:ComHeaerProps){
        super(props);
    }
    render()
    {
        let DispNavi;
        if(this.props.naviEnable === true)
        {
        // NAV表示あり
            if(this.props.login === true)
            {
                //ログイン済み
                DispNavi = 
                <nav className="header-nav">
                    <ul>
                        <li><Link className="header-link" to="/add">NewProject</Link></li>
                    </ul>
                </nav>
            }
            else
            {
                //未ログイン
                DispNavi = 
                <nav className="header-nav">
                    <ul>
                        <li><Link className="header-link" to="/login">Login</Link></li>
                    </ul>
                </nav>
            }
        }
        else
        {
            // NAV表示なし
            DispNavi = <nav className="header-nav"></nav>
        }
        return (
            <>
                <h1><Link className="header-link" to="/">Project List</Link></h1>
                {DispNavi}
                    {/* 今回は使わないスタイル設定 */}
                    {/* <ul style={this.liStyle}>
                        <li style={this.ulStyle}><Link style={this.linkStyle} to="#">ABOUT</Link></li>
                        <li style={this.ulStyle}><Link style={this.linkStyle} to="#">SERVICE</Link></li>
                        <li style={this.ulStyle}><Link style={this.linkStyle} to="#">COMPANY</Link></li>
                        <li style={this.ulStyle}><Link style={this.linkStyle} to="#">CONTACT</Link></li>
                    </ul> */}
            </>        
        );
    }
}
