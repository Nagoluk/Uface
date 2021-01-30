import {AppStateType} from '../stateRedux';

export const getIsBlackSelector = (state: AppStateType) => (state.app.blackTheme)