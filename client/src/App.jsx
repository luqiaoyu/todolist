import React, { Component } from 'react';
import { BrowserRouter, Route, Router } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Main from './pages/main';
import DashBoard from './pages/dashboard';

// 全量引入基础组件样式
import '@icedesign/base/index.scss';
// 引入基础组件脚本，无工程辅助情况下 import { Button } from '@icedesign/base'; 会引入所有 js
// import Button from '@icedesign/base/lib/button';
// 引入业务组件脚本
// import Img from '@icedesign/img';
// 引入业务组件样式
import '@icedesign/img/lib/style.js';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={DashBoard} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
