import {DialogsAPI, UsersAPI} from "../api/api";
import {setCurrentPage, setTotalCount, setUsers, ToggleFetching} from "./usersReducer";

const addNewMessage = "ADD-NEW-MESSAGE";
const addNewSymbol = "NEW-SYMBOL-MESSAGE";
const SET_DIALOGS = "SET_DIALOGS";

let dialogIinit = {
    id: 0,
        userName: "Soroka",
    hasNewMessages: false,
    lastDialogActivityDate: "2020-04-09T09:35:32.323",
    lastUserActivityDate: "2020-04-09T09:30:05.843",
    newMessagesCount: 1,
    photos: {
    small: null,
        large: null
    }
}


let messagesInit = {
    items: [
        {
            id: "2ef5932b-853f-4995-b131-9e743a1a991f",
            body: "test",
            translatedBody: null,
            addedAt: "2020-04-09T12:08:04.547",
            senderId: 6108,
            senderName: "Letopisec",
            recipientId: 1079,
            viewed: false
        },
        {
            id: "2c63aaf7-5376-45c5-a7b9-1ccaa9066531",
            body: "test",
            translatedBody: null,
            addedAt: "2020-04-09T12:08:12.473",
            senderId: 6101,
            senderName: "Letopisec",
            recipientId: 1079,
            viewed: false
        }
    ],
    totalCount: 2,
    error: null
}


let initialMessage =  {
    dialogs: [

     ],

    messages: messagesInit,
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


        case SET_DIALOGS: {
            return {
                ...state,
                dialogs: [dialogIinit, ...action.dialogs]
            }
        }

        default:
            return state;
    }

}

export const setDialogsAC = (dialogs) => ({type: SET_DIALOGS, dialogs})


export const setDialogsThunkCreator = () => {
    return (dispatch) => {
        DialogsAPI.getDialogs().then(data => {
            if(data.status === 200) dispatch(setDialogsAC(data.data))

        });
    }
}


export default messageReducer;