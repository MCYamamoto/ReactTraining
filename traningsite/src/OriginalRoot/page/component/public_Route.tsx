import React, { Component } from 'react'
import {Route, Redirect} from "react-router-dom";  //SPA用
import {PublicrouteReduxState, PublicrouteReduxAction} from "./public_Route_container"

import firebase from "./../../db/firebase"

// プロパティ
interface OwnProps{
    exact?:boolean,
    path:string,
    component:any
}

type PublicRouteProps = OwnProps & PublicrouteReduxState & PublicrouteReduxAction;

// ステート
interface PublicRouteState{
    loading:boolean
}

export default class PublicRoute extends Component<PublicRouteProps,PublicRouteState>{
    constructor(props:PublicRouteProps)
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
        //認証チェック完了している場合、ルーティングする
        if(this.state.loading === false) 
        {
            if(this.props.login === false)
            {
            //未ログインの場合、
                //指定されたパスの頁を表示
                if(this.props.exact == null)
                {
                    return(
                        <Route path={this.props.path} component={this.props.component}></Route>
                    );    
                }
                {
                    return(
                        <Route exact path={this.props.path} component={this.props.component}></Route>
                    );    
                }
            }
            else
            {
            //ログイン済みの場合
                //プロジェクト一覧ページにリダイレクト
                return(
                    <Redirect to="/list"/>
                );
            }
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
