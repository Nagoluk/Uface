import React from "react";
import {connect} from "react-redux";
import MessagesStyle from "./Messages.module.css";
import {getMessagesAC, getMessagesThunkCreator} from "../../../../Redux/messageReducer";

let getCorrectTime = (date) => {
    let x = new Date();
    let timeZone = x.getTimezoneOffset() / 60;
    let temp = (new Date(date)).getTime() - timeZone * 3.6e+6

    return new Date(temp).toString().slice(0, 21)

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
            this.props.getMessagesAC([])

    }

    render() {
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

export default connect(mapStateToProps, {getMessagesThunkCreator, getMessagesAC})(Messages)


