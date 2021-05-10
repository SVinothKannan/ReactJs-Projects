import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Provider} from 'react-redux';
import Navbar from './Components/Content/Navbar';
import Content from './Components/Content/Contents';
import { Component } from 'react';
import rootReducer from './Redux/Store/CommonStore';
import thunk from 'redux-thunk';
import { createStore,applyMiddleware } from 'redux';
import * as redux from 'redux';
const middlewares = [thunk];
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default class App extends Component{

constructor(props){
super(props);
}

  render(){
  return (<Provider store={store}>
    <Router>
     <Content></Content>
    </Router>
    </Provider>
  );
  }
}


