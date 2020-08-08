import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route ,Switch} from "react-router-dom";  //SPA用
import { Provider } from 'react-redux'

//REDUX関連
import Store from "./OriginalRoot/store"

//各ページ
import Home from "./OriginalRoot/home"
// import Home from "./OriginalRoot/Container"
import RouteFail from "./OriginalRoot/route_faire"
import ProjectDetail from "./OriginalRoot/project_detail"
import {Home2} from "./OriginalRoot/home2"

ReactDOM.render(
  <React.StrictMode>
    {/* <Home2 /> stateのお試しのため、未使用*/}
    <Provider store={Store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/projectdetail" component={ProjectDetail}></Route>
          <Route component={RouteFail} />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
