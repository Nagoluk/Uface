import React from 'react';
import './index.css';
import './App.less'
import store from './redux-state/stateRedux';
import ReactDOM from 'react-dom';



import {HashRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';


ReactDOM.render(<HashRouter>
                    <Provider store={store}>
                        <App/>
                    </Provider>
                </HashRouter>, document.getElementById('root'));


