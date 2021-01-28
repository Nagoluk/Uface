import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {BrowserRouter} from "react-router-dom";
import store from "./redux-state/stateRedux";
import {Provider} from "react-redux";


it('renders without crashing', () => {
  const div = document.createElement('div');

  const AppTest = (<BrowserRouter>
                  <Provider store={store}>
                    <App/>
                  </Provider>
               </BrowserRouter>)

  ReactDOM.render(AppTest, div);
  ReactDOM.unmountComponentAtNode(div);
});
