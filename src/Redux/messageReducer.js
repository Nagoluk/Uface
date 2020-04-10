import {DialogsAPI, UsersAPI} from "../api/api";

const addNewMessage = "ADD-NEW-MESSAGE";
const addNewSymbol = "NEW-SYMBOL-MESSAGE";
const GET_DIALOGS = "GET_DIALOGS";
const GET_MESSAGES = "GET_MESSAGES";

let initialMessage =  {
    dialogs: [

     ],

    messages: {
        items: [],
        totalCount: 0,
        error: null,
    },
    updateMessageData: "gg",};

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

        default:
            return state;
    }

}

export const getDialogsAC = (dialogs) => ({type: GET_DIALOGS, dialogs})
export const getMessagesAC = (messages) => ({type: GET_MESSAGES, messages})


export const getDialogsThunkCreator = () => {
    return (dispatch) => {
        DialogsAPI.getDialogs().then(data => {
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


export default messageReducer;