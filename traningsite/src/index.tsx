import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route ,Switch} from "react-router-dom";  //SPA用
import { Provider } from 'react-redux'

//REDUX関連
import Store from "./OriginalRoot/redux/store"

//各ページ
import TopPage from "./OriginalRoot/page/top_page_container"
import RouteFail from "./OriginalRoot/page/route_faire"
import ProjectDetail from "./OriginalRoot/page/project_detail"
import ProjectAdd from "./OriginalRoot/page/project_add"

// import Home from "./OriginalRoot/Container"
// import {Home2} from "./OriginalRoot/unuse/home2"

ReactDOM.render(
  <React.StrictMode>
    {/* <Home2 /> stateのお試しのため、未使用*/}
    <Provider store={Store}>
      <Router>
        <Switch>
          <Route exact path="/" component={TopPage}></Route>
          {/* プロジェクト詳細画面 */}
          <Route path="/detail" component={ProjectDetail}></Route>
          {/* プロジェクト新規登録画面 */}
          <Route path="/add" component={ProjectAdd}></Route>
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
