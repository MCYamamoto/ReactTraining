import React, { Component } from 'react'
import {Route} from "react-router-dom";  //SPA用
import {PrivaterouteReduxState} from "./private_Route_container"

import LoginPage from "../../page/login_page"

interface OwnProps{
    path:string,
    component:any
}

type PrivateRouteProps = OwnProps & PrivaterouteReduxState;

export default class PrivateRoute extends Component<PrivateRouteProps>{
    constructor(props:PrivateRouteProps)
    {
        super(props);
    }
    render()
    {
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
