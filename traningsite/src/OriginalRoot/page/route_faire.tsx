import React,{Component} from "react";
import {connect,} from 'react-redux'
import {Header} from "semantic-ui-react"

class RouteFail extends Component {
  render() {
    return (
      <h1>Fail Page</h1>
    );
  }
}

export default connect()(RouteFail);
