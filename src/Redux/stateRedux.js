import profileReducer from "./profileReducer";
import messageReducer from "./messageReducer";
import {combineReducers, createStore, compose} from "redux";
import usersReducer from "./usersReducer";
import setLang from "./settingReducer";
import loginReducer from "./loginReducer"
import { applyMiddleware } from "redux";
import thunkMiddleWare from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import appReducer from "./appReducer";
import { composeWithDevTools } from 'remote-redux-devtools';

let reducers = combineReducers({
    ProfilePage: profileReducer,
    MessagePage: messageReducer,
    UsersReducer: usersReducer,
    SetLang: setLang,
    LoginReducer: loginReducer,
    form: formReducer,
    app: appReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)));

window.store = store;

export default store;