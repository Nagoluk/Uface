import React, {useEffect, useState} from 'react';
import {Avatar, Button} from 'antd';

const websocket = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

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



    return <div>
                <Messages/>
                <AddMessageForm/>
            </div>
}

const Messages = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])
    useEffect(() => {
        websocket.addEventListener('message', e => {
            console.log('Websocket opened')
            let messages = JSON.parse(e.data)
            setMessages(prevState => [...prevState, ...messages])
        })


        return () => {
            console.log('Websocket closed')
            websocket.close()
        }
    }, [])

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

const AddMessageForm = () => {
    const [message, setMessageText] = useState('')

    const sendMessage = () => {
        if(message !== '') {
            websocket.send(message)
            setMessageText('')
        }
    }
    return <div>
            <textarea value={message}
                      onChange={e => setMessageText(e.target.value)}
            ></textarea>
            <div>
                <Button onClick={sendMessage}>Send</Button>
            </div>
        </div>
}


