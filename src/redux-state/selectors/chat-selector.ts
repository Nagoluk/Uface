import {AppStateType} from '../stateRedux';

export const getChatMessagesSelector = (state: AppStateType) => (state.chat.messages)
export const getChatStatusSelector = (state: AppStateType) => (state.chat.status)