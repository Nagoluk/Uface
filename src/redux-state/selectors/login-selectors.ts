import {AppStateType} from '../stateRedux';


export const getLoginSelector = (state: AppStateType) => (state.LoginReducer.login);
export const getIsLoginedSelector = (state: AppStateType) => (state.LoginReducer.isLogined)