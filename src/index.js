import React from 'react';
import './index.css';
import store  from "./Redux/stateRedux";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';



import Provider from "react-redux/es/components/Provider";
import {BrowserRouter} from "react-router-dom";



ReactDOM.render(<BrowserRouter><Provider store={store}><App/></Provider></BrowserRouter>, document.getElementById('root'));


