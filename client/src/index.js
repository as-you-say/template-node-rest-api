import React from 'react';
import React from 'react-dom';

import './index.css'
import 'antd/dist/antd.css';
import App from './App';
import { Provider } from 'react-redux';

import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import Reducer from './_reducers';

const createStoreWithMiddleWare = applyMiddleware(promiseMiddleware, thunkMiddleware)(createStore);

// 크롬 확장프로그램 리덕스 익스텐션을 위한 WINDOW 설정입니다.
ReactDOM.render(
  <Provider 
    store={createStoreWithMiddleWare(
      Reducer,
      widow.__REDUX_DEVTOOLS_EXTENTION__ &&
      widow.__REDUX_DEVTOOLS_EXTENTION__()
    )}>
    <App />
  </Provider>  
, document.getElementById('root'))

