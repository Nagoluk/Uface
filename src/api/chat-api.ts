
let ws: WebSocket | null = null;
let subscribers = {
    'messageReceived': [] as MessagesSubscriberType[],
    'statusChanged': [] as MessagesStatusSubscriberType[]
}

type eventsNameType = 'messageReceived' | 'statusChanged'

const notifySubscriberAboutStatus = (status: ChatStatus) => {
    subscribers.statusChanged.forEach(s => s(status))
}


const closeHandler = () => {
    notifySubscriberAboutStatus('pending')
    setTimeout(createChannel, 3000)
}

const setMessagesHandler = (e: MessageEvent) => {
    let messages = JSON.parse(e.data)
    subscribers['messageReceived'].forEach(s => s(messages))
}

const openHandler = () => {
    notifySubscriberAboutStatus('ready')
}

const removeAllEventsAndClose = () => {
    ws?.removeEventListener('close',closeHandler)
    ws?.removeEventListener('message', setMessagesHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.close()
}


function createChannel() {
    removeAllEventsAndClose()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    notifySubscriberAboutStatus('pending')

    ws?.addEventListener('close', closeHandler)
    ws?.addEventListener('message', setMessagesHandler)
    ws?.addEventListener('open', openHandler)
}

export const ChatAPI = {
    start(){
        createChannel()
    },

    stop(){
        removeAllEventsAndClose()
        subscribers['messageReceived'] = []
        subscribers['statusChanged'] = []
    },

    subscribe(eventName: eventsNameType, callback: any){
        subscribers[eventName].push(callback)
    },

    unsubscribe(eventName: eventsNameType, callback: any){
        //@ts-ignore
        subscribers[eventName] = subscribers[eventName].filter((item: any) => item !== callback)
    },

    send(text: string) {
        ws?.send(text)
    }

}

type MessagesSubscriberType = (messages: ChatMessageType[]) => void
type MessagesStatusSubscriberType = (status: ChatStatus) => void

export type ChatMessageType = {
    id?: any,
    message: string,
    photo: string,
    userId: number,
    userName: string,
}
export type ChatStatus = 'pending' | 'ready'




