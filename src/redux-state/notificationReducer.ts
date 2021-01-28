import {DialogsAPI} from "../api/api";

const SET_NEW_MESSAGE_COUNT = "SET_NEW_MESSAGE_COUNT";


const initalNotification = {
    newMessageCount: 0 as number | string,
}

export type initialNotificationT = typeof initalNotification;

const notificationReducer = (state = initalNotification, action: any): initialNotificationT =>{

    switch (action.type) {
        case SET_NEW_MESSAGE_COUNT: return {
            ...state,
            newMessageCount: action.payload < 100 ? action.payload : "99+"
        }

        default: {
            return state
        }

    }

}
type setNewMessageCountACT = {
    type: typeof SET_NEW_MESSAGE_COUNT,
    payload: number
}
const setNewMessageCount = (payload: number): setNewMessageCountACT => ({type: SET_NEW_MESSAGE_COUNT, payload})


export const getNewMessageCountThunkCreator = () => {
    return (dispatch: any) =>{
        DialogsAPI.getMessageCount().then((data: any) => {
            dispatch(setNewMessageCount(data.data))
        })
    }
}




export default notificationReducer;