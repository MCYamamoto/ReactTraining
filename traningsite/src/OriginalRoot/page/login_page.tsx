//必要
import React, { Component, ReactElement } from 'react'
import {Helmet} from "react-helmet"
import {Label, Button, Input} from "semantic-ui-react"
import {login} from "./../db/auth"
// CSS


// コンポーネント
import ComHeaer from "./component/com_header";


//コンテナ


//プロパティ
interface OwnProps {
}

type LoginPageProps = OwnProps;

//ステート
interface LoginPageState{
    mail:string;
    pass:string;
}

export default class LoginPage extends Component<LoginPageProps, LoginPageState>{
    constructor(props:LoginPageProps){
        super(props);
        this.state = {
            mail:"",
            pass:""
        }

        this.LoginClick = this.LoginClick.bind(this);
    }
    //メールアドレス更新
    handleMailChange(e:React.ChangeEvent<HTMLInputElement>){
        this.setState((value)=>({mail:e.target.value}));
    }
    //パスワード更新
    handlePasswordChange(e:React.ChangeEvent<HTMLInputElement>){
        this.setState((value)=>({pass:e.target.value}));
    }
    
    //ログイン開始
    LoginClick(){
        login(this.state.mail, this.state.pass, "/");
    }
    
    render()
    {
        return(
            <>
                <Helmet title="Login Page" />
                <body>
                    <header>
                        <ComHeaer naviEnable={false}/>
                    </header>
                    <main>
                        <Label for="lmail">Mail Address:</Label>
                        {/* <Input type="text" name="mail" id="lmail" placeholder="Email" value={this.state.mail} onChange={this.handleMailChange}/><br /> */}
                        <Input type="text" name="mail" id="lmail" placeholder="Email" onChange={this.handleMailChange}/><br />
                        <Label for="lpass">Paassword:</Label>
                        {/* <Input type="text" name="pass" id="lpass" placeholder="Password" value={this.state.pass} onChange={this.handlePasswordChange}/><br /> */}
                        <Input type="text" name="pass" id="lpass" placeholder="Password" onChange={this.handlePasswordChange}/><br />
                        <Button onClick={this.LoginClick}>Submit</Button>
                    </main>
                </body>
            </>
        );
    }
}

