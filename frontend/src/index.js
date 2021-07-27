import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from "./redux/store";
import {  userLoginSuccess } from './containers/User/actions';
import setAuthorization from './utils/setAuthorization';
// const store=createStore(allreducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

if(localStorage.token){
  const data={token:localStorage.token}
  setAuthorization(localStorage.token)
  store.dispatch(userLoginSuccess(data.token))
}

ReactDOM.render(
 
 

    
    <App />,document.getElementById('root')
);

