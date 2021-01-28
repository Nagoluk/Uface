import React from "react";
import {connect} from "react-redux";
import MessagesStyle from "./Messages.module.css";
import {deleteMessageThunkCreator, getMessagesAC, getMessagesThunkCreator} from "../../../../redux-state/messageReducer";
import Alert from "../../../common/alert/alert";

import styled from "styled-components";

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

class Messages extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            showMessage: false,
            deleteMessageId: null
        }
    }

    getNewMessages(){
        this.props.getMessagesThunkCreator(this.props.dialogId)
    }

    componentDidMount() {
        this.props.setIsNewMessage(false);
       this.props.getNewMessageCountThunkCreator();
    }

    componentWillUnmount() {
            this.props.getMessagesAC([])
    }

    deleteMessage = (messageId) => {
            this.props.deleteMessageThunkCreator(messageId);
            this.setState({showMessage: false})
    }

    setDeleteMessageAlert = (value = false, messageId) => {
        this.setState({showMessage: value})
        this.setState({deleteMessageId: messageId})
    }

    render() {
        let messages = this.props.messagesData.items.map(messageItem => <Message mail={messageItem.body}
                                                                                 key={messageItem.id}
                                                                                 messageId = {messageItem.id}
                                                                                 addedAt={messageItem.addedAt}
                                                                                 senderId={messageItem.senderId}
                                                                                 isNewMessage={this.props.isNewMessage}
                                                                                 myId={this.props.myId}
                                                                                 setDeleteMessageAlert={this.setDeleteMessageAlert}
                                                                                                        />).reverse()


        return  (<>
                    <MessageWrap className={MessagesStyle.messages}  black={this.props.black}>
                    {messages}
                    </MessageWrap>

                    {this.state.showMessage && <Alert
                                                    deleteMessage = {this.deleteMessage}
                                                    deleteMessageId={this.state.deleteMessageId}
                                                    setDeleteMessageAlert={this.setDeleteMessageAlert}

                    />}
                </>)

    }
}

let mapStateToProps = (state) => {
    return {
        messagesData: state.MessagePage.messages,
        refresh: state.MessagePage.refresh
    }
}

export default connect(mapStateToProps, {getMessagesThunkCreator, getMessagesAC, deleteMessageThunkCreator})(Messages)


