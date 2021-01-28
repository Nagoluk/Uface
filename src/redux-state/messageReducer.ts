import {DialogsAPI} from "../api/api";

const addNewMessage = "ADD-NEW-MESSAGE";
const GET_DIALOGS = "GET_DIALOGS";
const GET_MESSAGES = "GET_MESSAGES";
const IS_DIALOG_FETCHING = "IS_DIALOG_FETCHING";
const ADD_MESSAGE = "ADD_MESSAGE";
const SET_IS_REDIRECTED_TO_DIALOG = "SET_IS_REDIRECTED_TO_DIALOG";
const REFRESH = "REFRESH";

export type photosT = {
    small: string | null,
    large: string | null
}

export type dialogT = {
    id: string,
    userName: string,
    hasNewMessages: boolean,
    lastDialogActivityDate: string,
    lastUserActivityDate: string,
    newMessagesCount: number,
    photos: photosT
}

export type messageT = {
    id: string,
    body: string,
    translatedBody: string | null,
    addedAt: string,
    senderId: number,
    senderName: string,
    recipientId: number,
    recipientName: string,
    viewed: boolean,
    deletedBySender: boolean,
    deletedByRecipient: false,
    isSpam: boolean,
    distributionId: any
}

let initialMessage =  {
    dialogs: null as Array<dialogT> | null,

    messages: {
        items: [] as Array<messageT> | [],
        totalCount: 0 as number,
        error: null as string | null,
    },
    isDialogsFetching: false as boolean,
    isRedirectedToDialog: false as boolean,
    refresh: false as boolean
};

export type initialMessageType = typeof initialMessage;

const messageReducer = (state = initialMessage, action: any):initialMessageType => {
    switch (action.type) {
        case addNewMessage:

            return {
                ...state,
                messages: {
                    ...state.messages,
                    items: [...state.messages.items, action.message]
                }
            }


        case GET_DIALOGS: {
            return {
                ...state,
                dialogs: [...action.dialogs]
            }
        }

        case GET_MESSAGES: {

            return {
                ...state,
                messages: {
                    items: [...action.messages],
                    totalCount: action.totalCount,
                    error: action.error,
                }
            }
        }

        case IS_DIALOG_FETCHING: {
            return {
                ...state,
                isDialogsFetching: action.payload
            }
        }

        case ADD_MESSAGE: {
            return {
                ...state,
                messages: {
                    ...state.messages,
                    items: [...state.messages.items, action.message]
                }

            }
        }
        case SET_IS_REDIRECTED_TO_DIALOG: {
            return {
                ...state,
                isRedirectedToDialog: action.payload
            }
        }

        case REFRESH: {
            return {
                ...state,
                refresh: !state.refresh
            }
        }
        default:
            return state;
    }

}

type getDialogsACType = {
    type: typeof GET_DIALOGS,
    dialogs: Array<dialogT>
}
export const getDialogsAC = (dialogs: Array<dialogT>): getDialogsACType => ({type: GET_DIALOGS, dialogs});

type getMessagesACT = {
    type: typeof GET_MESSAGES,
    messages: Array<messageT>
}
export const getMessagesAC = (messages: Array<messageT>): getMessagesACT => ({type: GET_MESSAGES, messages});

type isDialogFetchingACT = {
    type: typeof IS_DIALOG_FETCHING,
    payload: boolean
}
export const isDialogsFetchingAC = (payload: boolean): isDialogFetchingACT => ({type: IS_DIALOG_FETCHING, payload});

type addMessageACT = {
    type: typeof  ADD_MESSAGE,
    message: messageT
}
export const addMessageAC = (message: messageT): addMessageACT => ({type: ADD_MESSAGE, message});

type setRedirectToDialogACT = {
    type: typeof SET_IS_REDIRECTED_TO_DIALOG,
    payload: boolean
}
export const setRedirectedToDialog = (payload: boolean): setRedirectToDialogACT => ({type: SET_IS_REDIRECTED_TO_DIALOG, payload})

export const getDialogsThunkCreator = () => {
    return (dispatch: any) => {
        dispatch(isDialogsFetchingAC(true))
        DialogsAPI.getDialogs().then((data:any) => {
            dispatch(isDialogsFetchingAC(false))
            if(data.status === 200) dispatch(getDialogsAC(data.data))
        });
    }
}

export const getMessagesThunkCreator = (id: number) => {
    return (dispatch: any) => {
        DialogsAPI.getMessages(id).then((data: any) => {

            if(data.status === 200) dispatch(getMessagesAC(data.data))
        });
    }
}

export const sendMessagesThunkCreator = (id: number, body: string) => {
    return (dispatch: any) => {

        DialogsAPI.sendMessage(id, body).then((data: any) => {
            dispatch(addMessageAC(data.data.message))
        })

    }
}

export const startChatingThunkCreator = (id: number) => {
    return (dispatch: any) => {
        DialogsAPI.startChating(id).then((data: any) => {
            DialogsAPI.getDialogs().then((data: any) => {
               dispatch(setRedirectedToDialog(true));
            })
        })
    }
}


export const deleteMessageThunkCreator = (messageId: string) => {
    return (dispatch: any) => {
        DialogsAPI.deleteMessage(messageId).then((response: any) => {
            // dispatch(refreshAC())
        })
    }
}








export default messageReducer;