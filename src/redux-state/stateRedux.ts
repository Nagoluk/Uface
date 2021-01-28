import profileReducer from "./profileReducer";
import messageReducer from "./messageReducer";
import {Action, combineReducers, createStore} from "redux";
import usersReducer from "./usersReducer";
import setLang from "./settingReducer";
import loginReducer from "./loginReducer"
import { applyMiddleware } from "redux";
import thunkMiddleWare, {ThunkAction} from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import appReducer from "./appReducer";
import notificationReducer from "./notificationReducer";


let reducers = combineReducers({
    ProfilePage: profileReducer,
    MessagePage: messageReducer,
    UsersReducer: usersReducer,
    SetLang: setLang,
    LoginReducer: loginReducer,
    form: formReducer,
    app: appReducer,
    notification: notificationReducer
})

type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>


// @ts-ignore
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, applyMiddleware(thunkMiddleWare));

type PropertiesType<T> = T extends {[key: string]: infer U} ? U: never
export type InferActionsTypes<T extends {[key: string]: (...args: any[])=> any}> = ReturnType<PropertiesType<T>>


export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
//window._market = store;

export default store;