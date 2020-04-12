import {DialogsAPI} from "../api/api";

const addNewMessage = "ADD-NEW-MESSAGE";
const addNewSymbol = "NEW-SYMBOL-MESSAGE";
const GET_DIALOGS = "GET_DIALOGS";
const GET_MESSAGES = "GET_MESSAGES";
const IS_DIALOG_FETCHING = "IS_DIALOG_FETCHING";
const ADD_MESSAGE = "ADD_MESSAGE";

let initialMessage =  {
    dialogs: null,

    messages: {
        items: [],
        totalCount: 0,
        error: null,
    },
    updateMessageData: "gg",
    isDialogsFetching: false
};

const messageReducer = (state = initialMessage, action) => {
    switch (action.type) {
        case addNewMessage:

            return {
                ...state,
                messageData: [ ...state.messageData],
                updateMessageData: ""

            }

        case addNewSymbol:
            return  {
                ...state,
                updateMessageData: action.symbol,
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
                    items: [...action.messages.items],
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

        default:
            return state;
    }

}

export const getDialogsAC = (dialogs) => ({type: GET_DIALOGS, dialogs});
export const getMessagesAC = (messages) => ({type: GET_MESSAGES, messages});
export const isDialogsFetchingAC = (payload) => ({type: IS_DIALOG_FETCHING, payload});
export const addMessageAC = (message) => ({type: ADD_MESSAGE, message})


export const getDialogsThunkCreator = () => {
    return (dispatch) => {
        dispatch(isDialogsFetchingAC(true))
        DialogsAPI.getDialogs().then(data => {
            dispatch(isDialogsFetchingAC(false))
            if(data.status === 200) dispatch(getDialogsAC(data.data))
        });
    }
}

export const getMessagesThunkCreator = (id) => {
    return (dispatch) => {
        DialogsAPI.getMessages(id).then(data => {
            if(data.status === 200) dispatch(getMessagesAC(data.data))
        });
    }
}

export const sendMessagesThunkCreator = (id, body) => {
    return (dispatch) => {

        DialogsAPI.sendMessage(id, body).then(data => {
            dispatch(addMessageAC(data.data.message))
        })


    }
}



export default messageReducer;