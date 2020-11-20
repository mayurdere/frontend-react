import React, {useState} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import Homepage from './components/Homepage';
import Login from './components/Login';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min';
import Signup from './components/Signup';
import axios from 'axios';
import RouterAdd from './components/users/RouterAdd';
import RouterEdit from './components/users/RouterEdit';
import Router from './components/users/Router';

axios.defaults.baseURL= 'http://localhost:8000/'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');



function App() {

  
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
        <Route exact path="/" component={Homepage} exact={true}/>
        <Route path="/login" component={Login} exact={true}/>
        <Route path="/signup" component={Signup} exact={true}/>
        <Route path="/router/add" component={RouterAdd} exact={true}/>
        <Route path="/router/edit/:id" component={RouterEdit} exact={true}/>
        <Route path="/router/:id" component={Router} exact={true}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
