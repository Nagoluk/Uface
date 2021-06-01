import React, {useEffect, useState} from 'react';
import {Avatar, Button, message} from 'antd';



type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string,
}




export const ChatPage = () => {
    return (
        <div>
            <Chat/>
        </div>
    );
};

const Chat = () => {
    const [websocket, setWebsocket] = useState<WebSocket | null>(null)

    useEffect(() => {
        let temp: WebSocket;

        const closeHandler = () => {
            setTimeout(() => {
                message.warn('Reconnect...')
                createChannel()
            }, 3000)
        }

        function createChannel() {
            temp?.removeEventListener('close',closeHandler)
            temp?.close()

            temp = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
            temp.addEventListener('close', closeHandler)
            setWebsocket(temp)
        }

        createChannel()

        return () => {
            temp?.removeEventListener('close',closeHandler)
            temp.close()
        }
    }, [])

    useEffect(() =>{
        websocket?.addEventListener('close', () => {
            console.log('close')
        })
    }, [websocket])


    return <div>
                <Messages websocket={websocket}/>
                <AddMessageForm websocket={websocket}/>
            </div>
}

const Messages: React.FC<{websocket: WebSocket | null}> = ({websocket}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    const setMessagesHandler = (e: MessageEvent) => {
        console.log('Websocket opened')
        let messages = JSON.parse(e.data)
        setMessages(prevState => [...prevState, ...messages])
    }
    useEffect(() => {
        websocket?.addEventListener('message', setMessagesHandler)


        return () => {
            websocket?.removeEventListener('message', setMessagesHandler)
        }
    }, [websocket])

    return <div style={{maxHeight: '400px', overflowY: 'scroll'}}>{messages.map((m, i) => <Message key={i} {...m}/>)}</div>
}

const Message: React.FC<ChatMessageType> = (props) => {
    return <div>
                <div><Avatar src={props.photo}/> {props.userName}</div>
                <p>
                    {props.message}
                </p>
                <hr/>
           </div>
}

const AddMessageForm:React.FC<{websocket: WebSocket | null}>  = ({websocket}) => {
    const [message, setMessageText] = useState('')
    const [readyStatus, setReadyStatus] = useState<'open'|'close'>('close')

    const setOpenStatus = () => setReadyStatus('open')

    useEffect(() => {
        websocket?.addEventListener('open', setOpenStatus )

        return () => {
            websocket?.removeEventListener('open', setOpenStatus)
        }
    }, [websocket])

    const sendMessage = () => {
        if(message !== '') {
            websocket?.send(message)
            setMessageText('')
        }
    }
    return <div>
            <textarea value={message}
                      onChange={e => setMessageText(e.target.value)}
            ></textarea>
            <div>
                <Button disabled={websocket === null || readyStatus !== 'open'} onClick={sendMessage}>Send</Button>
            </div>
        </div>
}


