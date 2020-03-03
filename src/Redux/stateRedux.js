import profileReducer from "./profileReducer";
import messageReducer from "./messageReducer";
import {combineReducers, createStore} from "redux";
import usersReducer from "./usersReducer";
import setLang from "./settingReducer";
import loginReducer from "./loginReducer"
import { applyMiddleware } from "redux";
import thunkMiddleWare from "redux-thunk";

let reducers = combineReducers({
    ProfilePage: profileReducer,
    MessagePage: messageReducer,
    UsersReducer: usersReducer,
    SetLang: setLang,
    LoginReducer: loginReducer,
})

let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

window.store = store;

export default store;