import {AppStateType} from '../stateRedux';

export const getNewMessagesCountSelector = (state: AppStateType) => (state.notification.newMessageCount)