import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route ,Switch} from "react-router-dom";  //SPA用
import { Provider } from 'react-redux'

//REDUX関連
import Store from "./OriginalRoot/redux/store"

//ログイン中か判断して、飛ばす頁を変更するコンポーネント
import PrivateRoute from "./OriginalRoot/page/component/private_Route_container"

//各ページ
import TopPage from "./OriginalRoot/page/top_page_container"
import RouteFail from "./OriginalRoot/page/route_faire"
import LoginPage from "./OriginalRoot/page/login_page_container"
import ProjectDetail from "./OriginalRoot/page/project_detail"
import ProjectAdd from "./OriginalRoot/page/project_add"

// import Home from "./OriginalRoot/Container"
// import {Home2} from "./OriginalRoot/unuse/home2"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <Router>
        <Switch>
          {/* ルート画面 */}
          <Route exact path="/" component={TopPage}></Route>
          {/* ログイン画面 */}
          <Route path="/login" component={LoginPage}></Route>
          {/* プロジェクト詳細画面 */}
          <PrivateRoute path="/detail" component={ProjectDetail}></PrivateRoute>
          {/* プロジェクト新規登録画面 */}
          <PrivateRoute path="/add" component={ProjectAdd}></PrivateRoute>
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
