import React, { Component } from 'react'
import {Header, Button} from "semantic-ui-react"
import {connect,} from 'react-redux'
import {Link} from "react-router-dom"
import {ExternReduxState, mapStateToProps, mapDispatchToProps} from "./store"
import {Helmet} from "react-helmet"
import "./top.scss"

import ComHeaer from "./com_header";

type TopProps = {
} & ExternReduxState;

interface TopState{
    state_sample:number;
}

export class TopPage extends Component<TopProps, TopState>{
    constructor(props:TopProps){
        super(props);
        this.Click = this.Click.bind(this);
        this.Click2 = this.Click2.bind(this);
        this.Click3 = this.Click3.bind(this);
        this.state = 
        {
            state_sample:0
        }
    }
    Click(){
        this.props.sampleaction(10);
    }
    Click2(){
        this.props.sampleaction();
    }
    Click3(){
        this.setState((state)=>{
            return {
                state_sample:state.state_sample+1
            }
        });
    }
    
    render()
    {
            // console.log(this.props.sample);
        // console.log(this.state.state_sample)
        return(
            <>
                <Helmet title="ProjectList" />
                <body>
                    <header>
                        <ComHeaer/>
                    </header>
                    <main>
                        <h1>{this.props.sample}</h1>
                        <h1>{this.state.state_sample}</h1>
                        <Button onClick={this.Click}>OK</Button>
                        <Button onClick={this.Click2}>OK2</Button>
                        <Button onClick={this.Click3}>OK3</Button>
                    </main>
                </body>
            </>
        );
    }
}

export default connect(mapStateToProps,  mapDispatchToProps)(TopPage);
