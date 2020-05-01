import React from "react";
import {connect} from "react-redux";
import MessagesStyle from "./Messages.module.css";
import {getMessagesThunkCreator} from "../../../../Redux/messageReducer";

let getCorrectTime = (date) => {
    let x = new Date();
    let timeZone = x.getTimezoneOffset() / 60;

    return (Number(date.slice(11, 13)) - timeZone) + date.slice(13, 16);
}


const Message = (props) => {

    return (
        <div className={MessagesStyle.messageItem + " " + ((props.isNewMessage) ? MessagesStyle.animation : "") + " " + (props.myId === props.senderId ? MessagesStyle.isMy : "")} >
            <div className={MessagesStyle.messageItemLogo}></div>
            {props.mail}
            <span className={MessagesStyle.data}>{getCorrectTime(props.addedAt)}</span>
        </div>
    );
};

class Messages extends React.Component{
    getNewMessages(){
        this.props.getMessagesThunkCreator(this.props.dialogId)
    }

    componentDidMount() {
        this.props.setIsNewMessage(false);
       this.props.getNewMessageCountThunkCreator();
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    render() {
        this.timer = setTimeout(this.getNewMessages.bind(this), 30000)
        let messages = this.props.messagesData.items.map(messageItem => <Message mail={messageItem.body}
                                                                                 key={messageItem.id}
                                                                                 addedAt={messageItem.addedAt}
                                                                                 senderId={messageItem.senderId}
                                                                                 isNewMessage={this.props.isNewMessage}
                                                                                 myId={this.props.myId}/>).reverse()


        return  (<div className={MessagesStyle.messages}>
                    {messages}
                 </div>)

    }
}

let mapStateToProps = (state) => {
    return {
        messagesData: state.MessagePage.messages,
    }
}

export default connect(mapStateToProps, {getMessagesThunkCreator})(Messages)


