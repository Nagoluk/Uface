import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MessagesStyle from "./Messages.module.css";
import {deleteMessageThunkCreator, getMessagesThunkCreator} from '../../../../redux-state/messageReducer';
import styled from "styled-components";
import {
    getIsMessagesFetching,
    getMessagesError,
    getMessagesSelector
} from '../../../../redux-state/selectors/message-selectors';
import {getIsBlackSelector} from '../../../../redux-state/selectors/app-selectors';
import {getMyIdSelector} from '../../../../redux-state/selectors/login-selectors';

import { Spin } from 'antd';
import {DeleteOutlined, EllipsisOutlined, LoadingOutlined} from '@ant-design/icons';
import {getCorrectTime} from '../../../../utils/date-formater';
import { Menu, Dropdown } from 'antd';
import {NetworkError} from '../../../common/NetworkError/NetworkError';


const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

const MessageWrap = styled.div`
    background: ${props => (props.black ? '#2B2B2B' : '#ffffff')};
`

const Dots = styled(EllipsisOutlined)`
    color: ${props => (props.theme.mode === 'dark') ? '#fff': '#000'}
`

const Error = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`


const Message = (props) => {
    const messageMenu = (
        <Menu>
            <Menu.Item key="0" style={{color: 'red'}} onClick={() => props.deleteMessage(props.messageId)}>
                Delete it <DeleteOutlined />
            </Menu.Item>
        </Menu>
    );

    return (
        <div
            className={MessagesStyle.messageItem + " " + (props.myId === props.senderId ? MessagesStyle.isMy : "")}
        >
            <div className={MessagesStyle.messageItemLogo}></div>
            {props.mail}
            <span className={MessagesStyle.data}>{getCorrectTime(props.addedAt)}</span>
            <Dropdown overlay={messageMenu} trigger={['click']}>
                <Dots className={MessagesStyle.messageActions}/>
            </Dropdown>

        </div>
    );
};

export const Messages = ({dialogId}) => {
    const dispatch = useDispatch()

    const messagesData = useSelector(getMessagesSelector)
    const isBlack = useSelector(getIsBlackSelector)
    const myId = useSelector(getMyIdSelector)
    const isMessageFetching = useSelector(getIsMessagesFetching)
    const error = useSelector(getMessagesError)

    useEffect(() => {
        dispatch(getMessagesThunkCreator(dialogId))
    }, [dialogId, dispatch])

    const deleteMessage = (messageId) => {
        dispatch(deleteMessageThunkCreator(messageId))
    }


    const messages = messagesData.items.map(messageItem => <Message mail={messageItem.body}
                                                                             key={messageItem.id}
                                                                             messageId = {messageItem.id}
                                                                             addedAt={messageItem.addedAt}
                                                                             senderId={messageItem.senderId}
                                                                             myId={myId}
                                                                             deleteMessage={deleteMessage}


    />).reverse()

    return   <Spin spinning={isMessageFetching} indicator={antIcon}>
                <MessageWrap className={MessagesStyle.messages} black={isBlack}>
                    {!error && messages}
                    {error && <Error><NetworkError refresh={() => dispatch(getMessagesThunkCreator(dialogId))}/></Error>}
                </MessageWrap>
            </Spin>
}