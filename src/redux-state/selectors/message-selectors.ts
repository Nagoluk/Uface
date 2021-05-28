import {createSelector} from 'reselect';
import {AppStateType} from '../stateRedux';


export const getDialogsSelector = (state: AppStateType) => state.MessagePage.dialogs;
export const getMessagesSelector = (state: AppStateType) => state.MessagePage.messages;
export const getIsDialogsFetching = (state: AppStateType) => state.MessagePage.isDialogsFetching
export const getIsMessagesFetching = (state: AppStateType) => state.MessagePage.isDialogFetching
export const getDialogsError = (state: AppStateType) => state.MessagePage.getDialogsError
export const getMessagesError = (state: AppStateType) => state.MessagePage.getMessagesError
export const getIsRedirectToDialog = (state: AppStateType) => (state.MessagePage.isRedirectedToDialog)


export const getDialogInfoSelector = createSelector(
    (state => state.MessagePage.dialogs),
    (_: AppStateType, id: string) => id,
    (dialogs, id) => dialogs?.filter(dialog => String(dialog.id) === id)
)