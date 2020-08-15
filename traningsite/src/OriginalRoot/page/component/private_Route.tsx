import React, { Component } from 'react'
import {Route} from "react-router-dom";  //SPA用
import {PrivaterouteReduxState, PrivaterouteReduxAction} from "./private_Route_container"

import firebase from "./../../db/firebase"

//リンクページ
import LoginPage from "../../page/login_page_container"

// プロパティ
interface OwnProps{
    path:string,
    component:any
}

type PrivateRouteProps = OwnProps & PrivaterouteReduxState & PrivaterouteReduxAction;

// ステート
interface PrivateRouteState{
    loading:boolean
}

export default class PrivateRoute extends Component<PrivateRouteProps,PrivateRouteState>{
    constructor(props:PrivateRouteProps)
    {
        super(props);
        this.state = {
            loading:true
        }

        //FireBaseへの認証状態チェック
        this.authStateChange();
    }

    //認証状態チェック
    authStateChange()
    {
        //切断しているかチェック
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                //してる
                if (this.props.login === false) {
                    this.props.loginaction(true, user.email==null?"":user.email);
                }
            } else {
                //してない
                if (this.props.login === true) {
                    this.props.loginaction(false,"");
                }
            }
            //認証完了
            this.setState({loading:false})
        })
    }

    render()
    {
        let lcomponent;
        //認証チェック完了している場合、ルーティングする
        if(this.state.loading === false) 
        {
            if(this.props.login === false)
            {
            //未ログインの場合、
                //ログイン頁頁表示
                lcomponent = LoginPage;
            }
            else
            {
            //ログイン済みの場合
                //指定されたパスの頁を表示
                lcomponent=this.props.component;
            }
            return(
                <Route path={this.props.path} component={lcomponent}></Route>
            );
        }
        //認証チェック未完了の場合、何も表示しない。
        else
        {
            return(
                <div></div>
            );
        }
    }
}
