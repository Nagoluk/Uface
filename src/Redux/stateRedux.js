import profileReducer from "./profileReducer";
import messageReducer from "./messageReducer";
import {combineReducers, createStore} from "redux";
import usersReducer from "./usersReducer";
import setLang from "./settingReducer";
import loginReducer from "./loginReducer"
import { applyMiddleware } from "redux";
import thunkMiddleWare from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import appReducer from "./appReducer";

let reducers = combineReducers({
    ProfilePage: profileReducer,
    MessagePage: messageReducer,
    UsersReducer: usersReducer,
    SetLang: setLang,
    LoginReducer: loginReducer,
    form: formReducer,
    app: appReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

window.store = store;

export default store;