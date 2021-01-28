import {DialogsAPI} from "../api/api";
import {InferActionsTypes} from "./stateRedux";

const initialNotification = {
    newMessageCount: 0 as number | string,
}

const notificationReducer = (state = initialNotification, action: ActionsType): initialNotificationT =>{

    switch (action.type) {
        case 'SET_NEW_MESSAGE_COUNT': return {
            ...state,
            newMessageCount: action.payload < 100 ? action.payload : "99+"
        }

        default: {
            return state
        }
    }
}

const actionsNotifications = {
    setNewMessageCount: (payload: number) => ({type: 'SET_NEW_MESSAGE_COUNT', payload} as const)
}

export const getNewMessageCountThunkCreator = () => {
    return (dispatch: any) =>{
        DialogsAPI.getMessageCount().then((data: any) => {
            dispatch(actionsNotifications.setNewMessageCount(data.data))
        })
    }
}

export default notificationReducer;


type ActionsType = InferActionsTypes<typeof actionsNotifications>
export type initialNotificationT = typeof initialNotification;