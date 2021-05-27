import {dialogT, messageT} from '../interfaces/messages-interfaces';
import {nullable} from '../interfaces/common-interfaces';
import {InferActionsTypes} from './stateRedux';
import { DialogsAPI } from '../api/dialogs-api';
import { message } from 'antd';


const initialMessage = {
    dialogs: null as nullable<Array<dialogT>>,

    messages: {
        items: [] as Array<messageT>,
        totalCount: 0,
        error: null as nullable<string>,
    },
    isDialogsFetching: false,
    isRedirectedToDialog: false,
    isDialogFetching: false,
    refresh: false
};


const messageReducer = (state = initialMessage, action: ActionTypes): initialMessageType => {
    switch (action.type) {
        case 'GET_DIALOGS': {
            return {
                ...state,
                dialogs: action.dialogs
            }
        }

        case 'GET_MESSAGES': {
            return {
                ...state,
                messages: {
                    items: [...action.data.items],
                    totalCount: action.data.totalCount,
                    error: action.data.error,
                }
            }
        }

        case 'IS_DIALOG_FETCHING': {
            return {
                ...state,
                isDialogsFetching: action.payload
            }
        }

        case 'ADD_MESSAGE': {
            return {
                ...state,
                messages: {
                    ...state.messages,
                    items: [...state.messages.items, action.message]
                }

            }
        }
        case 'SET_IS_REDIRECTED_TO_DIALOG': {
            return {
                ...state,
                isRedirectedToDialog: action.payload
            }
        }

        case 'SET_IS_DIALOG_FETCHING': {
            return {
                ...state,
                isDialogFetching: action.payload
            }
        }

        case 'DELETE_MESSAGE': {
            const temp = state.messages.items.filter(m => m.id !== action.messageId)
            return {
                ...state,
                messages: {
                    ...state.messages,
                    items: temp
                }
            }
        }
        default:
            return state;
    }

}

export const actionsMessages = {
    getDialogsAC: (dialogs: Array<dialogT> | null) => ({type: 'GET_DIALOGS', dialogs} as const),
    getMessagesAC: (data: {items: Array<messageT>, totalCount: number, error: string}) => ({type: 'GET_MESSAGES', data} as const),
    isDialogsFetchingAC: (payload: boolean) => ({type: 'IS_DIALOG_FETCHING', payload} as const),
    addMessageAC: (message: messageT) => ({type: 'ADD_MESSAGE', message} as const),
    setRedirectedToDialog: (payload: boolean) => ({type: 'SET_IS_REDIRECTED_TO_DIALOG', payload} as const),
    setIsDialogFetching: (payload: boolean) => ({type: 'SET_IS_DIALOG_FETCHING', payload} as const),
    deleteMessage: (messageId: string) => ({type: 'DELETE_MESSAGE', messageId} as const)
}

export const getDialogsThunkCreator = () => {
    return (dispatch: any) => {
        dispatch(actionsMessages.isDialogsFetchingAC(true))
        DialogsAPI.getDialogs().then((data: any) => {
            if (data.status === 200) dispatch(actionsMessages.getDialogsAC(data.data))
        }).finally(() => {
            dispatch(actionsMessages.isDialogsFetchingAC(false))
        });
    }
}

export const getMessagesThunkCreator = (id: number) => {
    return (dispatch: any) => {
        dispatch(actionsMessages.setIsDialogFetching(true))
        DialogsAPI.getMessages(id).then((data: any) => {
            if (data.status === 200) dispatch(actionsMessages.getMessagesAC(data.data))
        }).finally(() => {
            dispatch(actionsMessages.setIsDialogFetching(false))
        });
    }
}

export const sendMessagesThunkCreator = (id: number, body: string) => {
    return (dispatch: any) => {
        DialogsAPI.sendMessage(id, body).then((data: any) => {
            dispatch(actionsMessages.addMessageAC(data.data.message))
        })

    }
}

export const startChatingThunkCreator = (id: number) => {
    return (dispatch: any) => {
        DialogsAPI.startChating(id).then((data: any) => {
            DialogsAPI.getDialogs().then((data: any) => {
                dispatch(actionsMessages.setRedirectedToDialog(true));
            })
        })
    }
}


export const deleteMessageThunkCreator = (messageId: string) => {
    return (dispatch: any) => {
        DialogsAPI.deleteMessage(messageId).then((response: any) => {
            if(response.status === 200) dispatch(actionsMessages.deleteMessage(messageId))

        }).catch(() => {
            message.error('Cannot delete message')
        })
    }
}

export default messageReducer;

export type initialMessageType = typeof initialMessage;
type ActionTypes = InferActionsTypes<typeof actionsMessages>