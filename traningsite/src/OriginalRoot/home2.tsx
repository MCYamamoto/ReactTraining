// stateのお試しのため、未使用

import React, { Component } from 'react'
import {connect} from 'react-redux'
import {ExternReduxState, mapStateToProps, mapDispatchToProps} from "./store"

interface Home2Props{

}
interface Home2State{
    data:number;
}

export class Home2 extends Component<Home2Props, Home2State>{
    constructor(props:Home2Props)
    {
        super(props);
        this.state = {
            data:0
        }
        this.click = this.click.bind(this);
    }
    click()
    {
        this.setState((value)=>{return {data:value.data+1}});
    }
    render()
    {
        let mojimoji = "aaa" + this.state.data;
        return(
            <div>
                <p>{mojimoji}</p>
                <button onClick={this.click}>OK</button>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home2);
