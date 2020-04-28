import {DialogsAPI} from "../api/api";

const SET_NEW_MESSAGE_COUNT = "SET_NEW_MESSAGE_COUNT";


const initalNotification = {
    newMessageCount: 0,
}

const notificationReducer = (state = initalNotification, action) =>{

    switch (action.type) {
        case SET_NEW_MESSAGE_COUNT: return {
            ...state,
            newMessageCount: action.payload < 100 ? action.payload : "99+"
        }

    }

    return state
}

const setNewMessageCount = (payload) => ({type: SET_NEW_MESSAGE_COUNT, payload})


export const getNewMessageCountThunkCreator = () => {
    return (dispatch) =>{
        DialogsAPI.getMessageCount().then(data => {
            dispatch(setNewMessageCount(data.data))
        })
    }
}




export default notificationReducer;