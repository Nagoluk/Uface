import React, {useEffect, useRef, useState} from 'react';
import {Avatar, Button, Input} from 'antd';
import { ChatMessageType } from '../../api/chat-api';
import {useDispatch, useSelector} from 'react-redux';
import {getChatMessagesSelector, getChatStatusSelector} from '../../redux-state/selectors/chat-selector';
import {
    actionsChat,
    sendMessageThunk,
    startMessagesListening,
    stopMessagesListening
} from '../../redux-state/chat-reducer';
import styled from 'styled-components';
import {UniversalThemeComponent} from '../../styles/theme';
import { UniversalWrap } from '../../styles/wrap.styles';
import { NavLink } from 'react-router-dom';
import {SendOutlined} from '@ant-design/icons';


const ChatPageWrapper = styled(UniversalThemeComponent)`
    
`

export const ChatPage = () => {
    return (<UniversalWrap maxWidth={500}>
                <ChatPageWrapper>
                    <Chat/>
                </ChatPageWrapper>
            </UniversalWrap>);
};

const Chat = () => {
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(startMessagesListening())

        return () => {
            dispatch(actionsChat.messagesReceived([]))
            dispatch(stopMessagesListening())
        }
    }, [])

    return <div>
                <Messages/>
                <AddMessageForm />
            </div>
}

const MessagesWrapStyled = styled.div`
  max-height: calc(100vh - 110px);
  overflow-y: scroll;
 
  &::-webkit-scrollbar {
    width: 2px;}

  &:hover::-webkit-scrollbar-thumb {
    background: #1890ff;}
    
  @media(max-width: 720px) {
    max-height: calc(100vh - 98px);
  }

`
const Messages: React.FC = () => {
    const [isAutoScroll, setIsAutoScroll] = useState(true)
    const scrollToLastMessageRef = useRef<HTMLDivElement>(null)
    const messages = useSelector(getChatMessagesSelector)

    useEffect(() => {
        if(isAutoScroll){
            scrollToLastMessageRef.current?.scrollIntoView({behavior: 'smooth'})
        }

    }, [messages, isAutoScroll])

    return <MessagesWrapStyled onScroll={e => {
        const element = e.currentTarget;
        if (Math.abs( (element.scrollHeight - element.scrollTop) - element.clientHeight ) < 300)
        {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }}>{messages.map((m, i) => <Message key={m.id} {...m}/>)}
                <div ref={scrollToLastMessageRef}></div>
            </MessagesWrapStyled>
}


const MessagesItemStyled = styled.div`
  padding: 8px;
  border-bottom: 1px solid ${props => (props.theme.mode === 'dark') ? '#3C3F41' : 'lightgray'};
  display: flex;
  & > div {
    margin-right: 10px;
  }
  
  & p {
    padding: 5px 0px;
  }
  
  & b {
    font-size: 1.2em;
  }
`
const Message: React.FC<ChatMessageType> = React.memo(props => {
    return <MessagesItemStyled>
                <div><Avatar src={props.photo} size={40}/> </div>
                <div>
                    <NavLink to={'profile/'+props.userId}><b>{props.userName}</b></NavLink>
                    <p>
                        {props.message}
                    </p>
                </div>
           </MessagesItemStyled>
})

const AddMessageFormStyled = styled.div`
    display: flex;
    padding: 5px;
    
    & input {
        margin-right: 10px;
        border: none;
        color: ${props => (props.theme.mode === 'dark') ? '#fff' : '#000'};
        background: ${props => (props.theme.mode === 'dark') ? '#3C3F41' : 'lightgray'};
    }
    
    & svg {
        color: #fff;
    }
`

const AddMessageForm:React.FC  = () => {
    const [message, setMessageText] = useState('')
    const dispatch = useDispatch()
    const status = useSelector(getChatStatusSelector)

    const sendMessageHandler = () => {
        if(message !== '') dispatch(sendMessageThunk(message))

        setMessageText('')
    }

    return <AddMessageFormStyled>
            <Input value={message}
                   placeholder={'Enter your message'}
                   onChange={e => setMessageText(e.target.value)}
                   size={'large'}
            ></Input>
            <div>
                <Button type={'primary'}
                        disabled={status === 'pending'}
                        size={'large'}
                        onClick={sendMessageHandler}
                ><SendOutlined /></Button>
            </div>
        </AddMessageFormStyled>
}


