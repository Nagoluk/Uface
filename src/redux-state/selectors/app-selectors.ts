import {AppStateType} from '../stateRedux';

export const getIsBlackSelector = (state: AppStateType) => (state.app.blackTheme)
export const getInitializedSelector = (state: AppStateType) => (state.app.initialized)