//必要
import React, { Component, ReactEventHandler } from 'react'
import {Helmet} from "react-helmet"
import {Label, Button, Input} from "semantic-ui-react"
import firebase, {Provider} from '../db/firebase';
// CSS
import "./../css/login.scss"

// コンポーネント
import ComHeaer from "./component/com_header_container";

//コンテナ
import {LoginPageReduxState, LoginPageReduxAction} from "./login_page_container"

//プロパティ
interface OwnProps {
    history:any;
    location:any;
}

type LoginPageProps = OwnProps & LoginPageReduxState & LoginPageReduxAction;

//ステート
interface LoginPageState{
    mail:string;
    pass:string;
    loading:boolean;
}

export default class LoginPage extends Component<LoginPageProps, LoginPageState>{
    constructor(props:LoginPageProps){
        super(props);

        //ステート初期化
        this.state = {
            mail:"",
            pass:"",
            loading:false
        }

        //バインド
        this.LoginClick = this.LoginClick.bind(this);
        this.LoginEnter = this.LoginEnter.bind(this);
        this.sigInGoogleAcount = this.sigInGoogleAcount.bind(this);
        this.handleMailChange = this.handleMailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }
    //メールアドレス更新
    handleMailChange(e:React.ChangeEvent<HTMLInputElement>){
        let value = e.target.value
        this.setState({mail:value});
    }
    //パスワード更新
    handlePasswordChange(e:React.ChangeEvent<HTMLInputElement>){
        let value = e.target.value
        this.setState({pass:value});
    }
    sigIn(){
        //ローディング中にする。
        this.setState({loading:true});
        //サインイン（ログイン）処理
        firebase.auth().signInWithEmailAndPassword(this.state.mail, this.state.pass)
            .then(res => {
                //正常終了時
                let email = "";
                if(res.user != null)
                {
                    if(res.user.email != null)
                    {
                        email = res.user.email;
                    }
                }

                this.setState({loading:false});
                this.props.loginaction(true, email);
                if(this.props.location.pathname === "/login")
                {
                    this.props.history.push("/");
                }
                else
                {
                    this.props.history.push(this.props.location.pathname);
                }
            })
            .catch(error => {
                //ローディング解除にする。
                this.setState({loading:false});
                //異常終了時
                this.props.loginaction(false, "");
                alert(error);
            });
    }
    //ログイン開始
    LoginClick(){
        this.sigIn();
    }
    //ログイン開始(エンターキー)
    LoginEnter(e: React.KeyboardEvent<HTMLInputElement>)
    {
        if(e.key === "Enter")
        {
            this.sigIn();
        }
    }
    sigInGoogleAcount()
    {
        //ローディング中にする。
        this.setState({loading:true});
        firebase.auth().signInWithPopup(Provider).then((res)=>{
            //正常終了時
            let email = "";
            if(res.user != null)
            {
                if(res.user.email != null)
                {
                    email = res.user.email;
                }
            }

            this.setState({loading:false});
            this.props.loginaction(true, email);
            if(this.props.location.pathname === "/login")
            {
                this.props.history.push("/");
            }
            else
            {
                this.props.history.push(this.props.location.pathname);
            }
        }).catch((error) => {
            //ローディング解除にする。
            this.setState({loading:false});
            //異常終了時
            this.props.loginaction(false, "");
            alert(error);
        });
    }
    render()
    {
        let dispMain;
        if(this.state.loading === false)
        {
            dispMain = (
                <div className="loginpage--main">
                    <h2>認証</h2>
                    <div className="input">
                        <Label className="label" for="lmail">Mail Address:</Label>
                        <Input type="text" name="mail" id="lmail" placeholder="Email" onChange={this.handleMailChange}/>
                    </div>
                    <br />
                    <div className="input">
                        <Label className="label" for="lpass">Paassword:</Label>
                        <Input type="password" name="pass" id="lpass" placeholder="Password" onChange={this.handlePasswordChange}  onKeyPress={this.LoginEnter} />
                    </div>
                    <br />
                    <Button onClick={this.LoginClick}>認証</Button>
                    <br />
                    <br />
                    <Button onClick={this.sigInGoogleAcount}>Googleアカウントで認証</Button>
                </div>
            );
        }
        else
        {
            dispMain = (
                <div className="loginpage--main">
                    <h2>Loading...</h2>
                </div>
            );
        }
        return(
            <>
                <Helmet title="Login Page" />
                <body>
                    <header>
                        <ComHeaer naviEnable={false}/>
                    </header>
                    <main>
                        {dispMain}
                    </main>
                </body>
            </>
        );
    }
}

