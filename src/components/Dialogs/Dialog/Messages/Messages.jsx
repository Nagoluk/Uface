import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MessagesStyle from "./Messages.module.css";
import {getMessagesThunkCreator} from "../../../../redux-state/messageReducer";
import styled from "styled-components";
import {getIsMessagesFetching, getMessagesSelector} from '../../../../redux-state/selectors/message-selectors';
import {getIsBlackSelector} from '../../../../redux-state/selectors/app-selectors';
import {getMyIdSelector} from '../../../../redux-state/selectors/login-selectors';

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

const MessageWrap = styled.div`
    background: ${props => (props.black ? '#2B2B2B' : '#ffffff')};
`

let getCorrectTime = (date) => {
    let x = new Date();
    let timeZone = x.getTimezoneOffset() / 60;
    let temp = (new Date(date)).getTime() - timeZone * 3.6e+6

    return new Date(temp).toString().slice(0, 21)
}


const Message = (props) => {

    return (
        <div
            className={MessagesStyle.messageItem + " " + ((props.isNewMessage) ? MessagesStyle.animation : "") + " " + (props.myId === props.senderId ? MessagesStyle.isMy : "")}
            onDoubleClick={() => props.setDeleteMessageAlert(true, props.messageId)}
        >
            <div className={MessagesStyle.messageItemLogo}></div>
            {props.mail}
            <span className={MessagesStyle.data}>{getCorrectTime(props.addedAt)}</span>
        </div>
    );
};

export const Messages = ({dialogId}) => {
    const dispatch = useDispatch()

    const messagesData = useSelector(getMessagesSelector)
    const isBlack = useSelector(getIsBlackSelector)
    const myId = useSelector(getMyIdSelector)
    const isMessageFetching = useSelector(getIsMessagesFetching)

    useEffect(() => {
        dispatch(getMessagesThunkCreator(dialogId))
    }, [dialogId])



    const messages = messagesData.items.map(messageItem => <Message mail={messageItem.body}
                                                                             key={messageItem.id}
                                                                             messageId = {messageItem.id}
                                                                             addedAt={messageItem.addedAt}
                                                                             senderId={messageItem.senderId}
                                                                             myId={myId}

    />).reverse()

    return   <Spin spinning={isMessageFetching} indicator={antIcon}>
                <MessageWrap className={MessagesStyle.messages} black={isBlack}>
                {messages}
                </MessageWrap>
            </Spin>
}