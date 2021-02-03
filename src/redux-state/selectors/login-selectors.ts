import {AppStateType} from '../stateRedux';


export const getLoginSelector = (state: AppStateType) => (state.LoginReducer.login);
export const getIsLoginedSelector = (state: AppStateType) => (state.LoginReducer.isLogined);
export const getMyProfileSelector = (state: AppStateType) => (state.LoginReducer.profile);
export const getCaptchaSelector = (state: AppStateType) => (state.LoginReducer.captchaURL);
export const getMyIdSelector = (state: AppStateType) => (state.LoginReducer.id);