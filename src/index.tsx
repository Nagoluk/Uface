import React from 'react';
import './index.css';
import store from './redux-state/stateRedux';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {HashRouter} from 'react-router-dom';
import { Provider } from 'react-redux';


ReactDOM.render(<HashRouter>
                    <Provider store={store}>
                        <App/>
                    </Provider>
                </HashRouter>, document.getElementById('root'));


