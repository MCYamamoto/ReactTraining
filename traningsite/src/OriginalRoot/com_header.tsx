// 各ページで表示する統一的なヘッダーを作成する。

import React, { Component } from 'react'
import {connect,} from 'react-redux'
import {Link} from "react-router-dom"
import {} from "semantic-ui-react"
import "./header.scss"

class ComHeaer extends Component
{
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
    componentDidMount() {
    }

    constructor(){
        super({});
    }
    render()
    {
        return (
            <>
                <h1><Link className="header-link" to="/">Project List</Link></h1>
                <nav className="header-nav">
                    <ul>
                        <li><Link className="header-link" to="#">ADD PROJECT</Link></li>
                    </ul>

                    {/* 今回は使わないスタイル設定 */}
                    {/* <ul style={this.liStyle}>
                        <li style={this.ulStyle}><Link style={this.linkStyle} to="#">ABOUT</Link></li>
                        <li style={this.ulStyle}><Link style={this.linkStyle} to="#">SERVICE</Link></li>
                        <li style={this.ulStyle}><Link style={this.linkStyle} to="#">COMPANY</Link></li>
                        <li style={this.ulStyle}><Link style={this.linkStyle} to="#">CONTACT</Link></li>
                    </ul> */}
                </nav>
            </>        
        );
    }
}

export default connect()(ComHeaer);
