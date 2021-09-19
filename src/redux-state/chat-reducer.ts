import {ChatAPI, ChatMessageType, ChatStatus} from '../api/chat-api';
import {InferActionsTypes} from './stateRedux';
import { Dispatch } from 'redux';
// @ts-ignore
import {v1} from 'uuid'

const initState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as ChatStatus,
}


export const chatReducer = (state = initState, action: ActionsType): AppInitStateT => {
    switch(action.type){
        case 'SET_MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map( m => ({...m, id: v1() }))]
                    .filter((m, index, array) => index >= array.length - 100)
            }

        case 'SET_STATUS_CHANGED':
            return {
                ...state,
                status: action.payload
            }

        case 'EMPTY_ALL_MESSAGES':
            return {
                ...state,
                messages: []
            }

        default: return state

    }
}

export const actionsChat = {
    messagesReceived: (messages: ChatMessageType[]) =>
        ({type: 'SET_MESSAGES_RECEIVED', payload: {messages}} as const),

    statusChanged: (status: ChatStatus) => (
        {type: 'SET_STATUS_CHANGED', payload: status} as const
    ),

    emptyAllMessages: () => ({type: 'EMPTY_ALL_MESSAGES'} as const)
}
let _newStatusHandler: ((status: ChatStatus) => void ) | null = null
const newStatusHandlerCreator = (dispatch: Dispatch) => {
    if(_newStatusHandler === null) {
        _newStatusHandler = (status) => {
            dispatch(actionsChat.statusChanged(status))
        }
    }

    return _newStatusHandler
}


let _newMessageHandler: ((messages: ChatMessageType[]) => void ) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if(_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actionsChat.messagesReceived(messages))
        }
    }

    return _newMessageHandler
}


export let startMessagesListening = () => (dispatch: Dispatch) => {
    ChatAPI.start()
    ChatAPI.subscribe('messageReceived', newMessageHandlerCreator(dispatch))
    ChatAPI.subscribe('statusChanged', newStatusHandlerCreator(dispatch))
}

export let stopMessagesListening = () => (dispatch: Dispatch) => {
    ChatAPI.stop()
    ChatAPI.unsubscribe('messageReceived',newMessageHandlerCreator(dispatch))
    ChatAPI.unsubscribe('statusChanged', newStatusHandlerCreator(dispatch))
}

export let sendMessageThunk = (text: string) => (dispatch: Dispatch) => {
    ChatAPI.send(text)
}


type ActionsType = InferActionsTypes<typeof actionsChat>
export type AppInitStateT = typeof initState
