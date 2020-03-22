import React from 'react';
import './index.css';
import store  from "./Redux/stateRedux";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';



import Provider from "react-redux/es/components/Provider";
import {HashRouter} from "react-router-dom";



ReactDOM.render(<HashRouter><Provider store={store}><App/></Provider></HashRouter>, document.getElementById('root'));


