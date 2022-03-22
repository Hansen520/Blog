//引入react核心库
import React from 'react';
//引入ReactDOM
import ReactDOM from 'react-dom';
// 引入路由
import { BrowserRouter } from 'react-router-dom';
//引入App
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
