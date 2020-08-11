import React, { Component } from 'react'
import {Route} from "react-router-dom";  //SPA用
import {PrivaterouteReduxState, PrivaterouteReduxAction} from "./private_Route_container"

import firebase from "./../../db/firebase"

//リンクページ
import LoginPage from "../../page/login_page_container"

interface OwnProps{
    path:string,
    component:any
}

type PrivateRouteProps = OwnProps & PrivaterouteReduxState & PrivaterouteReduxAction;

export default class PrivateRoute extends Component<PrivateRouteProps>{
    constructor(props:PrivateRouteProps)
    {
        super(props);
    }
    render()
    {
        //切断しているかチェック
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                //してる
                if (this.props.login === false) {
                    this.props.loginaction(true);
                }
            } else {
                //してない
                if (this.props.login === true) {
                    this.props.loginaction(false);
                }
            }
        })
        
        let lcomponent;
        if(this.props.login === false)
        {
        //未ログイン
            lcomponent = LoginPage;
        }
        else
        {
        //ログイン済み
            lcomponent=this.props.component;
        }
        return(
            <Route path={this.props.path} component={lcomponent}></Route>
        );
    }
}
